import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../Containers/MyProfile';
import ProfileSettings from '../Components/ProfileSettings';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={MyProfile} />
      <Stack.Screen name="Profile Settings" component={ProfileSettings} />
      <Stack.Screen
        name="Garment Detail"
        component={GarmentDetail}
        options={({ navigation }) => ({ title: navigation.state.params.model })}
      />
      <Stack.Screen
        name="Fit Detail"
        component={FitDetail}
        options={({ navigation }) => ({ title: navigation.state.params.username })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
