import React from 'react';
import { View } from 'react-native';
import RootNav from '../Navigation/RootNav';
import styles from './Styles/RootContainerStyles';

const RootContainer: React.FC = () => {
  return (
    <View style={styles.applicationView}>
      <RootNav />
    </View>
  );
};

// <RootNav
//   persistenceKey={'NavigationState'}
//   renderLoadingExperimental={() => <ActivityIndicator />}
// />

// wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = dispatch => ({
// startup: () => dispatch(StartupActions.startup())
// });

export default RootContainer;
