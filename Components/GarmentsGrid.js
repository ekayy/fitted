import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Metrics, Dimensions } from '../Themes';

import { profiles } from '../data.json';

class GarmentsGrid extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol, grid, editingCloset, unfavoriteGarment } = this.props;
    const { id, color, model, sku, brand, photo } = item;

    let formattedModel = model
      .split(' ')
      .map(word => word.charAt(0) + word.toLowerCase().slice(1))
      .join(' ');

    // if not valid photo, add a stock image
    if (photo.length > 10) {
      photoUrl = photo;
    } else {
      photoUrl =
        'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';
    }

    return numCol == 2 ? (
      <TouchableOpacity
        style={styles.gridItem}
        key={id}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: photoUrl }} />
          {editingCloset && (
            <Badge
              value="X"
              status="error"
              containerStyle={{ top: 0, right: 0, position: 'absolute' }}
              onPress={() => this.props.unfavoriteGarment(id)}
            />
          )}
        </View>
        <Text style={styles.text}>{formattedModel}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.gridItem}
        key={id}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View
          style={[styles.imageContainer, { width: Metrics.screenWidth / 3 }]}
        >
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader = () => {
    let header_View = (
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>- team fitted</Text>
        </View>
      </View>
    );

    return header_View;
  };

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
    const {
      style,
      data,
      numColumns,
      ListFooterComponent,
      refreshing
    } = this.props;

    return (
      <FlatList
        style={style}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => this.renderGarment(item)}
        onRefresh={() => this.props.onRefresh()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = {
  gridItem: {
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 20
  },
  welcomeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0.8)',
    height: 160
  },
  welcomeText: {
    paddingTop: 32
  },
  welcomeTitle: {
    textAlign: 'center',
    fontSize: 32,
    color: 'rgb(255,255,255)'
  },
  welcomeSubtitle: {
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 17,
    color: 'rgb(255,255,255)'
  },
  imageContainer: {
    flex: 1,
    width: 136,
    height: 136,
    position: 'relative'
  },
  image: {
    width: undefined,
    height: 136
  },
  text: {
    maxWidth: '80%',
    textAlign: 'center'
  }
};

export default GarmentsGrid;
