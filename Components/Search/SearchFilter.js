import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SectionTitle from '../Search/SectionTitle';

const SearchFilter = forwardRef((props, ref) => {
  const [checked, setChecked] = useState({});

  const { brands } = props;

  function selectItem(item) {
    setChecked({ [item.id]: !checked[item.id] });

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
              onPress={() => selectItem(item)}
              uncheckedIcon={<Ionicons name="ios-radio-button-off" size={25} />}
              checkedIcon={
                <Ionicons name="ios-checkmark-circle-outline" size={25} />
              }
              containerStyle={styles.checkboxContainer}
              wrapperStyle={styles.checkboxContent}
              textStyle={styles.checkBoxText}
              checkedColor="rgb(74, 144, 226)"
              checked={checked[item.id]}
            />
          }
          containerStyle={styles.listItemContainer}
        />
        <Divider />
      </View>
    ));
  }

  if (!props.showFilters) {
    return null;
  }

  function clearFilters() {
    setChecked({});
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
            <SearchButton onPress={props.onClose}>Search</SearchButton>
          </StyledHeaderContainer>

          <View>
            <SectionTitle text="category" />
            <Divider />
            {renderItems(categories)}
            <SectionTitle text="brands" />
            <Divider />
            {renderItems(brands.map(brand => brand))}
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
  background-color: #fff;
  border-bottom-width: 0.2px;
  height: 10%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const CancelButton = styled.Text`
  text-transform: uppercase;
  color: #000;
  padding: 10px;
`;

const SearchButton = styled.Text`
  text-transform: uppercase;
  color: #000;
  padding: 10px;
`;

const styles = {
  checkboxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    padding: 0
  },
  checkboxContent: {
    marginLeft: 10,
    marginRight: 20
  },
  checkBoxText: {
    flex: 1
  },
  listItemContainer: {
    padding: 0
  }
};

const categories = [
  {
    name: 'Tops',
    id: 20
  },
  {
    name: 'Bottoms',
    id: 21
  },
  {
    name: 'Shoes',
    id: 22
  },
  {
    name: 'Other',
    id: 23
  }
];

export default SearchFilter;
