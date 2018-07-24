import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../Containers/Login';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator(
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

export default AuthStack;
