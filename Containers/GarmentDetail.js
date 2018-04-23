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

import FitList from '../Components/FitList';

import { fits } from '../data.json';

class GarmentDetail extends Component {
  render() {
    const {
      sku,
      color,
      brand,
      model,
      image,
      fitIds
    } = this.props.navigation.state.params;

    const filteredFits = fitIds.map(id => fits[id]);

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{model}</Text>
          <Image style={styles.image} source={{ uri: image }} />
          <FitList data={filteredFits} navigation={this.props.navigation} />
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
    minHeight: 500
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

export default GarmentDetail;
