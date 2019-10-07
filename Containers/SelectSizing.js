import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Button,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';

class SelectSizing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryIndex: 0,
      selectedGenderIndex: 0,
      selectedSizeIndex: 0,
      modalVisible: false
    };
  }

  setModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  updateCountryIndex = selectedCountryIndex => {
    this.setState({ selectedCountryIndex });
  };

  updateGenderIndex = selectedGenderIndex => {
    this.setState({ selectedGenderIndex });
  };

  updateSizeIndex = selectedSizeIndex => {
    this.setState({ selectedSizeIndex });
  };

  componentDidMount() {}

  tagFit() {}

  render() {
    const {
      id,
      color,
      model,
      sku,
      brand,
      photo
    } = this.props.navigation.state.params;

    const brandName = this.props.brands[brand].name;

    const countryButtons = ['US', 'UK', 'Euro'];
    const genderButtons = ['Men', 'Women', 'Youth', 'Unisex'];
    const sizeButtons = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12'
    ];
    const {
      selectedCountryIndex,
      selectedGenderIndex,
      selectedSizeIndex
    } = this.state;

    return (
      <View style={styles.container}>
        <Text>Brand: {brandName}</Text>
        <Text>Model: {model}</Text>
        <Text>Color: {color}</Text>

        <Text>Size</Text>
        <TouchableOpacity>
          <Text>Select / Change Selection</Text>
        </TouchableOpacity>

        <ButtonGroup
          onPress={this.setModalVisible}
          selectedIndex={0}
          buttons={['9']}
          containerStyle={{ height: 40 }}
        />
        <ButtonGroup
          onPress={this.updateCountryIndex}
          selectedIndex={selectedCountryIndex}
          buttons={countryButtons}
          containerStyle={{ height: 40 }}
        />
        <ButtonGroup
          onPress={this.updateGenderIndex}
          selectedIndex={selectedGenderIndex}
          buttons={genderButtons}
          containerStyle={{ height: 40 }}
        />

        <Text>
          To help you out, tagged items will be automatically added to your
          wardrobe.
        </Text>

        <Button title="Tag to Fit!" onPress={this.tagFit} />

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={styles.modal}>
            <ButtonGroup
              onPress={this.updateSizeIndex}
              selectedIndex={selectedSizeIndex}
              buttons={sizeButtons}
              containerStyle={{ height: 40 }}
            />

            <TouchableHighlight
              onPress={this.setModalVisible}
              style={styles.close}
            >
              <Ionicons
                name="ios-close"
                size={50}
                color="#000"
                style={styles.close}
              />
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: '#f3f3f3',
    alignItems: 'center'
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'transparent'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 25,
    backgroundColor: '#f3f3f3'
  }
};

const mapStateToProps = state => {
  return {
    garments: state.garments.items,
    brands: state.brands.items
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGarments,
    fetchBrands
  }
)(SelectSizing);
