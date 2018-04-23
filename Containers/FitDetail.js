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

import GarmentList from '../Components/GarmentList';

import { garments } from '../data.json';

class FitDetail extends Component {
  render() {
    const {
      id,
      username,
      color,
      model,
      size,
      image,
      garmentIds
    } = this.props.navigation.state.params;
    const filteredGarments = garmentIds.map(id => garments[id]);

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{model}</Text>
          <Image style={styles.image} source={{ uri: image }} />
          <GarmentList
            data={filteredGarments}
            navigation={this.props.navigation}
          />
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

export default FitDetail;
