import React, { Component } from 'react';
import styled from 'styled-components';
import { View, ActivityIndicator } from 'react-native';
import { SearchBar, ListItem, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { login, favoriteGarment } from '../Redux/UserRedux';
import SearchFilter from '../Components/Search/SearchFilter';
import SearchList from '../Components/SearchList';
import DropDown from '../Components/DropDown';
import Home from '../Components/Home';

class Search extends Component {
  static navigationOptions = {
    title: 'Search'
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      garments: [],
      results: [],
      remainingResults: [],
      error: null,
      loading: false,
      refreshing: false,
      limit: 9999,
      showFilters: false,
      brandIds: [],
      brandTable: {}
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.navigation.navigate('Landing');
    }
    const { garments } = this.props;

    this.setState({ refreshing: true, results: [] }, async () => {
      // Get garments from redux store
      await this.props.fetchBrands();
      await this.props.fetchGarments();
      this.setState(
        {
          garments
        },
        async () => {
          await this.createBrandTable();
          this.setState({
            refreshing: false,
            results: [...this.state.garments.slice(0, 10)],
            remainingResults: [...this.state.garments.slice(10)]
          });
        }
      );
    });
  }

  // sort all garments into their respective brand
  createBrandTable() {
    const { brands } = this.props;
    const { brandTable, garments } = this.state;
    brands.forEach(brand => {
      brandTable[brand.name] = [];
    });
    garments.forEach(garment => {
      brandTable[garment.brand_name].push(garment);
    });
  }

  handleChange = searchTerm => {
    const { brandIds } = this.state;

    const searchedResults = this.state.garments.filter(result =>
      searchTerm
        ? result.model.toLowerCase().includes(searchTerm)
        : this.state.garments
    );

    const filteredResults = brandIds.length
      ? searchedResults.filter(result => brandIds.includes(result.brand))
      : searchedResults;

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: true, results: [] }, async () => {
      await this.props.fetchGarments();

      this.setState({
        refreshing: false,
        results: [...this.state.garments.slice(0, 10)],
        remainingResults: [...this.state.garments.slice(10)]
      });
    });
  };

  // do nothing because the entire page is loaded
  handleLoadMore = () => {
    const { remainingResults, results } = this.state;

    this.setState({
      loading: true
    });

    this.setState({
      remainingResults: remainingResults.slice(10),
      results: [...results, ...remainingResults.slice(0, 10)],
      loading: false
    });
  };

  // Search filters: e.g. [1,3,5]
  applyFilters = brandIds => {
    const { searchTerm } = this.state;

    this.setState({
      results: [],
      brandIds
    });

    const searchedResults = this.state.garments.filter(result =>
      searchTerm
        ? result.model.toLowerCase().includes(searchTerm)
        : this.state.garments
    );

    const filteredResults = searchedResults.filter(result =>
      brandIds.includes(result.brand)
    );

    let slicedResults = filteredResults.slice(0, 10);
    let remainingResults = filteredResults.slice(10);

    this.setState({
      searchTerm,
      remainingResults: remainingResults,
      results: slicedResults
    });
  };

  // Toggle search filters overlay
  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  render() {
    const {
      searchTerm,
      results,
      loading,
      refreshing,
      showFilters,
      brandIds,
      brandTable
    } = this.state;

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
          onChangeText={this.handleChange}
          autoCapitalize="none"
          platform="ios"
          value={searchTerm}
        />
        {searchTerm ? (
          <StyledFilterBarContainer>
            <StyledFilterBar>
              <DropDown
                options={['MOST RECENT', 'MOST POPULAR']}
                defaultValue="SELECT"
              />
            </StyledFilterBar>

            <VerticalDivider />

            <StyledFilterBar>
              <StyledFilterButton onPress={this.toggleFilters}>
                <StyledFilterText>FILTER</StyledFilterText>
                {brandIds.length > 0 && (
                  <Badge
                    status="error"
                    value={brandIds.length}
                    containerStyle={styles.badgeStyle}
                  />
                )}
              </StyledFilterButton>
            </StyledFilterBar>
          </StyledFilterBarContainer>
        ) : null}

        <SearchFilter
          navigation={this.props.navigation}
          showFilters={showFilters}
          onClose={this.toggleFilters}
          applyFilters={this.applyFilters}
          brands={this.props.brands}
        />

        {searchTerm ? (
          <SearchList
            data={results}
            navigation={this.props.navigation}
            numCol={2}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
            brands={this.props.brands}
            user={this.props.user}
            favoriteGarment={this.props.favoriteGarment}
          />
        ) : Object.keys(brandTable).length > 0 ? (
          <Home
            brandTable={brandTable}
            brands={this.props.brands}
            navigation={this.props.navigation}
          />
        ) : (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </StyledContainer>
    );
  }

  renderItem = ({ item }) => {
    const { brand, model, color, sku, photo } = item;
    const { navigate } = this.props.navigation;

    return (
      <ListItem
        title={model}
        titleStyle={{ color: '#000' }}
        onPress={() => {
          navigate('GarmentDetail', item);
        }}
      />
    );
  };
}

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
  searchBarContainer: { backgroundColor: 'rgb(0,0,0)', paddingVertical: 10 },
  inputContainer: { backgroundColor: 'rgb(255,255,255)' },
  input: { backgroundColor: 'rgb(255,255,255)' },
  badgeStyle: { position: 'absolute', top: 0, right: -20 }
};

const mapStateToProps = state => {
  return {
    garments: state.garments.items,
    isLoggedIn: state.user.isLoggedIn,
    brands: state.brands.items,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { login, fetchGarments, fetchBrands, favoriteGarment }
)(Search);
