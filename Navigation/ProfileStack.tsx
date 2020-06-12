import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../Containers/MyProfile';
import ProfileSettings from '../Components/ProfileSettings';
import ProfileSettingsEdit from '../Components/ProfileSettingsEdit';
import ChangePassword from '../Components/ChangePassword';
import ChangeEmail from '../Components/ChangeEmail';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import { Profile } from '../types';

export type ProfileStackParamList = {
  Profile: Profile;
  'Profile Settings': undefined;
  'Edit Profile': undefined;
  'Change Password': undefined;
  'Change Email': undefined;
  'Garment Detail': { title: string };
  'Fit Detail': { title: string };
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={MyProfile} />
      <Stack.Screen name="Profile Settings" component={ProfileSettings} />
      <Stack.Screen name="Edit Profile" component={ProfileSettingsEdit} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Change Email" component={ChangeEmail} />
      <Stack.Screen
        name="Garment Detail"
        component={GarmentDetail}
        options={({ route }) => ({ title: route.params['model'] })}
      />
      <Stack.Screen
        name="Fit Detail"
        component={FitDetail}
        options={({ route }) => ({ title: route.params['username'] })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
