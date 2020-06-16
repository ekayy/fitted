/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your AppNav) which the user
 * will use once logged in.
 */
import React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNav from './AppNav';
import AuthStack from './AuthStack';
import { useTypedSelector, ContentType } from '../types';
import Comments from '../Containers/Comments';

/**i()uasdf
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  AuthStack: undefined;
  App: undefined;
  Comments: { objectId: number; contentType: ContentType; model: string };
};

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="App" component={AppNav} options={{ headerShown: false }} />
          <Stack.Screen
            name="Comments"
            component={Comments}
            options={({ route }) => ({ headerBackTitle: 'Back' })}
          />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export const RootNav = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  );
});

RootNav.displayName = 'RootNav';
