import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Metrics } from '../Themes';

import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';
import Reactotron from 'reactotron-react-native';
import axios from 'axios';
import { baseURL } from '../Config';

const initialLayout = {
  height: 0,
  width: Metrics.screenWidth
};

class BrandOverview extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Garments' },
      { key: 'fits', title: 'Fits' }
    ],
    garments: [],
    error: null,
    loading: true,
    page: 1
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    this.fetchFits(this.state.page);
    this.fetchGarments(this.state.page, id);
  }

  fetchGarments = async page => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(
      `${baseURL}/garments/?page=${page}&brand=${id}`
    );

    try {
      this.setState({
        garments: [...this.state.garments, ...response.data.results],
        error: null,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchFits = async () => {
    const response = await axios.get(`${baseURL}/fits/?page=1`);

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

  handleLoadMore = () => {
    const { id } = this.props.navigation.state.params;

    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.fetchGarments(this.state.page);
      }
    );
  };

  renderFooter = () => {
    const { loading } = this.state;

    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = ({ route }) => {
    const { garments, fits, loading } = this.state;

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={garments}
            navigation={this.props.navigation}
            numCol={2}
            handleLoadMore={this.handleLoadMore}
            refreshing={loading}
            ListFooterComponent={this.renderFooter}
          />
        );
      case 'fits':
        return <FitsGrid data={fits} navigation={this.props.navigation} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f3f3f3'
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    width: Metrics.screenWidth / 2 - 20
  },
  image: {
    height: 200,
    marginVertical: 10,
    width: Metrics.screenWidth / 2 - 20
  },
  loading: {
    paddingVertical: 20,
    flex: 1
  }
};

export default BrandOverview;
