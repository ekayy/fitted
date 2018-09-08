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
    loading: false,
    refreshing: false,
    favoriteFits: [],
    favoriteGarments: []
  };

  componentDidMount() {
    this.fetchFavoriteGarments();
    this.fetchFavoriteFits();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.favoriteGarments != this.props.favoriteGarments) {
      this.setState({ refreshing: true, favoriteGarments: [] }, () => {
        this.fetchFavoriteGarments();
      });
    }

    if (previousProps.favoriteFits != this.props.favoriteFits) {
      this.setState({ refreshing: true, favoriteFits: [] }, () => {
        this.fetchFavoriteFits();
      });
    }
  }

  fetchFavoriteGarments = async () => {
    this.setState({
      error: null,
      refreshing: true
    });

    await Promise.all(
      this.props.favoriteGarments.map(async garmentId => {
        const response = await axios.get(`${baseURL}/garments/${garmentId}`);

        try {
          this.setState({
            favoriteGarments: [...this.state.favoriteGarments, response.data]
          });
        } catch (error) {
          this.setState({
            error
          });
        }
      })
    );

    this.setState({
      error: null,
      loading: false,
      refreshing: false
    });
  };

  fetchFavoriteFits = async () => {
    this.setState({
      error: null,
      refreshing: true
    });

    await Promise.all(
      this.props.favoriteFits.map(async fitId => {
        const response = await axios.get(`${baseURL}/fits/${fitId}`);

        try {
          this.setState({
            favoriteFits: [...this.state.favoriteFits, response.data]
          });
        } catch (error) {
          this.setState({
            error
          });
        }
      })
    );

    this.setState({
      error: null,
      refreshing: false
    });
  };

  handleGarmentRefresh = () => {
    this.setState({ refreshing: true, favoriteGarments: [] }, () => {
      this.fetchFavoriteGarments();
    });
  };

  handleFitRefresh = () => {
    this.setState({ refreshing: true, favoriteFits: [] }, () => {
      this.fetchFavoriteFits();
    });
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

  _renderHeader = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      tabStyle={styles.tabStyle}
      style={styles.tabBarStyle}
    />
  );

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
            onRefresh={this.handleGarmentRefresh}
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
            onRefresh={this.handleFitRefresh}
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
  },

  tabBarStyle: {
    backgroundColor: '#fff'
  },
  tabStyle: {
    backgroundColor: 'red'
  },
  indicatorStyle: {
    backgroundColor: 'red'
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
