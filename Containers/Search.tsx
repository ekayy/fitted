import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import { SearchBar, Badge } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { favoriteGarment } from '../Redux/UserRedux';
import { searchGarments, setBrandFilter, clearSearchFilters, x } from '../Redux/SearchRedux';
import SearchFilter from '../Components/Search/SearchFilter';
import SearchList from '../Components/SearchList';
import Dropdown from '../Components/Dropdown';
import Home from '../Components/Home';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchProps, useTypedSelector, Brand, Sort } from '../types';

const sortOptions: string[] = [Sort.RECENT, Sort.POPULAR];

const Search: React.FC<SearchProps> = ({ route, navigation }) => {
  const { loading, items: searchResults, brandIds } = useTypedSelector((state) => state.search);
  const { items: garments } = useTypedSelector((state) => state.garments);
  const { items: brands } = useTypedSelector((state) => state.brands);
  const user = useTypedSelector((state) => state.user);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<string>(Sort.SELECT);
  const [brandTable, setBrandTable] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [offset, setOffset] = useState<number>(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
    createBrandTable();
  }, []);
  useEffect(() => {
    // for pull up to load
    setRefreshing(false);
  }, [searchResults]);
  useEffect(() => {
    performSearch();
  }, [activeSort]);
  useEffect(() => {
    // "simple debounce"
    if (searchTerm.length < 3) return;
    const timeout = setTimeout(() => performSearch(), 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  //  sort all garments into their respective brand
  const createBrandTable = () => {
    const brandTable = [];

    brands.forEach((brand) => {
      brandTable[brand.name] = [];
    });
    garments.forEach((garment) => {
      brandTable[garment.brand_name].push(garment);
    });

    setBrandTable(brandTable);
  };

  const performSearch = () => {
    activeSort === Sort.RECENT
      ? dispatch(searchGarments({ searchTerm, brandIds, sortBy: '-created_date' }))
      : dispatch(searchGarments({ searchTerm, brandIds, sortBy: '-favorited_by' }));
  };

  // Sorting
  const handleSort = (index: string, option: string) => {
    // change dropdown text
    setActiveSort(option);
  };

  // handle search query
  const handleChange = (text) => {
    setSearchTerm(text);
  };

  // pull to refresh
  const handleRefresh = () => {
    setRefreshing(true);
    performSearch();
  };

  //   // do nothing because the entire page is loaded
  const handleLoadMore = () => {
    // setOffset(offset + 10);
  };

  // check or uncheck filters
  const selectFilter = ({ id }: Brand) => {
    dispatch(setBrandFilter(id));
  };

  // clear all checked filters
  const clearFilters = () => {
    dispatch(clearSearchFilters());
  };

  // perform search based on brand id
  const applyFilters = () => {
    setShowFilters(false);
    performSearch();
  };

  // Toggle search filters overlay
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <StyledContainer>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        cancelButtonProps={{ color: '#000' }}
        round
        lightTheme
        placeholder="Search"
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCompleteType="off"
        platform="ios"
        value={searchTerm}
        blurOnSubmit={false}
      />
      {searchTerm ? (
        <StyledFilterBarContainer>
          <StyledFilterBar>
            <Dropdown
              options={sortOptions}
              defaultValue={Sort.SELECT}
              onSelect={handleSort}
              value={activeSort}
            />
          </StyledFilterBar>

          <VerticalDivider />

          <StyledFilterBar>
            <StyledFilterButton onPress={toggleFilters}>
              <StyledFilterText>FILTER</StyledFilterText>
              {brandIds.length > 0 && (
                <Badge status="error" value={brandIds.length} containerStyle={styles.badgeStyle} />
              )}
            </StyledFilterButton>
          </StyledFilterBar>
        </StyledFilterBarContainer>
      ) : null}

      <SearchFilter
        navigation={navigation}
        showFilters={showFilters}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        selectFilter={selectFilter}
        filteredBrands={brandIds}
        brands={brands}
      />

      {searchTerm ? (
        <SearchList
          data={searchResults}
          navigation={navigation}
          handleLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          loading={loading}
          brands={brands}
          user={user}
          favoriteGarment={favoriteGarment}
        />
      ) : Object.keys(brandTable).length > 0 ? (
        <Home brandTable={brandTable} brands={brands} navigation={navigation} />
      ) : (
        <View>
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
        </View>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;
const StyledFilterBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;
const StyledFilterBar = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledFilterButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;
const StyledFilterText = styled.Text`
  text-align: center;
`;
const VerticalDivider = styled.View`
  border-left-width: 1;
  align-self: stretch;
`;

const styles = {
  searchBarContainer: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  inputContainer: { backgroundColor: 'rgb(255,255,255)' },
  input: { backgroundColor: 'rgb(255,255,255)' },
  badgeStyle: { position: 'absolute', top: 0, right: -20 },
};

export default Search;
