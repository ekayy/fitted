import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import styles from './Styles/BrandScreenStyle';

import { brands } from '../data.json';

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  handlePress(data) {
    const { navigate } = this.props.navigation;
    navigate('Garments', data);
  }

  renderBrands() {
    return Object.values(brands).map(brand => {
      return (
        <TouchableOpacity
          key={brand.name}
          onPress={() => this.handlePress(brand)}
        >
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{ uri: brand.url }}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return <View style={styles.container}>{this.renderBrands()}</View>;
  }
}

export default Brands;
