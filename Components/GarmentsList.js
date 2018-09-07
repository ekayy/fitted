import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrics } from '../Themes';

import { brands } from '../data.json';

class GarmentsList extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol } = this.props;
    const { id, color, model, sku, brand, photo } = item;
    const brandName = brands[brand].name;

    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => navigate('GarmentDetail', item)}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: photo }} />
          </View>
        </TouchableOpacity>
        <View style={styles.description}>
          <Text>{brandName}</Text>
          <Text>{model}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { data, numColumns } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={({ item }) => this.renderGarment(item)}
        scrollEnabled={false}
      />
    );
  }
}

const styles = {
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1,
    width: 120,
    height: 200
  },
  image: {
    width: '100%',
    height: 200,
    margin: 20
  },
  description: {
    flex: 1,
    alignItems: 'center'
  }
};

export default GarmentsList;
