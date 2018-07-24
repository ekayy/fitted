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
import { Metrics } from '../Themes';

import GarmentsList from '../Components/GarmentsList';
import FavoriteButton from '../Components/FavoriteButton';
import axios from 'axios';
import { baseURL } from '../Config';

class FitDetail extends Component {
  state = {
    error: null,
    loading: true,
    garments: [],
    toggled: false
  };

  componentDidMount() {
    this.fetchGarments();
  }

  fetchGarments = async () => {
    const { garments } = this.props.navigation.state.params;

    const filteredGarments = garments.map(async garmentId => {
      const response = await axios.get(`${baseURL}/garments/${garmentId}`);

      try {
        this.setState({
          garments: [...this.state.garments, response.data],
          error: null,
          loading: false
        });
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
      }
    });
  };

  favoriteFit = async () => {
    const { id } = this.props.navigation.state.params;
    const userToken = await AsyncStorage.getItem('userToken');

    // console.tron.log(id);
    // console.tron.log(userToken);

    await axios.patch(
      `${baseURL}/profiles/52`,
      {
        favorites: [2]
      },
      {
        headers: {
          Authorization: `Token ${userToken}`
        }
      }
    );
  };

  render() {
    const { photo } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: photo }} />

            <View style={styles.favorite}>
              <FavoriteButton
                onPress={this.favoriteFit}
                toggled={this.state.toggled}
              />
              <Text>{this.state.garments.photo}</Text>
            </View>
          </View>

          <GarmentsList
            data={this.state.garments}
            navigation={this.props.navigation}
          />
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
  }
};

export default FitDetail;
