import React from "react";
import { createBottomTabNavigator } from "react-navigation";
// import BrandStack from './BrandStack';
import SearchStack from "./SearchStack";
import CameraStack from "./CameraStack";
import ProfileStack from "./ProfileStack";

import styles from "./Styles/NavigationStyles";
import { Ionicons } from "@expo/vector-icons";

const AppNav = createBottomTabNavigator(
  {
    // BrandStack: {
    //   screen: SearchStack,
    //   navigationOptions: {
    //     title: 'Brands',
    //     tabBarLabel: 'Brands',
    //     tabBarIcon: ({ tintColor }) => (
    //       <Ionicons name="ios-shirt" size={26} color={tintColor} />
    //     )
    //   }
    // },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: "Search",
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-shirt" size={26} color={tintColor} />
        )
      }
    },
    CameraStack: {
      screen: CameraStack,
      navigationOptions: {
        title: "Camera",
        tabBarLabel: "Camera",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-camera" size={26} color={tintColor} />
        )
      }
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        title: "Profile",
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Search",
    tabBarOptions: {
      activeTintColor: "#e91e63",
      showLabel: false,
      showIcon: true
    }
  }
);

export default AppNav;
