import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Badge } from 'react-native-elements';
import { Metrics, Dimensions } from '../Themes';

import { profiles } from '../data.json';

class GarmentsGrid extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol, grid, editingCloset, unfavoriteGarment } = this.props;
    const { id, color, model, sku, brand, brand_name: brandName, photo } = item;

    let formattedModel = model
      .split(' ')
      .map((word) => word.charAt(0) + word.toLowerCase().slice(1))
      .join(' ');

    // if not valid photo, add a stock image
    if (photo.length > 10) {
      photoUrl = photo;
    } else {
      photoUrl = 'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';
    }

    return numCol == 2 ? (
      <TouchableOpacity key={id} onPress={() => navigate('Garment Detail', item)}>
        <View style={[styles.gridItem, { width: Metrics.screenWidth / 2 }]}>
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
        <Text style={styles.text}>{brandName}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity key={id} onPress={() => navigate('Garment Detail', item)}>
        <View style={[styles.gridItem, { width: Metrics.screenWidth / 3 }]}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
    );
  }

  // renderHeader = () => {
  //   let header_View = (
  //     <View style={styles.welcomeContainer}>
  //       <View style={styles.welcomeText}>
  //         <Text style={styles.welcomeTitle}>Welcome!</Text>
  //         <Text style={styles.welcomeSubtitle}>- team fitted</Text>
  //       </View>
  //     </View>
  //   );

  //   return header_View;
  // };

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
    const { style, data, numCol, ListFooterComponent, refreshing } = this.props;

    return (
      <FlatList
        style={style}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numCol}
        renderItem={({ item }) => this.renderGarment(item)}
        onRefresh={() => this.props.onRefresh()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = {
  gridItem: {
    flex: 1,
    height: 160,
  },
  image: {
    width: undefined,
    height: '100%',
  },
  text: {
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
};

export default GarmentsGrid;
