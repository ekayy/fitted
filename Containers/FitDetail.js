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

import GarmentsList from '../Components/GarmentsList';
import axios from 'axios';

// import { garments } from '../data.json';

class FitDetail extends Component {
  state = {
    error: null,
    loading: true,
    garments: []
  };

  componentDidMount() {
    this.fetchGarments();
  }

  fetchGarments = async () => {
    const { garments } = this.props.navigation.state.params;

    const filteredGarments = garments.map(async garmentId => {
      const response = await axios.get(
        `http://localhost:8000/garments/${garmentId}`
      );

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

  render() {
    const { photo } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{ uri: photo }} />
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
