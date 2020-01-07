import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { Button, Avatar } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { AppStyles, Metrics } from '../Themes';
import styles from './Styles/GarmentDetailStyles';

import FavoriteButton from '../Components/FavoriteButton';
import CommentList from '../Components/Comment/CommentList';
import { favoriteGarment } from '../Redux/UserRedux';
import { tagGarmentToFit, clearCreatedFit } from '../Redux/FitsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { fetchComments } from '../Redux/CommentsRedux';
import { Ionicons } from '@expo/vector-icons';

import { baseURL } from '../Config';
import axios from 'axios';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    garmentFits: [],
    toggled: false,
    refreshing: false,
    count: null
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    this.fetchFits();
    this.getFavoriteState();

    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.props.fetchComments(id, 'garments');
    });
  }

  componentWillUnmount() {
    this.willFocus.remove();
  }

  fetchFits = async () => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/fits/?garment=${id}&limit=100`);

    // const response = await this.props.fetchGarmentFits(id);

    try {
      this.setState({
        garmentFits: response.data.results,
        error: null,
        loading: false,
        count: response.data.count
      });
    } catch (error) {
      console.tron.log(error);
    }
  };

  getFavoriteState = () => {
    const { id } = this.props.navigation.state.params;
    const { favoriteGarments } = this.props.user;

    if (favoriteGarments.includes(id)) {
      this.setState({ toggled: true });
    } else {
      this.setState({ toggled: false });
    }
  };

  favoriteGarment = async () => {
    // garmentId
    const { id } = this.props.navigation.state.params;
    const { favoriteGarment, user } = this.props;

    await favoriteGarment(id, user);

    this.getFavoriteState();
  };

  handleOpenWithWebBrowser = () => {
    const { purchase_page } = this.props.navigation.state.params;

    WebBrowser.openBrowserAsync(purchase_page);
  };

  _renderCarouselItem = ({ item }) => {
    const { photo } = item;

    const { navigate } = this.props.navigation;
    const styles = {
      gridItem: {
        height: 150,
        backgroundColor: '#333'
      },
      image: {
        width: '100%',
        height: '100%'
      }
    };

    return (
      <TouchableOpacity style={styles.gridItem} onPress={() => navigate('FitDetail', item)}>
        <Image style={styles.image} source={{ uri: photo }} />
      </TouchableOpacity>
    );
  };

  // photo taken will be associated with the current garment
  addPhotoToFit = async () => {
    const { navigate } = this.props.navigation;
    const { clearCreatedFit, tagGarmentToFit } = this.props;

    await clearCreatedFit();
    await tagGarmentToFit(this.props.navigation.state.params);
    navigate('Camera');
  };

  render() {
    const { comments } = this.props;
    const { id, color, sku, brand, model, photo } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    const { refreshing, count, garmentFits } = this.state;

    const brandName = this.props.brands[brand - 1].name;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: photo }} />

          <View style={styles.favorite}>
            <FavoriteButton onPress={this.favoriteGarment} toggled={this.state.toggled} />
            {/* <Text>{this.state.fits.photo}</Text> */}
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <View style={styles.descriptionSectionLeft}>
            <Avatar size="small" rounded activeOpacity={0.7} />
            <View style={styles.descriptionText}>
              <Text style={styles.label}>{brandName}</Text>
              <Text>{model}</Text>
            </View>
          </View>

          <View style={styles.descriptionSectionRight}>
            <Text>802 adds to closet</Text>
          </View>
        </View>

        <View style={styles.colorSection}>
          <View style={styles.colorText}>
            <Text style={styles.label}>Color</Text>
            <Text>{color}</Text>
          </View>
          <View style={styles.colorSwatches}>
            <Avatar size="small" rounded activeOpacity={0.7} containerStyle={styles.swatch} />
            <Avatar size="small" rounded activeOpacity={0.7} containerStyle={styles.swatch} />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Add to favorites"
            buttonStyle={[AppStyles.buttonAltStyle, { width: Metrics.screenWidth / 2 - 20 }]}
            titleStyle={{ color: '#000', fontSize: 13 }}
          />
          <Button
            title="View website"
            onPress={this.handleOpenWithWebBrowser}
            buttonStyle={[AppStyles.buttonDefaultStyle, { width: Metrics.screenWidth / 2 - 20 }]}
            titleStyle={{ fontSize: 13 }}
          />
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Photos</Text>
          </View>

          <TouchableOpacity style={AppStyles.sectionSubtitle} onPress={this.addPhotoToFit}>
            <Ionicons name="ios-camera" size={25} style={{ marginRight: 10, color: '#aaa' }} />
            <Text>Add a photo</Text>
          </TouchableOpacity>

          <Carousel
            activeSlideAlignment="start"
            ref={c => {
              this._carousel = c;
            }}
            data={garmentFits.slice(0, 10)}
            renderItem={this._renderCarouselItem}
            sliderWidth={Metrics.screenWidth - 20}
            itemWidth={(Metrics.screenWidth - 20) / 3}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />

          {count > 0 && (
            <View style={AppStyles.button}>
              <Button
                title={`See all ${count} photos`}
                buttonStyle={[AppStyles.buttonAltStyle]}
                titleStyle={AppStyles.buttonAltTitleStyle}
                onPress={() => navigate('Fits', { garmentFits, id })}
              />
            </View>
          )}
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Discussion</Text>
          </View>

          {comments.length > 0 && (
            <CommentList
              {...this.props}
              data={comments.slice(0, 3)}
              renderViewComments
              renderLeaveComment
              numReplies={1}
              contentType="garment"
              objectId={id}
            />
          )}
          <View style={AppStyles.button}>
            <Button
              title={`See all discussion`}
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
              onPress={() =>
                navigate('Comments', {
                  objectId: id,
                  contentType: 'garment'
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, brands, comments }) => {
  return { user, brands: brands.items, comments: comments.items };
};

export default connect(mapStateToProps, {
  fetchBrands,
  favoriteGarment,
  tagGarmentToFit,
  clearCreatedFit,
  fetchComments
})(GarmentDetail);
