import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import BrandStack from './BrandStack';
import Search from '../Containers/Search';
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
        ),
        header: null
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        title: 'Search',
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={26} color={tintColor} />
        )
        // header: null
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

export default AppNav;
