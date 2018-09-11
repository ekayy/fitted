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

import SearchFilter from '../Components/SearchFilter';
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
      loading: false,
      refreshing: false,
      limit: 9999,
      showFilters: false,
      brand: ''
    };
  }

  componentDidMount() {
    this.handleRefresh();
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
      console.tron.log(error);
    }
  };

  handleChange = searchTerm => {
    const searchedResults = this.state.garments.filter(result => {
      return searchTerm
        ? result.model.toLowerCase().includes(searchTerm)
        : this.state.garments;
    });

    const filteredResults = this.state.brand
      ? searchedResults.filter(result => {
          return result.brand === this.state.brand;
        })
      : searchedResults;

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true, results: [] }, async () => {
      await this.fetchGarments(this.state.limit);

      this.setState({
        refreshing: false,
        results: [...this.state.garments.slice(0, 10)],
        remainingResults: [...this.state.garments.slice(10)]
      });
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

  // Search filters
  applyFilters = brandId => {
    const { searchTerm } = this.state;

    this.setState({
      results: [],
      brand: brandId
    });

    const searchedResults = this.state.garments.filter(result => {
      return searchTerm
        ? result.model.toLowerCase().includes(searchTerm)
        : this.state.garments;
    });

    const filteredResults = searchedResults.filter(result => {
      return result.brand === brandId;
    });

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  // Toggle search filters overlay
  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  render() {
    const {
      searchTerm,
      results,
      loading,
      refreshing,
      showFilters
    } = this.state;

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

        <View>
          <TouchableOpacity style={styles.filter} onPress={this.toggleFilters}>
            <View>
              <Text style={styles.filterText}>Filters</Text>
            </View>
          </TouchableOpacity>

          <SearchFilter
            navigation={this.props.navigation}
            showFilters={showFilters}
            onClose={this.toggleFilters}
            applyFilters={this.applyFilters}
          />

          <GarmentsGrid
            data={results}
            navigation={this.props.navigation}
            numCol={2}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
          />
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => {
    const { brand, model, color, sku, photo } = item;
    const { state, navigate } = this.props.navigation;

    return (
      <ListItem
        title={model}
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

  filter: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,0,0, 0.8)',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 10
  },
  filterText: {
    color: '#fff'
  }
};

export default Search;
