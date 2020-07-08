import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Containers/Search';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import Profile from '../Containers/Profile';
import Fits from '../Containers/Fits';
import Camera from '../Containers/Camera';

import { Garment, Fit, ContentType, Comment } from '../types';
import Comments from '../Containers/Comments';

export type SearchStackParamList = {
  'Create Discussion': { screen: string };
  Search: undefined;
  'Garment Detail': Garment;
  'Fit Detail': Fit;
  Fits: Garment;
  Comments: { objectId: number; contentType: ContentType; comment?: Comment };
  Profile: { title: string } | undefined;
  Camera: undefined;
};

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
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
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default SearchStack;
