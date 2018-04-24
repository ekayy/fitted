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

import { brands, fits } from '../data.json';

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
    const brandName = brands[brand].name;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.favorite}>
              <FavoriteButton />
            </View>
          </View>
          <View style={styles.description}>
            <View>
              <Text>
                {brandName} - {model} in {color}
              </Text>
            </View>
          </View>
          <FitsGrid data={filteredFits} navigation={this.props.navigation} />
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
