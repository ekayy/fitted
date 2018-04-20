import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import styles from './Styles/NavigationStyles';
import GarmentStackNavigator from './GarmentStackNavigator';

// Manifest of possible screens
export default TabNavigator(
  {
    FeedTab: {
      screen: GarmentStackNavigator,
      navigationOptions: {
        title: 'Feed',
        tabBarLabel: 'Feed',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={26} color={tintColor} />
        ),
        header: null
      }
    }
  },
  {
    navigationOptions: {
      // headerStyle: styles.header
    },
    initialRouteParams: { ...this.state },
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showLabel: false,
      showIcon: true
    }
  }
);
