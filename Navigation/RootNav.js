import React from 'react';
import { createStackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import MainNav from './MainNav';
import LoggedOutNav from './LoggedOutNav';
import LoadingScreen from '../Containers/LoadingScreen';

import styles from './Styles/NavigationStyles';

export const RootNav = createStackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    LoggedOutNav: { screen: LoggedOutNav },
    MainNav: { screen: MainNav }
  },
  {
    initialRouteName: 'MainNav',
    headerMode: 'none'
  }
);

// export default PrimaryNav
export default RootNav;
