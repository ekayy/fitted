import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';

import { brands } from '../data.json';

class SearchGarments extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Searching Database',
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('addCustomGarment')}
          style={{
            marginRight: 20
          }}
        >
          <Ionicons name="ios-add" size={40} color="#000" />
        </TouchableOpacity>
      )
    };
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
      refreshing: false
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.garments !== prevProps.garments) {
      this.props.fetchGarments();
    }
  }

  componentDidMount() {
    const { garments } = this.props;

    this.props.navigation.setParams({
      addCustomGarment: this._addCustomGarment
    });

    this.setState(
      {
        refreshing: true,
        results: []
      },
      async () => {
        // Get garments from redux store
        // await this.props.fetchGarments();
        this.setState({ garments }, () => {
          this.setState({
            refreshing: false,
            results: [...this.state.garments.slice(0, 10)],
            remainingResults: [...this.state.garments.slice(10)]
          });
        });
      }
    );
  }

  _addCustomGarment = () => {
    this.props.navigation.navigate('AddCustomGarment');
  };

  handleChange = searchTerm => {
    const searchedResults = this.state.garments.filter(result => {
      return searchTerm
        ? result.model.toLowerCase().includes(searchTerm)
        : this.state.garments;
    });

    let slicedResults = searchedResults.slice(0, 10);
    let remainingResults = searchedResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  handleRefresh = () => {
    // this.setState({ refreshing: true, results: [] }, async () => {
    //   await this.fetchGarments(this.state.limit);
    //
    //   this.setState({
    //     refreshing: false,
    //     results: [...this.state.garments.slice(0, 10)],
    //     remainingResults: [...this.state.garments.slice(10)]
    //   });
    // });
  };

  // do nothing because the entire page is loaded
  handleLoadMore = () => {
    const { remainingResults, results } = this.state;

    this.setState({ loading: true });

    this.setState({
      remainingResults: remainingResults.slice(10),
      results: [...results, ...remainingResults.slice(0, 10)],
      loading: false
    });
  };

  render() {
    const { searchTerm, results, loading, refreshing } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          round="round"
          lightTheme="lightTheme"
          placeholder="Search"
          onChangeText={this.handleChange}
          autoCapitalize="none"
          platform="ios"
          value={searchTerm}
        />

        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={this.renderGarment}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      </View>
    );
  }

  renderGarment = ({ item }) => {
    const { navigate } = this.props.navigation;
    const { id, color, model, sku, brand, photo } = item;

    const brandName = brands[brand].name;

    return (
      <View>
        <TouchableOpacity
          onPress={() => navigate('SelectSizing', item)}
          style={styles.listItem}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: photo }} />
          </View>
          <View style={styles.description}>
            <Text>{brandName}</Text>
            <Text>{model}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f3f3f3'
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1,
    width: 160,
    height: 150
  },
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: 20
  },
  description: {
    flex: 1,
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return {
    garments: state.garments.items
  };
};

export default connect(
  mapStateToProps,
  { fetchGarments }
)(SearchGarments);
