import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FitsGrid from '../Components/FitsGrid';
import { Ionicons } from '@expo/vector-icons';
import { tagGarmentToFit, clearCreatedFit } from '../Redux/FitsRedux';

class Fits extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Searching Database',
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('navigateCamera')}
          style={{
            marginRight: 20
          }}
        >
          <Ionicons name="ios-camera" size={40} color="#000" />
        </TouchableOpacity>
      )
    };
  };

  state = {
    fits: [],
    refreshing: false,
    loading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      navigateCamera: this._navigateCamera
    });
  }

  _navigateCamera = async () => {
    const { navigate } = this.props.navigation;
    const { clearCreatedFit, tagGarmentToFit } = this.props;
    const { currentGarment } = this.props.navigation.state.params;

    this.setState({ error: null });

    console.tron.log(currentGarment);

    await clearCreatedFit();
    await tagGarmentToFit(currentGarment);
    navigate('Camera');
  };

  render() {
    const { refreshing, loading } = this.state;
    const { results } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <FitsGrid
          data={results}
          navigation={this.props.navigation}
          handleLoadMore={() => {}}
          onRefresh={() => {}}
          refreshing={refreshing}
          loading={loading}
          numCol={3}
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { tagGarmentToFit, clearCreatedFit }
)(Fits);
