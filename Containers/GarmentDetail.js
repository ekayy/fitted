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
import Comments from '../Components/Comment/List';
import { favoriteGarment } from '../Redux/UserRedux';
import { tagGarmentToFit, clearCreatedFit } from '../Redux/FitsRedux';
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
    this.getFavoriteState();
  }

  fetchFits = async () => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/fits/?garment=${id}&limit=10`);

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
      photo
    } = this.props.navigation.state.params;

    const { refreshing, count } = this.state;

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
          <Avatar size="small" rounded activeOpacity={0.7} />
          <View style={styles.descriptionText}>
            <Text style={styles.label}>{brand}</Text>
            <Text>{model}</Text>
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
            data={this.state.fits}
            renderItem={this._renderCarouselItem}
            sliderWidth={Metrics.screenWidth - 20}
            itemWidth={(Metrics.screenWidth - 20) / 3}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />

          <View style={AppStyles.button}>
            <Button
              title={`See all ${count} photos`}
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
            />
          </View>
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Top Reviews</Text>
          </View>

          <TouchableOpacity style={AppStyles.sectionSubtitle}>
            <Ionicons
              name="ios-brush"
              size={25}
              style={{ marginRight: 10, color: '#aaa' }}
            />
            <Text>Write a review</Text>
          </TouchableOpacity>

          <View style={styles.reviews}>
            <View style={styles.reviewItem}>
              <Text>username1</Text>
              <Text>
                Irure aliquip adipisicing ullamco officia labore eu ad consequat
                ipsum ad. Adipisicing tempor irure incididunt deserunt culpa
                proident aute voluptate deserunt proident sit cillum.
              </Text>
            </View>

            <View style={styles.reviewItem}>
              <Text>username2</Text>
              <Text>
                Irure aliquip adipisicing ullamco officia labore eu ad consequat
                ipsum ad. Adipisicing tempor irure incididunt deserunt culpa
                proident aute voluptate deserunt proident sit cillum.
              </Text>
            </View>
          </View>

          <View style={AppStyles.button}>
            <Button
              title="See all 987 reviews"
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
            />
          </View>
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Discussion</Text>
          </View>

          <Comments user={true} />

          <View style={AppStyles.button}>
            <Button
              title="See all 2,900 comments"
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  { favoriteGarment, tagGarmentToFit, clearCreatedFit }
)(GarmentDetail);
