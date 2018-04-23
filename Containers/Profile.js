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

import Favorites from '../Components/Favorites';

import { profiles, garments } from '../data.json';

class Profile extends Component {
  render() {
    const { id, user, favorites, height, weight, followed_by } = profiles[1];
    const favoriteList = favorites.map(id => garments[id]);
    return (
      <ScrollView style={styles.container}>
        <Text>
          {user.first_name} {user.last_name}
        </Text>
        <Text>{user.username}</Text>
        <Favorites data={favoriteList} />
        <Favorites data={favoriteList} />
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
