import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';

import { profiles } from '../data.json';

class FitsGrid extends Component {
  renderFit(item) {
    const { navigate } = this.props.navigation;
    const { profile, description, style, photo, likes, garments } = item;

    return (
      <TouchableOpacity onPress={() => navigate('FitDetail', item)}>
        <View style={styles.gridItem}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => this.renderFit(item)}
        scrollEnabled={false}
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  gridItem: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image: {
    width: undefined,
    height: 200
  }
};

export default FitsGrid;
