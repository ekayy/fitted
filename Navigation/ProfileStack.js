import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../Containers/Profile';
import GarmentDetail from '../Containers/GarmentDetail';

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: { title: 'Profile' }
    },
    GarmentDetail: {
      screen: GarmentDetail
    }
  },
  {
    initialRouteName: 'Profile'
  }
);

export default ProfileStack;
