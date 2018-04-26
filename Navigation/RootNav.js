import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import MainNav from './MainNav';
import LoggedOutNav from './LoggedOutNav';
import LoadingScreen from '../Containers/LoadingScreen';

import styles from './Styles/NavigationStyles';

export const RootNav = StackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    LoggedOutNav: { screen: LoggedOutNav },
    MainNav: { screen: MainNav }
  },
  {
    initialRouteName: 'MainNav'
  }
);

// export default PrimaryNav
export default RootNav;
