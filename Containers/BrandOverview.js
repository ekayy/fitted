import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Metrics } from '../Themes';

import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';

import { garments, fits } from '../data.json';

const initialLayout = {
  height: 0,
  width: Metrics.screenWidth
};

class BrandOverview extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Garments' },
      { key: 'fits', title: 'Fits' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const { garmentIds, fitIds } = this.props.navigation.state.params;
    const filteredGarments = garmentIds.map(id => garments[id]);
    const filteredFits = fitIds.map(id => fits[id]);

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={filteredGarments}
            navigation={this.props.navigation}
            numCol={2}
          />
        );
      case 'fits':
        return (
          <FitsGrid data={filteredFits} navigation={this.props.navigation} />
        );
      default:
        return null;
    }
  };

  // _renderItem() {
  //   const { navigate } = this.props.navigation;
  //   const { garmentIds } = this.props.navigation.state.params;
  //   const filteredGarments = garmentIds.map(id => garments[id]);
  //   return filteredGarments.map(garment => {
  //     const { id, color, model, sku, brand, image } = garment;
  //     return (
  //       <TouchableOpacity
  //         style={styles.imageContainer}
  //         onPress={() => {
  //           navigate('GarmentDetail', garment);
  //         }}
  //         key={id}
  //       >
  //         <Image style={styles.image} source={{ uri: image }} />
  //         <Text style={styles.text}>{model}</Text>
  //       </TouchableOpacity>
  //     );
  //   });
  // }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    width: Metrics.screenWidth / 2 - 20
  },
  image: {
    height: 200,
    marginVertical: 10,
    width: Metrics.screenWidth / 2 - 20
  }
};

export default BrandOverview;
