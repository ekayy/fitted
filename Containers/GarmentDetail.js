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
import { favoriteGarment } from '../Redux/UserRedux';

import axios from 'axios';
import { baseURL } from '../Config';

class GarmentDetail extends Component {
  state = {
    error: null,
    loading: true,
    fits: [],
    toggled: false,
    refreshing: false
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
    const { favoriteGarments } = this.props.user;

    if (favoriteGarments.includes(id)) {
      this.setState({ toggled: true });
    } else {
      this.setState({ toggled: false });
    }
  };

  favoriteGarment = async () => {
    // garmentId
    const { id } = this.props.navigation.state.params;

    await this.props.favoriteGarment(id, this.props.user);

    this.getFavoriteState();
  };

  handleOpenWithWebBrowser = () => {
    const { purchase_page } = this.props.navigation.state.params;

    WebBrowser.openBrowserAsync(purchase_page);
  };

  handleLoadMore = () => {
    // this.setState(
    //   {
    //     page: this.state.page + 1
    //   },
    //   () => {
    //     this.fetchGarments(this.state.page);
    //   }
    // );
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

    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: photo }} />

            <View style={styles.favorite}>
              <FavoriteButton
                onPress={this.favoriteGarment}
                toggled={this.state.toggled}
              />
              <Text>{this.state.fits.photo}</Text>
            </View>
          </View>

          <View style={styles.description}>
            <View>
              <Text>
                {model} in {color}
              </Text>
            </View>
          </View>

          <View style={styles.button}>
            <Button
              title="Visit Store"
              onPress={this.handleOpenWithWebBrowser}
              buttonStyle={styles.buttonStyle}
            />
          </View>

          <FitsGrid
            data={this.state.fits}
            navigation={this.props.navigation}
            handleLoadMore={this.handleLoadMore}
            refreshing={refreshing}
          />
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
  buttonStyle: {
    backgroundColor: 'red'
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

export default connect(
  mapStateToProps,
  { favoriteGarment }
)(GarmentDetail);
