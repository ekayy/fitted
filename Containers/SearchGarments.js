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
import { tagGarmentToFit, removeGarmentFromFit } from '../Redux/FitsRedux';
import { AppStyles } from '../Themes';
import styles from './Styles/TagGarmentsStyles';

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

  tagToFit = item => {
    const { goBack } = this.props.navigation;
    const { id, photo } = item;
    const { taggedGarments } = this.props.fits;

    // check if garment id already tagged to a fit
    if (!taggedGarments.filter(garment => garment.id === id).length) {
      this.props.tagGarmentToFit(item);
      this.props.navigation.navigate('TagGarments');
    } else {
      // display an error message to user
      goBack();
    }
  };

  render() {
    const { searchTerm, results, loading, refreshing } = this.state;

    return (
      <View style={AppStyles.container}>
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
      <View style={styles.section}>
        <View style={styles.formRow}>
          <View style={styles.product}>
            <View style={styles.productImage}>
              <Image
                source={{ uri: photo }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={styles.productAttributes}>
              <Text>
                {brandName}
                {'\n'}
                {model}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={AppStyles.sectionSubtitle}
            onPress={() => this.tagToFit(item)}
          >
            <Text style={{ marginRight: 10 }}>Tag to fit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    garments: state.garments.items,
    fits: state.fits
  };
};

export default connect(
  mapStateToProps,
  { fetchGarments, tagGarmentToFit, removeGarmentFromFit }
)(SearchGarments);
