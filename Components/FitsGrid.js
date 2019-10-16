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
    const {
      profile,
      description,
      style,
      photo,
      likes,
      garments,
      height,
      weight
    } = item;
    const { numCol } = this.props;

    const feetFromInches = Math.floor(height / 12);
    const inchesRemainder = height % 12;
    const imperialHeight = `${feetFromInches}' ${inchesRemainder}"`;

    return numCol == 2 ? (
      <TouchableOpacity onPress={() => navigate('FitDetail', item)}>
        <View style={[styles.gridItem, { width: Metrics.screenWidth / 2 }]}>
          <Image style={styles.image} source={{ uri: photo }} />
          <View style={styles.label}>
            <Text style={styles.labelText}>
              H: {imperialHeight} &#11825; W: {weight} lbs &#11825; Size M
            </Text>
          </View>
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
    height: 250,
    backgroundColor: '#333'
  },
  image: {
    width: undefined,
    height: '100%'
  },

  label: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  labelText: {
    color: '#fff',
    fontSize: 11
  }
};

export default FitsGrid;
