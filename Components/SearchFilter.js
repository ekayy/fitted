import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const brands = [
  {
    name: '3sixteen',
    id: 1
  },
  {
    name: 'Carhatt WIP',
    id: 2
  },
  {
    name: 'Fear of God',
    id: 3
  },
  {
    name: 'John Elliot',
    id: 4
  },
  {
    name: 'Reigning Champ',
    id: 5
  }
];

class SearchFilter extends Component {
  selectBrand(brandId) {
    this.props.onClose();
    this.props.applyFilters(brandId);
  }

  renderBrands() {
    return brands.map(brand => {
      const { navigate } = this.props.navigation;
      const { id, name } = brand;

      return (
        <TouchableOpacity key={name} onPress={this.selectBrand.bind(this, id)}>
          <View style={styles.gridItem}>
            <Text>{name}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    if (!this.props.showFilters) {
      return null;
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.showFilters}
        style={styles.modal}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text>Filters</Text>
            <TouchableOpacity onPress={this.props.onClose}>
              <View>
                <Text>X</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text>Brands</Text>
            {this.renderBrands()}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 40
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1
  }
};

export default SearchFilter;
