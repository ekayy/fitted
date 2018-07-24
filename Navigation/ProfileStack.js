import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Profile from '../Containers/Profile';
import ProfileSettings from '../Components/ProfileSettings';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: { title: 'Profile' }
    },
    ProfileSettings: {
      screen: ProfileSettings,
      navigationOptions: ({ navigation }) => ({
        navigationOptions: { title: 'Profile Settings' }
      })
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
