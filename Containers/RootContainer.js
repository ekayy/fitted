import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import RootNav from '../Navigation/RootNav';

// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        <RootNav />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  // startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
