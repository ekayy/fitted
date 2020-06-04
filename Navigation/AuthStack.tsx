import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../Containers/Landing';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import RegisterMeasurements from '../Containers/RegisterMeasurements';

import styles from './Styles/NavigationStyles';

export type AuthParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  'Register Measurements': undefined;
};

const Stack = createStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        headerStyle: styles.header,
        headerTintColor: 'rgb(245,245,246)',
        headerTitleStyle: styles.title,
      }}
    >
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Register Measurements" component={RegisterMeasurements} />
    </Stack.Navigator>
  );
};

export default AuthStack;
