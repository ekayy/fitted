import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';

// Styles
import styles from './Styles/BrandsStyle';

import { fetchBrands } from '../Redux/BrandsRedux';

const brands = [
  {
    name: '3sixteen',
    photo:
      'https://static1.squarespace.com/static/597e5956bebafb171304e388/t/5a1ceeab24a694106de87998/1511845608566/3sixteen_logo_SMRpeug.jpg',
    id: 1
  },
  {
    name: 'Carhatt WIP',
    photo:
      'https://static1.squarespace.com/static/597e5956bebafb171304e388/t/59cf1ccb914e6b6e0eaad8b6/1506745551870/?format=1000w',
    id: 2
  },
  {
    name: 'Fear of God',
    photo:
      'https://static1.squarespace.com/static/597e5956bebafb171304e388/t/5983c9c0cd39c369f60f96a5/1505374841466/?format=1000w',
    id: 3
  },
  {
    name: 'John Elliot',
    photo:
      'https://static1.squarespace.com/static/597e5956bebafb171304e388/t/59ba2dcc37c581d3733c1a18/1505373649624/JE+logo+new.png',
    id: 4
  },
  {
    name: 'Reigning Champ',
    photo:
      'http://whatdropsnow.s3.amazonaws.com/brands/logos/458/768aef705d72a269b8799a083c25b985de9016b0.png',
    id: 5
  }
];

class Brands extends Component {
  componentDidMount() {
    // this.props.fetchBrands();
  }

  renderBrands() {
    // return Object.values(this.props.brands).map(brand => {
    return brands.map(brand => {
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

// const mapStateToProps = state => {
//   return {
//     brands: state.brands.items
//   };
// };

// export default connect(
//   mapStateToProps,
//   { fetchBrands }
// )(Brands);

export default Brands;
