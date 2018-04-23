import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { fits } from '../data.json';

class Fits extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem() {
    const { fitIds } = this.props.navigation.state.params;
    const filteredFits = fitIds.map(id => fits[id]);
    return filteredFits.map(fit => {
      const {
        id,
        username,
        model,
        size,
        color,
        height,
        weight,
        image,
        garmentIds
      } = fit;
      return (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {}}
          key={id}
        >
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.text}>{username}</Text>
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

export default Fits;
