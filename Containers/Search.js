import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { Metrics } from '../Themes';
import axios from 'axios';

import GarmentsGrid from '../Components/GarmentsGrid';
import { baseURL } from '../Config';

class Search extends Component {
  static navigationOptions = {
    title: 'Search'
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      garments: [],
      results: [],
      remainingResults: [],
      error: null,
      loading: true,
      refreshing: false,
      page: 1,
      limit: 9999
    };
  }

  componentDidMount() {
    this.fetchGarments(this.state.limit);
  }

  fetchGarments = async limit => {
    const response = await axios.get(`${baseURL}/garments/?limit=${limit}`);

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

  handleChange = searchTerm => {
    const filteredResults = this.state.garments.filter(result => {
      return result.model.toLowerCase().includes(searchTerm);
    });

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true, results: [] }, () => {
      this.fetchGarments();
    });
  };

  // do nothing because the entire page is loaded
  handleLoadMore = () => {
    const { remainingResults, results } = this.state;

    this.setState({
      loading: true
    });

    this.setState({
      remainingResults: remainingResults.slice(10),
      results: [...results, ...remainingResults.slice(0, 10)],
      loading: false
    });
  };

  render() {
    const { searchTerm, results, loading, refreshing, page } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          placeholder="Search"
          onChangeText={this.handleChange}
          autoCapitalize="none"
          platform="ios"
          value={searchTerm}
        />

        <GarmentsGrid
          data={results}
          navigation={this.props.navigation}
          numCol={2}
          handleLoadMore={this.handleLoadMore}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
          loading={loading}
          page={page}
        />
      </View>
    );
  }

  renderItem = ({ item }) => {
    const { brand, model, color, sku, photo } = item;
    const { state, navigate } = this.props.navigation;

    return (
      <ListItem
        title={model}
        style={{ backgroundColor: '#fff' }}
        titleStyle={{ color: '#000' }}
        onPress={() => {
          navigate('GarmentDetail', item);
        }}
      />
    );
  };
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f3f3f3'
  },
  mainImage: {
    width: Metrics.screenWidth,
    minHeight: 500
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
  }
};

export default Search;
