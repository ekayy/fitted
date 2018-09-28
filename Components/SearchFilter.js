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

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

class SearchFilter extends Component {
  selectColor(color) {
    this.props.onClose();
    // this.props.applyFilters(color);
  }

  selectBrand(brand) {
    this.props.onClose();
    this.props.applyFilters(brand);
  }

  renderColors() {
    return colors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          onPress={this.selectColor.bind(this, color)}
        >
          <View style={styles.gridItem}>
            <Text>{color}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  renderBrands() {
    return brands.map(brand => (
      <TouchableOpacity
        key={brand.name}
        onPress={this.selectBrand.bind(this, brand)}
      >
        <View style={styles.gridItem}>
          <Text>{brand.name}</Text>
        </View>
      </TouchableOpacity>
    ));
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
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Colors</Text>
              {this.renderColors()}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Brands</Text>
              {this.renderBrands()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    flex: 1,
    padding: 40
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1
  },

  filterSection: {
    marginBottom: 20
  },
  filterTitle: {
    fontWeight: 'bold'
  }
};

export default SearchFilter;
