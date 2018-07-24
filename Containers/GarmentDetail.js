import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { Metrics } from '../Themes';

import FavoriteButton from '../Components/FavoriteButton';
import FitsGrid from '../Components/FitsGrid';

import axios from 'axios';
import { baseURL } from '../Config';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    fits: []
  };

  componentDidMount() {
    this.fetchFits();
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

  render() {
    const {
      id,
      color,
      sku,
      brand,
      model,
      photo
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: `https://${photo}` }} />
            <View style={styles.favorite}>
              <FavoriteButton />
              <Text>{this.state.fits.photo}</Text>
            </View>
          </View>
          <View style={styles.description}>
            <View>
              <Text>
                {model} in {color}
              </Text>
            </View>
          </View>

          <FitsGrid data={this.state.fits} navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400
  },
  favorite: {
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image2: {
    width: undefined,
    height: 200
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  }
};

export default GarmentDetail;
