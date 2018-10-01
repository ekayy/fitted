import React from "react";
import { createStackNavigator } from "react-navigation";
import MyProfile from "../Containers/MyProfile";
import ProfileSettings from "../Components/ProfileSettings";
import GarmentDetail from "../Containers/GarmentDetail";
import FitDetail from "../Containers/FitDetail";

const ProfileStack = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: { title: "Profile" }
    },
    ProfileSettings: {
      screen: ProfileSettings,
      navigationOptions: ({ navigation }) => ({
        navigationOptions: { title: "Profile Settings" }
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
    initialRouteName: "UserProfile"
  }
);

export default ProfileStack;
