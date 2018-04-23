import React from 'react';
import { TabNavigator } from 'react-navigation';
import BrandStack from './BrandStack';
import ProfileStack from './ProfileStack';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const RootNav = TabNavigator(
  {
    BrandStack: {
      screen: BrandStack,
      navigationOptions: {
        title: 'Brands',
        tabBarLabel: 'Brands',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={26} color={tintColor} />
        ),
        header: null
      }
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={26} color={tintColor} />
        ),
        header: null
      }
    }
  },
  {
    initialRouteName: 'BrandStack',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showLabel: false,
      showIcon: true
    }
  }
);

export default RootNav;
