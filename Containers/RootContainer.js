import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import RootStack from '../Navigation/RootStack';
import { connect } from 'react-redux';

class RootContainer extends Component {
  render() {
    return (
      <View>
        <RootStack />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  // startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
