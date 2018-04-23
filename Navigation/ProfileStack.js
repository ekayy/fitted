import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../Containers/Profile';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: { title: 'Profile' }
    },
    GarmentDetail: {
      screen: GarmentDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.model
      })
    },
    FitDetail: {
      screen: FitDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.username
      })
    }
  },
  {
    initialRouteName: 'Profile'
  }
);

export default ProfileStack;
