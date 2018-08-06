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

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Favorites' },
      { key: 'fits', title: 'Fits' }
    ],
    loading: true,
    favoriteFits: [],
    favoriteGarments: []
  };

  componentDidMount() {
    // this.fetchFavoriteGarments();
    this.fetchFavoriteFits();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.isFocused && nextProps.isFocused) {
  //     this.fetchFavoriteFits();
  //   }
  // }

  fetchFavoriteGarments = async () => {
    this.props.favorites.map(async garmentId => {
      const response = await axios.get(`${baseURL}/garments/${garmentId}`);

      try {
        this.setState({
          favoriteGarments: [response.data],
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
    this.props.favorites.map(async fitId => {
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
          profile={this.props.profile}
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
  },
  tabContainer: {
    flex: 1
  }
};

const mapStateToProps = state => {
  return {
    favorites: state.user.favorites,
    profile: state.user.profile
  };
};

export default connect(mapStateToProps)(withNavigationFocus(Profile));
