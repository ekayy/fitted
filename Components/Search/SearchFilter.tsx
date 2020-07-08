import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import CheckBox from '../Forms/Checkbox';
import { ListItem, Divider } from 'react-native-elements';
import SectionTitle from './SectionTitle';
import { Brand } from '../../types';

interface Props {
  brands: Brand[];
  showFilters: boolean;
  filteredBrands: number[];
  selectFilter(id: Brand): void;
  applyFilters(): void;
  clearFilters(): void;
}

const SearchFilter: React.FC<Props> = (props) => {
  const { brands, showFilters, clearFilters, selectFilter, applyFilters, filteredBrands } = props;

  const renderItems = (items) => {
    return items.map((item) => (
      <View key={item.name}>
        <ListItem
          title={
            <CheckBox
              title={item.name}
              checked={filteredBrands.includes(item.id)}
              handlePress={() => selectFilter(item)}
            />
          }
          containerStyle={styles.listItemContainer}
        />
        <Divider />
      </View>
    ));
  };

  if (!showFilters) {
    return null;
  }

  return (
    <StyledModal animationType="slide" transparent={false} visible={showFilters}>
      <StyledHeader>
        <StyledHeaderScroll>
          <StyledHeaderContainer>
            <CancelButton onPress={clearFilters}>Clear</CancelButton>
            <SearchButton onPress={applyFilters}>Done</SearchButton>
          </StyledHeaderContainer>

          <View>
            {/* <SectionTitle text="category" />
            <Divider />
            {renderItems(categories)} */}
            <SectionTitle text="brands" />
            <Divider />
            {renderItems(brands)}
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
    paddingRight: 20,
  },
};

// const categories = [
//   {
//     name: 'Tops',
//     id: 20,
//   },
//   {
//     name: 'Bottoms',
//     id: 21,
//   },
//   {
//     name: 'Shoes',
//     id: 22,
//   },
//   {
//     name: 'Other',
//     id: 23,
//   },
// ];

export default SearchFilter;
