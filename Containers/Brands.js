import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';

// Styles
import styles from './Styles/BrandsStyle';

import { brands } from '../data.json';

class Brands extends Component {
  renderBrands() {
    return Object.values(brands).map(brand => {
      const { navigate } = this.props.navigation;
      const { name, image } = brand;
      return (
        <TouchableOpacity
          key={name}
          onPress={() => navigate('BrandOverview', brand)}
        >
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{ uri: image }}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>{this.renderBrands()}</ScrollView>
    );
  }
}

export default Brands;
