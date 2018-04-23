import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { garments } from '../data.json';

class Garments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress(data) {
    const { navigate } = this.props.navigation;
    navigate('Fits', data);
  }

  _renderItem() {
    const { garmentIds } = this.props.navigation.state.params;
    const filteredGarments = garmentIds.map(id => garments[id]);
    return filteredGarments.map(garment => {
      const { id, color, model, sku, brand, image } = garment;
      return (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.handlePress(garment);
          }}
          key={id}
        >
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.text}>{model}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return <View style={styles.container}>{this._renderItem()}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    width: Dimensions.get('window').width / 2 - 20
  },
  image: {
    height: 200,
    marginVertical: 10,
    width: Dimensions.get('window').width / 2 - 20
  }
};

export default Garments;
