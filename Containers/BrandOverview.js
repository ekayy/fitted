import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Metrics } from '../Themes';

import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';
import axios from 'axios';
import { baseURL } from '../Config';

const initialLayout = {
  height: 0,
  width: Metrics.screenWidth,
};

class BrandOverview extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Garments' },
      { key: 'fits', title: 'Fits' },
    ],
    garments: [],
    fits: [],
    error: null,
    loading: false,
    refreshing: false,
    page: 1,
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    this.fetchFits(this.state.page);
    this.fetchGarments(this.state.page, id);
  }

  fetchGarments = async (page) => {
    const { id } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/garments/?page=${page}&brand=${id}`);

    try {
      this.setState({
        garments: [...this.state.garments, ...response.data.results],
        error: null,
        loading: false,
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
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleGarmentsRefresh = () => {
    this.setState({ refreshing: true, garments: [] }, async () => {
      const { id } = this.props.navigation.state.params;

      await this.fetchGarments(this.state.page, id);

      this.setState({
        refreshing: false,
      });
    });
  };

  handleFitsRefresh = () => {
    this.setState({ refreshing: true, fits: [] }, async () => {
      await this.fetchFits(this.state.page);

      this.setState({
        refreshing: false,
      });
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchGarments(this.state.page);
      },
    );
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderHeader = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      tabStyle={styles.tabStyle}
      style={styles.tabBarStyle}
    />
  );

  _renderScene = ({ route }) => {
    const { garments, fits, loading, page, refreshing } = this.state;

    switch (route.key) {
      case 'garments':
        return (
          <GarmentsGrid
            data={garments}
            navigation={this.props.navigation}
            numCol={2}
            onRefresh={this.handleGarmentsRefresh}
            handleLoadMore={this.handleLoadMore}
            refreshing={loading}
            loading={loading}
            page={page}
          />
        );
      case 'fits':
        return (
          <FitsGrid
            data={fits}
            navigation={this.props.navigation}
            onRefresh={this.handleFitsRefresh}
            handleLoadMore={this.handleLoadMore}
            refreshing={refreshing}
            loading={loading}
            page={page}
          />
        );
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
    backgroundColor: '#f3f3f3',
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    width: Metrics.screenWidth / 2 - 20,
  },
  image: {
    height: 200,
    marginVertical: 10,
    width: Metrics.screenWidth / 2 - 20,
  },
  loading: {
    paddingVertical: 20,
    flex: 1,
  },

  tabBarStyle: {
    backgroundColor: '#fff',
  },
  tabStyle: {
    backgroundColor: 'red',
  },
  indicatorStyle: {
    backgroundColor: 'red',
  },
};

export default BrandOverview;
