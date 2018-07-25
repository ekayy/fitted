import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import BrandStack from './BrandStack';
import SearchStack from './SearchStack';
import ProfileStack from './ProfileStack';

import styles from './Styles/NavigationStyles';
import { Ionicons } from '@expo/vector-icons';

const AppNav = createBottomTabNavigator(
  {
    BrandStack: {
      screen: BrandStack,
      navigationOptions: {
        title: 'Brands',
        tabBarLabel: 'Brands',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={26} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: 'Search',
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={26} color={tintColor} />
        )
      }
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={26} color={tintColor} />
        )
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

export default AppNav;
