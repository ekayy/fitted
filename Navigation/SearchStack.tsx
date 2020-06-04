import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Containers/Search';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import Profile from '../Containers/Profile';
import Fits from '../Containers/Fits';
import Comments from '../Containers/Comments';
import CommentSingle from '../Components/Comment/CommentSingle';

export type SearchStackParamList = {
  Search: undefined;
  'Garment Detail': { title: string } | undefined;
  'Fit Detail': { title: string } | undefined;
  Fits: { title: string } | undefined;
  Comments: undefined;
  'Comment Single': undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
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
      <Stack.Screen
        name="Fits"
        component={Fits}
        options={({ route }) => ({ title: route.params['model'] })}
      />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Comment Single" component={CommentSingle} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({ title: route.params['username'] })}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
