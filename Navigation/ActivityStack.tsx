import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from '../Containers/Activity';

export type ActivityParamList = {
  Activity: undefined;
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
    </Stack.Navigator>
  );
};

export default ActivityStack;
