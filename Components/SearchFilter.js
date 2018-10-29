import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { ListItem, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const brands = [
  {
    name: "3sixteen",
    id: 1
  },
  {
    name: "Carhatt WIP",
    id: 2
  },
  {
    name: "Fear of God",
    id: 3
  },
  {
    name: "John Elliot",
    id: 4
  },
  {
    name: "Reigning Champ",
    id: 5
  }
];

const colors = ["red", "orange", "yellow", "green", "blue", "violet"];

class SearchFilter extends Component {
  state = {
    checked: {}
  };

  selectColor(color) {
    // this.props.onClose();
    // this.props.applyFilters(color);
  }

  selectBrand(brand) {
    // this.props.onClose();
    this.setState({
      checked: { [brand.id]: !this.state.checked[brand.id] }
    });

    if (!this.state.checked[brand.id]) {
      this.props.applyFilters(brand);
    } else {
      this.props.applyFilters("");
    }
  }

  renderColors() {
    return colors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          onPress={this.selectColor.bind(this, color)}
          style={styles.filterItem}
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
      <View key={brand.name}>
        <ListItem
          style={styles.filterItem}
          title={
            <CheckBox
              title={brand.name}
              onPress={this.selectBrand.bind(this, brand)}
              checked={this.state.checked[brand.id]}
              containerStyle={{ margin: 0 }}
            />
          }
        />
      </View>
    ));
  }

  clearFilters() {
    this.setState({
      checked: {}
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
            <Text style={styles.modalHeaderText}>Filters</Text>
          </View>

          <View style={styles.modalContent}>
            {/*<View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Colors</Text>
              {this.renderColors()}
            </View>*/}

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Brands</Text>
              {this.renderBrands()}
            </View>
          </View>

          <TouchableOpacity style={styles.close} onPress={this.props.onClose}>
            <View>
              <Ionicons name="ios-close" size={40} color="#000" />
            </View>
          </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  modalHeaderText: {
    fontSize: 18
  },
  modalContent: {
    flex: 1
  },

  filterSection: {
    marginBottom: 40
  },
  filterTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center"
  },
  filterItem: {
    margin: 0
  },

  close: {
    position: "absolute",
    right: 30,
    top: 30
  }
};

export default SearchFilter;
