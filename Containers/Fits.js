import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FitsGrid from '../Components/FitsGrid';
import { Ionicons } from '@expo/vector-icons';

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

  _navigateCamera = () => {
    this.setState({ error: null });
    this.props.navigation.navigate('Camera');
  };

  render() {
    const { refreshing, loading } = this.state;
    const { fits } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <FitsGrid
          data={fits}
          navigation={this.props.navigation}
          handleLoadMore={() => {}}
          onRefresh={() => {}}
          refreshing={refreshing}
          loading={loading}
          numCol={2}
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

export default Fits;
