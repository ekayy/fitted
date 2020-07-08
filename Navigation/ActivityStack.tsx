import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from '../Containers/Activity';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import Profile from '../Containers/Profile';
import Fits from '../Containers/Fits';
import Camera from '../Containers/Camera';

import { Garment, Fit, ContentType, Comment } from '../types';
import Comments from '../Containers/Comments';

export type ActivityParamList = {
  'Create Discussion': { screen: string };
  Activity: undefined;
  'Garment Detail': Pick<Garment, 'id'>;
  'Fit Detail': Pick<Fit, 'id'>;
  Fits: Garment;
  Profile: { title: string } | undefined;
  Camera: undefined;
  Comments: { objectId: number; contentType: ContentType; comment?: Comment };
};

const Stack = createStackNavigator<ActivityParamList>();

const ActivityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen
        name="Garment Detail"
        component={GarmentDetail}
        options={({ route }) => ({ title: route.params!['model'] })}
      />
      <Stack.Screen
        name="Fit Detail"
        component={FitDetail}
        options={({ route }) => ({ title: route.params!['username'] })}
      />
      <Stack.Screen
        name="Fits"
        component={Fits}
        options={({ route }) => ({ title: route.params!['model'] })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({ title: route.params!['username'] })}
      />
      <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name="Comments" component={Comments} options={{ title: '' }} />
    </Stack.Navigator>
  );
};

export default ActivityStack;
