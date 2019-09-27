import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SectionTitle from '../Search/SectionTitle';

class SearchFilter extends Component {
  state = {
    checked: {}
  };

  selectBrand(brand) {
    // this.props.onClose();
    this.setState({
      checked: { [brand.id]: !this.state.checked[brand.id] }
    });

    if (!this.state.checked[brand.id]) {
      this.props.applyFilters(brand);
    } else {
      this.props.applyFilters('');
    }
  }

  selectCategory(category) {
    // this.props.onClose();
    this.setState({
      checked: { [category.id]: !this.state.checked[category.id] }
    });

    if (!this.state.checked[category.id]) {
      this.props.applyFilters(category);
    } else {
      this.props.applyFilters('');
    }
  }

  renderCategories() {
    return categories.map(category => (
      <View key={category.name}>
        <ListItem
          title={
            <CheckBox
              right
              iconRight
              title={category.name}
              onPress={this.selectCategory.bind(this, category)}
              checked={this.state.checked[category.id]}
            />
          }
        />
        <Divider />
      </View>
    ));
  }

  renderBrands() {
    return brands.map(brand => (
      <View key={brand.name}>
        <ListItem
          title={
            <CheckBox
              right
              iconRight
              title={brand.name}
              onPress={this.selectBrand.bind(this, brand)}
              checked={this.state.checked[brand.id]}
            />
          }
        />
        <Divider />
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
      <StyledModal
        animationType="slide"
        transparent={false}
        visible={this.props.showFilters}
      >
        <StyledHeader>
          <StyledHeaderScroll>
            <StyledHeaderContainer>
              <CancelButton onPress={this.props.onClose}>Cancel</CancelButton>
              <SearchButton>Search</SearchButton>
            </StyledHeaderContainer>

            <View>
              <SectionTitle text="category" />
              <Divider />
              {this.renderCategories()}
              <SectionTitle text="brands" />
              <Divider />
              {this.renderBrands()}
            </View>
          </StyledHeaderScroll>
        </StyledHeader>
      </StyledModal>
    );
  }
}

const StyledModal = styled.Modal`
  flex: 1;
  padding: 40px;
`;

const StyledHeader = styled.View`
  flex: 1;
  padding: 40px 0;
`;

const StyledHeaderScroll = styled.ScrollView`
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  background-color: #000;
  height: 6%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CancelButton = styled.Text`
  text-transform: uppercase;
  color: #fff;
  padding: 10px;
`;

const SearchButton = styled.Text`
  text-transform: uppercase;
  color: #fff;
  padding: 10px;
`;

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

const categories = [
  {
    name: 'Tops',
    id: 1
  },
  {
    name: 'Bottoms',
    id: 2
  },
  {
    name: 'Shoes',
    id: 3
  },
  {
    name: 'Other',
    id: 4
  }
];

export default SearchFilter;
