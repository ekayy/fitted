import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchGarmentsTest } from '../Redux/GarmentsRedux';

import BrandGrid from './BrandGrid';

class Home extends Component {
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
      brand: ''
    };
  }

  componentDidMount() {
    // const { garments } = this.props;
    // this.setState({ refreshing: true, results: [] });
    // // Get garments from redux store
    // this.props.fetchGarmentsTest().then(data => {
    //   let garments = data.payload.garments;
    //   this.setState({
    //     garments: garments,
    //     results: garments.slice(0, 10),
    //     remainingResults: garments.slice(10),
    //     refreshing: false
    //   });
    // });
  }

  handleRefresh = () => {};

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

  render() {
    const { loading, refreshing, garments } = this.state;

    return (
      <View style={styles.container}>
        <BrandGrid
          data={this.props.results}
          navigation={this.props.navigation}
          numCol={2}
          handleLoadMore={this.handleLoadMore}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
          loading={loading}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  }
};

const mapStateToProps = state => {
  return {
    garments: state.garments.items
  };
};

export default connect(
  mapStateToProps,
  { fetchGarmentsTest }
)(Home);
