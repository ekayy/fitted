import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Metrics } from '../Themes';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class BrandGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false,
      currentBrand: ''
    };
  }

  setSeeAllBrand(brand) {
    this.setState({
      showAll: true,
      currentBrand: brand
    });
  }

  renderBrand(item) {
    const { garments, style, refreshing } = this.props;
    return (
      <View style={styles.brandContainer}>
        <View style={styles.brandheader}>
          <Text style={styles.brandLabel}>{item.name.toUpperCase()}</Text>
          <TouchableOpacity
            onPress={() => this.setSeeAllBrand(item.name)}
            style={styles.seeAll}
          >
            <Text>See All</Text>
            <Ionicons
              name="md-arrow-dropright"
              size={30}
              color="rgb(74,74,74)"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={style}
          data={garments.slice(0, 9)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({ item }) => this.renderGarment(item)}
          onRefresh={() => this.props.onRefresh()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }

  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { editingCloset, unfavoriteGarment } = this.props;
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

    return (
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
              onPress={() => unfavoriteGarment(id)}
            />
          )}
        </View>
        <Text style={styles.text}>{formattedModel}</Text>
        <TouchableOpacity style={styles.bookmarkContainer}>
          <Text style={{ color: 'rgb(74, 144, 226)' }}>Bookmark for later</Text>
          <MaterialCommunityIcons
            name={'bookmark-outline'}
            size={16}
            color="rgb(74, 144, 226)"
          />
        </TouchableOpacity>
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
    const { style, garments, brands, refreshing } = this.props;
    const { showAll } = this.state;

    return (
      <View>
        {showAll ? (
          <Text>{this.state.currentBrand}</Text>
        ) : (
          <FlatList
            style={style}
            data={brands}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item }) => this.renderBrand(item)}
            onRefresh={() => this.props.onRefresh()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            refreshing={refreshing}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </View>
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
  brandheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 8
  },
  brandLabel: {
    fontSize: 18,
    fontWeight: '500'
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'rgb(74,74,74)'
  },
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
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

export default BrandGrid;
