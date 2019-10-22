import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import CheckBox from '../Forms/Checkbox';
import { ListItem, Divider } from 'react-native-elements';
import SectionTitle from '../Search/SectionTitle';

const SearchFilter = props => {
  const [checked, setChecked] = useState([]);

  const selectItem = item => {
    checked.includes(item.id)
      ? setChecked(checked.filter(id => id !== item.id))
      : setChecked([...checked, item.id]);
  };

  const renderItems = items => {
    return items.map(item => (
      <View key={item.name}>
        <ListItem
          title={
            <CheckBox
              key={item.name}
              title={item.name}
              checked={checked.includes(item.id)}
              handlePress={() => selectItem(item)}
            />
          }
          containerStyle={styles.listItemContainer}
        />
        <Divider />
      </View>
    ));
  };

  const onSearch = () => {
    props.applyFilters(checked);
    props.onClose();
  };

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
            <SearchButton onPress={onSearch}>Search</SearchButton>
          </StyledHeaderContainer>

          <View>
            <SectionTitle text="category" />
            <Divider />
            {renderItems(categories)}
            <SectionTitle text="brands" />
            <Divider />
            {renderItems(props.brands)}
          </View>
        </StyledHeaderScroll>
      </StyledHeader>
    </StyledModal>
  );
};

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
  listItemContainer: {
    padding: 0,
    paddingRight: 20
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
