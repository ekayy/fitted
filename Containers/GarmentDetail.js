import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { Button } from 'react-native-elements';
import { Metrics } from '../Themes';

import FavoriteButton from '../Components/FavoriteButton';
import FitsGrid from '../Components/FitsGrid';

import axios from 'axios';
import { baseURL } from '../Config';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    fits: [],
    toggled: false
  };

  componentDidMount() {
    this.fetchFits();
    this.getFavoriteState();
  }

  fetchFits = async () => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/fits/?garment=${id}`);

    try {
      this.setState({
        fits: response.data.results,
        error: null,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  getFavoriteState = () => {
    const { id } = this.props.navigation.state.params;
    const { favorites } = this.props.user;

    if (favorites.includes(id)) {
      this.setState({ toggled: true });
    } else {
      this.setState({ toggled: false });
    }
  };

  // favoriteGarment = async () => {
  //   // garmentId
  //   const { id } = this.props.navigation.state.params;
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   const userId = await AsyncStorage.getItem('userId');
  //   const favorites = await AsyncStorage.getItem(JSON.parse('favorites'));
  //
  //   console.tron.log(favorites);
  //
  //   await axios.patch(
  //     `${baseURL}/profiles/${userId}`,
  //     {
  //       favorites: [...favorites, id]
  //     },
  //     {
  //       headers: {
  //         Authorization: `Token ${userToken}`
  //       }
  //     }
  //   );
  // };

  handleOpenWithWebBrowser = () => {
    const { purchase_page } = this.props.navigation.state.params;

    WebBrowser.openBrowserAsync(purchase_page);
  };

  render() {
    const {
      id,
      color,
      sku,
      brand,
      model,
      photo
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: photo }} />

            <View style={styles.favorite}>
              <FavoriteButton onPress={this.favoriteGarment} />
              <Text>{this.state.fits.photo}</Text>
            </View>
          </View>

          <View style={styles.button}>
            <Button
              title="Visit Store"
              onPress={this.handleOpenWithWebBrowser}
            />
          </View>

          <View style={styles.description}>
            <View>
              <Text>
                {model} in {color}
              </Text>
            </View>
          </View>

          <FitsGrid data={this.state.fits} navigation={this.props.navigation} />
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
    minHeight: 400
  },
  button: {
    marginVertical: 20
  },
  favorite: {
    position: 'absolute',
    bottom: 0,
    right: Metrics.baseMargin
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
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  }
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(GarmentDetail);
