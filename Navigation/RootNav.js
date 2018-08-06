import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
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

export default RootNav;
