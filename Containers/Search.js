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
      error: null,
      loading: true,
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
    const filteredResult = this.state.garments.filter(result => {
      return result.model.toLowerCase().includes(searchTerm);
    });

    this.setState({
      searchTerm,
      results: filteredResult
    });

    // this.fetchGarments();
  };

  // do nothing because the entire page is loaded
  handleLoadMore = () => {
      true;
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          placeholder="Search"
          onChangeText={this.handleChange}
          autoCapitalize="none"
          platform="ios"
          value={this.state.searchTerm}
        />

      <GarmentsGrid
        data={this.state.results}
        navigation={this.props.navigation}
        numCol={2}
        handleLoadMore={this.handleLoadMore}
        refreshing={this.state.loading}
        loading={this.state.loading}
        page={this.state.page}
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
    paddingHorizontal: 5
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
