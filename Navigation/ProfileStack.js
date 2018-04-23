import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../Containers/Profile';

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: { title: 'Profile' }
    }
  },
  {
    initialRouteName: 'Profile'
  }
);

export default ProfileStack;
