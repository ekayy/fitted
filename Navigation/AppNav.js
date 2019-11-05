import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
// import BrandStack from './BrandStack';
import SearchStack from './SearchStack';
import CreateDiscussionStack from './CreateDiscussionStack';
import CameraStack from './CameraStack';
import ProfileStack from './ProfileStack';
import ActivityStack from './ActivityStack';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';

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
        title: 'Search',
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-shirt" size={26} color={tintColor} />
        )
      }
    },
    CreateDiscussionStack: {
      screen: CreateDiscussionStack,
      navigationOptions: {
        title: 'CreateDiscussions',
        tabBarLabel: 'Add',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={26} color={tintColor} />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          Alert.alert(
            'Discuss Garment / Upload Fit',
            null,
            [
              {
                text: 'Start a new discussion',
                onPress: () => {
                  defaultHandler();
                }
              },
              {
                text: 'Upload a new fit photo',
                onPress: () => {
                  navigation.navigate('Camera');
                }
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ],
            { cancelable: false }
          );
        }
      }
    },
    ActivityStack: {
      screen: ActivityStack,
      navigationOptions: {
        title: 'Activity',
        tabBarLabel: 'Activity',
        tabBarIcon: ({ tintColor }) => (
          <Feather name="activity" size={26} color={tintColor} />
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
    initialRouteName: 'Search',
    tabBarOptions: {
      activeTintColor: "#e91e63",
      inactiveTintColor: 'rgb(255,255,255)',
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: 'rgb(0,0,0)'
      }
    }
  }
);

export default AppNav;
