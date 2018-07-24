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
import { connect } from 'react-redux';
import { fetchProfiles } from '../Redux/ProfilesRedux';
import { baseURL } from '../Config';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';

import axios from 'axios';
import { fits } from '../data.json';

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Favorites' },
      { key: 'fits', title: 'Fits' }
    ],
    currentId: 52,
    favorites: [],
    favoriteFits: ''
  };

  componentDidMount() {
    const { currentId } = this.props;

    axios
      .get(`${baseURL}/${this.state.currentId}`)
      .then(response => {
        this.setState({ favorites: response.data.favorites });

        this.fetchFavorites();
      })
      .catch(error => console.log(error));
  }

  fetchFavorites = async () => {
    this.state.favorites.map(async fitId => {
      const response = await axios.get(`http://localhost:8000/fits/${fitId}`);

      try {
        this.setState({
          favoriteFits: [...this.state.favoriteFits, response.data],
          error: null,
          loading: false
        });

        console.log(this.state.favoriteFits);
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
      }
    });
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'garments':
        return (
          <FitsGrid
            data={this.state.favoriteFits}
            navigation={this.props.navigation}
          />
        );
      case 'fits':
        return (
          <FitsGrid
            data={this.state.favoriteFits}
            navigation={this.props.navigation}
          />
        );
      default:
        return null;
    }
  };

  handlePress = () => {
    this.props.fetchProfiles(2);
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
        <TouchableOpacity onPress={this.handlePress}>
          <Text>Load More</Text>
        </TouchableOpacity>
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

const mapStateToProps = state => {
  return {
    currentId: state.login.id,
    garments: state.garments.items,
    fits: state.fits.items
  };
};

export default connect(
  mapStateToProps,
  { fetchProfiles }
)(Profile);
