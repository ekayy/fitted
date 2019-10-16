import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { Button, Avatar } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { AppStyles, Metrics } from '../Themes';
import styles from './Styles/GarmentDetailStyles';

import FavoriteButton from '../Components/FavoriteButton';
import CommentSingle from '../Components/Comment/CommentSingle';
import { favoriteGarment } from '../Redux/UserRedux';
import { tagGarmentToFit, clearCreatedFit } from '../Redux/FitsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';
import { baseURL } from '../Config';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    fits: [],
    toggled: false,
    refreshing: false,
    count: null
  };

  componentDidMount() {
    this.fetchFits();
    this.props.fetchBrands();
    this.getFavoriteState();
  }

  fetchFits = async () => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(
      `${baseURL}/fits/?garment=${id}&limit=100`
    );

    try {
      this.setState({
        fits: response.data.results,
        error: null,
        loading: false,
        count: response.data.count
      });
    } catch (error) {
      console.log(error);
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
        width: undefined,
        height: 150
      }
    };

    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigate('FitDetail', item)}
      >
        <Image style={styles.item} source={{ uri: photo }} />
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
    const {
      id,
      color,
      sku,
      brand,
      model,
      photo,
      comments
    } = this.props.navigation.state.params;
    const currentGarment = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    const { refreshing, count, fits } = this.state;

    const brandName = this.props.brands[brand - 1].name;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: photo }} />

          <View style={styles.favorite}>
            <FavoriteButton
              onPress={this.favoriteGarment}
              toggled={this.state.toggled}
            />
            <Text>{this.state.fits.photo}</Text>
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
            <Avatar
              size="small"
              rounded
              activeOpacity={0.7}
              containerStyle={styles.swatch}
            />
            <Avatar
              size="small"
              rounded
              activeOpacity={0.7}
              containerStyle={styles.swatch}
            />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Add to favorites"
            buttonStyle={[
              AppStyles.buttonAltStyle,
              { width: Metrics.screenWidth / 2 - 20 }
            ]}
            titleStyle={{ color: '#000', fontSize: 13 }}
          />
          <Button
            title="View website"
            onPress={this.handleOpenWithWebBrowser}
            buttonStyle={[
              AppStyles.buttonDefaultStyle,
              { width: Metrics.screenWidth / 2 - 20 }
            ]}
            titleStyle={{ fontSize: 13 }}
          />
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Photos</Text>
          </View>

          <TouchableOpacity
            style={AppStyles.sectionSubtitle}
            onPress={this.addPhotoToFit}
          >
            <Ionicons
              name="ios-camera"
              size={25}
              style={{ marginRight: 10, color: '#aaa' }}
            />
            <Text>Add a photo</Text>
          </TouchableOpacity>

          <Carousel
            activeSlideAlignment="start"
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.fits.slice(0, 10)}
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
                onPress={() => navigate('Fits', { fits, currentGarment })}
              />
            </View>
          )}
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Discussion</Text>
          </View>

          {comments.length > 0 && (
            <CommentSingle
              data={comments[0]}
              renderViewComments
              renderLeaveComment
              viewComments={() =>
                navigate('CommentIndex', { comment: comments[0] })
              }
              leaveComment={() => {}}
            />
          )}
          <View style={AppStyles.button}>
            <Button
              title={`See all discussion`}
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
              onPress={() => navigate('Comments', { comments })}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, brands }) => {
  return { user, brands: brands.items };
};

export default connect(
  mapStateToProps,
  { fetchBrands, favoriteGarment, tagGarmentToFit, clearCreatedFit }
)(GarmentDetail);
