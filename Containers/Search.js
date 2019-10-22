import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { Colors } from '../Themes';
import { connect } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { login, favoriteGarment } from '../Redux/UserRedux';
import SearchFilter from '../Components/Search/SearchFilter';
import SearchList from '../Components/SearchList';
import DropDown from '../Components/DropDown';

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
      brandIds: []
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.navigation.navigate('Landing');
    }
    const { garments } = this.props;

    this.setState({ refreshing: true, results: [] }, async () => {
      // Get garments from redux store
      await this.props.fetchGarments();
      this.setState(
        {
          garments
        },
        () => {
          this.setState({
            refreshing: false,
            results: [...this.state.garments.slice(0, 10)],
            remainingResults: [...this.state.garments.slice(10)]
          });
        }
      );
    });

    this.props.fetchBrands();
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
      brand
    } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.inputContainer}
          cancelButtonProps={{ color: '#000' }}
          round
          lightTheme
          placeholder="Search"
          onChangeText={this.handleChange}
          autoCapitalize="none"
          platform="ios"
          value={searchTerm}
        />

        <StyledFilterBarContainer>
          <DropDown
            options={['MOST RECENT', 'MOST POPULAR']}
            defaultValue="SELECT"
          />
          <VerticalDivider />
          <FilterButton onPress={this.toggleFilters}>
            <View>
              <FilterText>FILTER</FilterText>
            </View>
          </FilterButton>
        </StyledFilterBarContainer>

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
        ) : (
          <Text>This is the home screen</Text>
        )}
      </View>
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

const StyledFilterBarContainer = styled.View`
  height: 6%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;
const FilterButton = styled.TouchableOpacity`
  min-width: 30%;
`;
const FilterText = styled.Text`
  text-align: center;
`;
const VerticalDivider = styled.View`
  border-left-width: 1;
  align-self: stretch;
`;

const styles = {
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: '#f3f3f3',
    marginTop: 30
  },

  filterWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    zIndex: 10
  },
  filterContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5
  },
  filter: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.dark,
    borderRadius: 3
  },
  filterText: {
    color: '#fff'
  },
  activeFilter: {
    backgroundColor: Colors.darkFade
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  inputContainer: {
    backgroundColor: '#f3f3f3'
  }
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
