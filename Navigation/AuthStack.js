import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import RegisterMeasurements from '../Containers/RegisterMeasurements';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: { title: 'Fitted' }
    },

    Register: {
      screen: Register,
      navigationOptions: { title: 'Register' }
    },

    RegisterMeasurements: {
      screen: RegisterMeasurements,
      navigationOptions: { title: 'Enter Measurements' }
    }
  },
  {
    // Default config for all screens
    // headerMode: 'none'
    // navigationOptions: {
    //   headerStyle: styles.header
    // }
  }
);

export default AuthStack;
