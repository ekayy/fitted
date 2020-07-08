import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateDiscussion from '../Containers/CreateDiscussion';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import Fits from '../Containers/Fits';
import Comments from '../Containers/Comments';
import Camera from '../Containers/Camera';
import TagGarments from '../Containers/TagGarments';
import SearchGarments from '../Containers/SearchGarments';
import SelectSizing from '../Containers/SelectSizing';
import AddCustomGarment from '../Containers/AddCustomGarment';
import CreateChoice from '../Components/CreateChoice';
import { Fit, ContentType } from '../types';

export type CreateDiscussionStackParamList = {
  Search: { screen: string; params: { objectId?: number; contentType?: ContentType; id?: number } };
  Camera: undefined;
  'Create Choice': undefined;
  'Tag Garments': { image: string };
  'Search Garments': { image: string };
  'Select Sizing': undefined;
  'Add Custom Garment': undefined;
  'Create Discussion': undefined;
  'Garment Detail': { title: string };
  'Fit Detail': Fit;
  Fits: { title: string };
  Comments: { objectId: number; contentType: ContentType };
};

const Stack = createStackNavigator<CreateDiscussionStackParamList>();

const CreateDiscussionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Choice"
        component={CreateChoice}
        options={() => ({ title: 'Start Discussion / Add New Fit' })}
      />
      <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name="Tag Garments" component={TagGarments} />
      <Stack.Screen name="Search Garments" component={SearchGarments} />
      <Stack.Screen name="Select Sizing" component={SelectSizing} />
      <Stack.Screen name="Add Custom Garment" component={AddCustomGarment} />
      <Stack.Screen name="Create Discussion" component={CreateDiscussion} />
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
    </Stack.Navigator>
  );
};

export default CreateDiscussionStack;
