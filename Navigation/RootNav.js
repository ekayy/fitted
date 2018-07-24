import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import AppNav from './AppNav';
import AuthStack from './AuthStack';
import AuthLoading from '../Containers/AuthLoading';

import styles from './Styles/NavigationStyles';

export const RootNav = createSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoading },
    Auth: { screen: AuthStack },
    App: { screen: AppNav }
  },
  {
    initialRouteName: 'AuthLoading'
    // headerMode: 'none'
  }
);

// export default PrimaryNav
export default RootNav;
