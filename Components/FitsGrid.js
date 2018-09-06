import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { profiles } from '../data.json';

class FitsGrid extends Component {
  renderFit(item) {
    const { navigate } = this.props.navigation;
    const { profile, description, style, photo, likes, garments } = item;

    return (
      <TouchableOpacity onPress={() => navigate('FitDetail', item)}>
        <View style={styles.gridItem}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter = () => {
    const { loading } = this.props;

    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    return this.props.handleLoadMore();
  };

  render() {
    const { data, numColumns, ListFooterComponent, refreshing } = this.props;

    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => this.renderFit(item)}
        onRefresh={() => this.props.onRefresh()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  gridItem: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image: {
    width: undefined,
    height: 200
  }
};

export default FitsGrid;
