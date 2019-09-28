import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SectionTitle from '../Search/SectionTitle';

const SearchFilter = forwardRef((props, ref) => {
  const [checked, setChecked] = useState({});

  function selectItem(item) {
    setChecked({ [item.id]: !state.checked[item.id] });

    if (checked) {
      props.applyFilters(item);
    } else {
      props.applyFilters('');
    }
  }

  function renderItems(items) {
    return items.map(item => (
      <View key={item.name}>
        <ListItem
          title={
            <CheckBox
              right
              iconRight
              title={item.name}
              onPress={selectItem.bind(this, item)}
              checked={checked[item.id]}
            />
          }
        />
        <Divider />
      </View>
    ));
  }

  if (!props.showFilters) {
    return null;
  }

  return (
    <StyledModal
      animationType="slide"
      transparent={false}
      visible={props.showFilters}
    >
      <StyledHeader>
        <StyledHeaderScroll>
          <StyledHeaderContainer>
            <CancelButton onPress={props.onClose}>Cancel</CancelButton>
            <SearchButton>Search</SearchButton>
          </StyledHeaderContainer>

          <View>
            <SectionTitle text="category" />
            <Divider />
            {renderItems(categories)}
            <SectionTitle text="brands" />
            <Divider />
            {renderItems(brands)}
          </View>
        </StyledHeaderScroll>
      </StyledHeader>
    </StyledModal>
  );
});

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
