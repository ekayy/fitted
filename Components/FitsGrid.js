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
import { Metrics } from '../Themes';

class FitsGrid extends Component {
  renderFit(item) {
    const { navigate } = this.props.navigation;
    const { profile, description, style, photo, likes, garments } = item;
    const { numCol } = this.props;

    return numCol == 2 ? (
      <TouchableOpacity onPress={() => navigate('FitDetail', item)}>
        <View style={[styles.gridItem, { width: Metrics.screenWidth / 2 }]}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => navigate('FitDetail', item)}>
        <View style={[styles.gridItem, { width: Metrics.screenWidth / 3 }]}>
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
    const { style, data, numCol, refreshing } = this.props;

    return (
      <FlatList
        style={style}
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
    // width: Dimensions.get('window').width / 2,
    height: 200,
    backgroundColor: '#333'
  },
  image: {
    width: undefined,
    height: 200
  }
};

export default FitsGrid;
