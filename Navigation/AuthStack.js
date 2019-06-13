import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Landing from '../Containers/Landing';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import RegisterMeasurements from '../Containers/RegisterMeasurements';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null
      }
    },

    Login: {
      screen: Login,
      navigationOptions: { title: 'LOGIN' }
    },

    Register: {
      screen: Register,
      navigationOptions: {
        title: 'SIGNUP'
      }
    },

    RegisterMeasurements: {
      screen: RegisterMeasurements,
      navigationOptions: {
        title: 'WELCOME'
      }
    }
  },
  {
    // Default config for all screens
    navigationOptions: {
      headerStyle: styles.header,
      headerTintColor: 'rgb(245,245,246)',
      headerTitleStyle: styles.title,
      headerLeft: null
    }
  }
);

export default AuthStack;
