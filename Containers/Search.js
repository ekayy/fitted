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

import { baseURL } from '../Config';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garments: [],
      error: null,
      loading: true,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchGarments(this.state.page);
  }

  fetchGarments = async page => {
    const response = await axios.get(`${baseURL}/garments/?page=${page}`);

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

  handleChange = text => {
    // this.fetchGarments();
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          showLoading
          placeholder="Search"
          onChangeText={this.handleChange}
          autoCapitalize="none"
        />

        <FlatList
          data={this.state.garments}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
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
