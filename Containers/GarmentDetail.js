import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { Button, Avatar } from 'react-native-elements';
import { Metrics } from '../Themes';
import styles from './Styles/GarmentDetailStyles';

import FavoriteButton from '../Components/FavoriteButton';
import FitsGrid from '../Components/FitsGrid';
import Comments from '../Components/Comment/List';
import { favoriteGarment } from '../Redux/UserRedux';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';
import { baseURL } from '../Config';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    fits: [],
    toggled: false,
    refreshing: false
  };

  componentDidMount() {
    this.fetchFits();
    this.getFavoriteState();
  }

  fetchFits = async () => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/fits/?garment=${id}`);

    try {
      this.setState({
        fits: response.data.results,
        error: null,
        loading: false
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

    await this.props.favoriteGarment(id, this.props.user);

    this.getFavoriteState();
  };

  handleOpenWithWebBrowser = () => {
    const { purchase_page } = this.props.navigation.state.params;

    WebBrowser.openBrowserAsync(purchase_page);
  };

  handleLoadMore = () => {
    // this.setState(
    //   {
    //     page: this.state.page + 1
    //   },
    //   () => {
    //     this.fetchGarments(this.state.page);
    //   }
    // );
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

    const { refreshing } = this.state;

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
            buttonStyle={styles.buttonAltStyle}
            titleStyle={{ color: '#000', fontSize: 13 }}
          />
          <Button
            title="View website"
            onPress={this.handleOpenWithWebBrowser}
            buttonStyle={styles.buttonDefaultStyle}
            titleStyle={{ fontSize: 13 }}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Photos</Text>
          </View>

          <TouchableOpacity style={styles.sectionSubtitle}>
            <Ionicons
              name="ios-camera"
              size={25}
              style={{ marginRight: 10, color: '#aaa' }}
            />
            <Text>Add a photo</Text>
          </TouchableOpacity>

          <FitsGrid
            data={this.state.fits}
            navigation={this.props.navigation}
            handleLoadMore={this.handleLoadMore}
            refreshing={refreshing}
          />

          <View style={styles.button}>
            <Button
              title="See all 130 photos"
              buttonStyle={[styles.buttonAltStyle, { width: '100%' }]}
              titleStyle={styles.buttonAltTitleStyle}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Top Reviews</Text>
          </View>

          <TouchableOpacity style={styles.sectionSubtitle}>
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

          <View style={styles.button}>
            <Button
              title="See all 987 reviews"
              buttonStyle={[styles.buttonAltStyle, { width: '100%' }]}
              titleStyle={styles.buttonAltTitleStyle}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Discussion</Text>
          </View>

          <Comments user={true} />

          <View style={styles.button}>
            <Button
              title="See all 2,900 comments"
              buttonStyle={[styles.buttonAltStyle, { width: '100%' }]}
              titleStyle={styles.buttonAltTitleStyle}
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
  { favoriteGarment }
)(GarmentDetail);
