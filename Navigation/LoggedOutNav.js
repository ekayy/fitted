import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from '../Containers/Login';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const LoggedOutNav = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: { title: 'Login' },
      header: null
    }
  },
  {
    // Default config for all screens
    headerMode: 'none'
    // navigationOptions: {
    //   headerStyle: styles.header
    // }
  }
);

export default LoggedOutNav;
