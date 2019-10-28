import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchGarmentsTest } from '../Redux/GarmentsRedux';

import BrandGrid from './BrandGrid';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      remainingResults: [],
      error: null,
      loading: false,
      refreshing: false
    };
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
    const { loading, refreshing } = this.state;
    const { brands, brandTable } = this.props;

    return (
      <View style={styles.container}>
        <BrandGrid
          brandTable={brandTable}
          brands={brands}
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
