import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';

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

// <RootNav
//   persistenceKey={'NavigationState'}
//   renderLoadingExperimental={() => <ActivityIndicator />}
// />

// wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = dispatch => ({
// startup: () => dispatch(StartupActions.startup())
// });

export default RootContainer;
