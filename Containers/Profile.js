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
  FlatList,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import ProfileHeader from '../Components/ProfileHeader';
import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';
import { fetchProfiles } from '../Redux/ProfilesRedux';
import { baseURL } from '../Config';
import { withNavigationFocus } from 'react-navigation';

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Favorites' },
      { key: 'fits', title: 'Fits' }
    ],
    loading: true,
    refreshing: false,
    favoriteFits: [],
    favoriteGarments: []
  };

  componentDidMount() {
    this.fetchFavoriteGarments();
    this.fetchFavoriteFits();
  }

  fetchFavoriteGarments = async () => {
    this.setState({
      error: null,
      loading: true,
      refreshing: true
    });

    await this.props.favoriteGarments.map(async garmentId => {
      const response = await axios.get(`${baseURL}/garments/${garmentId}`);

      try {
        this.setState({
          favoriteGarments: [...this.state.favoriteGarments, response.data]
        });
      } catch (error) {
        this.setState({
          error,
          loading: false,
          refreshing: false
        });
      }
    });

    this.setState({
      error: null,
      loading: false,
      refreshing: false
    });
  };

  fetchFavoriteFits = async () => {
    this.setState({
      error: null,
      loading: true,
      refreshing: true
    });

    await this.props.favoriteFits.map(async fitId => {
      const response = await axios.get(`${baseURL}/fits/${fitId}`);

      try {
        this.setState({
          favoriteFits: [...this.state.favoriteFits, response.data]
        });
      } catch (error) {
        this.setState({
          error,
          loading: false,
          refreshing: false
        });
      }
    });

    this.setState({
      error: null,
      loading: false,
      refreshing: false
    });
  };

  handleRefresh = () => {
    this.setState(
      { refreshing: true, favoriteGarments: [], favoriteFits: [] },
      () => {
        this.fetchFavoriteGarments();
        this.fetchFavoriteFits();
      }
    );
  };

  handleLoadMore = () => {};

  render() {
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width
    };

    return (
      <View style={styles.container}>
        <ProfileHeader
          navigation={this.props.navigation}
          user={this.props.user}
        />

        <View style={styles.tabContainer}>
          <TabViewAnimated
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
          />
        </View>
      </View>
    );
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const {
      favoriteGarments,
      favoriteFits,
      loading,
      page,
      refreshing
    } = this.state;

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={favoriteGarments}
            navigation={this.props.navigation}
            numCol={3}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
          />
        );
      case 'fits':
        return (
          <FitsGrid
            data={favoriteFits}
            navigation={this.props.navigation}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
          />
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
  },
  tabContainer: {
    flex: 1
  }
};

const mapStateToProps = state => {
  return {
    favoriteGarments: state.user.favoriteGarments,
    favoriteFits: state.user.favoriteFits,
    user: state.user
  };
};

export default connect(mapStateToProps)(withNavigationFocus(Profile));
