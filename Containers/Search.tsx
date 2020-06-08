import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import { SearchBar, Badge } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { favoriteGarment } from '../Redux/UserRedux';
import SearchFilter from '../Components/Search/SearchFilter';
import SearchList from '../Components/SearchList';
import Dropdown from '../Components/Dropdown';
import Home from '../Components/Home';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchProps, useTypedSelector, Garment } from '../types';

const Search: React.FC<SearchProps> = ({ route, navigation }) => {
  const { items: garments } = useTypedSelector((state) => state.garments);
  const { items: brands } = useTypedSelector((state) => state.brands);
  const user = useTypedSelector((state) => state.user);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [brandTable, setBrandTable] = useState<any[]>([]);
  const [brandIds, setBrandIds] = useState<number[]>([]);
  const [searchedGarments, setSearchedGarments] = useState<Garment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Garment[]>([]);
  const [remainingResults, setRemainingResults] = useState<Garment[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setRefreshing(true);
    dispatch(fetchBrands());
    createBrandTable();
  }, []);
  useEffect(() => {
    setRefreshing(true);
    dispatch(fetchGarments());
    setSearchedGarments(garments);
  }, []);
  useEffect(() => {
    setRefreshing(false);
    setSearchResults([...searchedGarments.slice(0, 10)]);
    setRemainingResults([...searchedGarments.slice(10)]);
  }, [garments]);

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

  const handleChange = (searchTerm) => {
    const searchedResults = searchedGarments.filter((result) =>
      searchTerm ? result.model.toLowerCase().includes(searchTerm) : searchedGarments,
    );

    const filteredResults = brandIds.length
      ? searchedResults.filter((result) => brandIds.includes(result.brand))
      : searchedResults;

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    setSearchTerm(searchTerm);
    setRemainingResults(remainingResults);
    setSearchResults(slicedResults);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchResults([]);
    dispatch(fetchGarments());
  };

  //   // do nothing because the entire page is loaded
  const handleLoadMore = () => {
    setLoading(true);
    setRemainingResults(remainingResults.slice(10));
    setSearchResults([...searchResults, ...remainingResults.slice(0, 10)]);
    setLoading(false);
  };

  // Search filters: e.g. [1,3,5]
  const applyFilters = (brandIds) => {
    setSearchResults([]);
    setBrandIds(brandIds);

    const searchedResults = searchedGarments.filter((result) =>
      searchTerm ? result.model.toLowerCase().includes(searchTerm) : searchedGarments,
    );

    const filteredResults = searchedResults.filter((result) => brandIds.includes(result.brand));

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    setSearchTerm(searchTerm);
    setRemainingResults(remainingResults);
    setSearchResults(slicedResults);
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
        platform="ios"
        value={searchTerm}
        blurOnSubmit={false}
      />
      {searchTerm ? (
        <StyledFilterBarContainer>
          <StyledFilterBar>
            <Dropdown options={['MOST RECENT', 'MOST POPULAR']} defaultValue="SELECT" />
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
        onClose={toggleFilters}
        applyFilters={applyFilters}
        brands={brands}
      />

      {searchTerm ? (
        <SearchList
          data={searchResults}
          navigation={navigation}
          numCol={2}
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
