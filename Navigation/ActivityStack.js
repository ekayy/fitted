import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from '../Containers/Activity';

const Stack = createStackNavigator();

const ActivityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="activity" component={Activity} />
    </Stack.Navigator>
  );
};

export default ActivityStack;
