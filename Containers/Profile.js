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
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

import FitList from '../Components/FitList';
import GarmentList from '../Components/GarmentList';

import { profiles, fits, garments } from '../data.json';

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Favorites' },
      { key: 'fits', title: 'Fits' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const {
      id,
      user,
      favorites,
      favoriteFits,
      height,
      weight,
      followed_by
    } = profiles[1];
    const favoriteGarmentsList = favorites.map(id => garments[id]);
    const favoriteFitsList = favoriteFits.map(id => fits[id]);

    switch (route.key) {
      case 'garments':
        return (
          <GarmentList
            data={favoriteGarmentsList}
            navigation={this.props.navigation}
          />
        );
      case 'fits':
        return (
          <FitList data={favoriteFitsList} navigation={this.props.navigation} />
        );
      default:
        return null;
    }
  };

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
  }
};

export default Profile;
