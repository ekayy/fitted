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
    currentId: 2,
    favorites: []
  };

  componentDidMount() {
    const { currentId } = this.props;
    axios
      .get(`http://localhost:8000/profiles/${this.state.currentId}`)
      .then(response => {
        this.setState({ favorites: response.data.favorites });
      })
      .catch(error => console.log(error));
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const { garments } = this.props;
    console.log(garments);
    const favoriteGarmentsList = this.state.favorites.map(id => garments[id]);
    // const favoriteFitsList = favoriteFits.map(id => fits[id]);

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={favoriteGarmentsList}
            navigation={this.props.navigation}
          />
        );
      case 'fits':
        return <FitsGrid data={fits} navigation={this.props.navigation} />;
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

export default connect(mapStateToProps, { fetchProfiles })(Profile);
