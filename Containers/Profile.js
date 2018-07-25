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
import ProfileHeader from '../Components/ProfileHeader';
import { baseURL } from '../Config';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';

import axios from 'axios';
// import { fits } from '../data.json';

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Favorites' },
      { key: 'fits', title: 'Fits' }
    ],
    loading: true,
    currentId: 52,
    user: [],
    favorites: [],
    favoriteFits: [],
    favoriteGarments: []
  };

  componentDidMount() {
    const { currentId } = this.props;

    this.fetchProfile();
  }

  fetchProfile = async () => {
    try {
      const profile = await axios.get(
        `${baseURL}/profiles/${this.state.currentId}`
      );

      this.setState({
        favorites: profile.data.favorites,
        user: profile.data.user
      });

      this.fetchFavoriteGarments();
      this.fetchFavoriteFits();
    } catch (error) {
      console.error(error);
    }
  };

  fetchFavoriteGarments = async () => {
    this.state.favorites.map(async garmentId => {
      const response = await axios.get(`${baseURL}/garments/${garmentId}`);

      try {
        this.setState({
          favoriteGarments: [...this.state.favoriteGarments, response.data],
          error: null,
          loading: false
        });
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
      }
    });
  };

  fetchFavoriteFits = async () => {
    this.state.favorites.map(async fitId => {
      const response = await axios.get(`${baseURL}/fits/${fitId}`);

      try {
        this.setState({
          favoriteFits: [...this.state.favoriteFits, response.data],
          error: null,
          loading: false
        });
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
      }
    });
  };

  handleLoadMore = () => {};

  render() {
    return (
      <ScrollView style={styles.container}>
        <ProfileHeader
          navigation={this.props.navigation}
          user={this.state.user}
        />

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

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const { favoriteGarments, favoriteFits, loading, page } = this.state;

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={favoriteGarments}
            navigation={this.props.navigation}
            numCol={3}
            handleLoadMore={this.handleLoadMore}
            refreshing={loading}
            loading={loading}
          />
        );
      case 'fits':
        return (
          <FitsGrid data={favoriteFits} navigation={this.props.navigation} />
        );
      default:
        return null;
    }
  };
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f3f3f3'
  }
};

export default Profile;