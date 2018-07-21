import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';

// Styles
import styles from './Styles/BrandsStyle';

import { fetchBrands } from '../Redux/BrandsRedux';
import { brands } from '../data.json';

class Brands extends Component {
  componentDidMount() {
    this.props.fetchBrands();
  }

  renderBrands() {
    return Object.values(this.props.brands).map(brand => {
      const { navigate } = this.props.navigation;
      const { id, name, photo } = brand;
      return (
        <TouchableOpacity
          key={name}
          onPress={() => navigate('BrandOverview', brand)}
        >
          <Image
            resizeMode={'contain'}
            style={styles.image}
            source={{ uri: photo }}
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

const mapStateToProps = state => {
  return {
    brands: state.brands.items
  };
};

export default connect(
  mapStateToProps,
  { fetchBrands }
)(Brands);
