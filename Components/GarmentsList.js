import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrics, AppStyles } from '../Themes';

class GarmentsList extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol, brands } = this.props;
    const { id, color, model, sku, brand, photo } = item;
    const brandName = brands[brand].name;

    return (
      <View style={styles.listItem}>
        <View style={styles.leftCol}>
          <TouchableOpacity onPress={() => navigate('GarmentDetail', item)}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: photo }} />
            </View>
          </TouchableOpacity>

          <View style={styles.description}>
            <Text>{brandName}</Text>
            <Text>{model}</Text>
            <Text>{color}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={AppStyles.sectionSubtitle}
          onPress={() => navigate('GarmentDetail', item)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Explore Item</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { data, numColumns } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={({ item }) => this.renderGarment(item)}
        scrollEnabled={false}
      />
    );
  }
}

const styles = {
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 20,
    marginLeft: 10
  },
  imageContainer: {
    flex: 1,
    width: 120,
    height: 120
  },
  image: {
    height: 120
  },
  description: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20
  },

  leftCol: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#000',
    marginRight: 10
  },
  buttonText: { color: '#fff' }
};

export default GarmentsList;
