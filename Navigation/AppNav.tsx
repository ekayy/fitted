import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchStack from './SearchStack';
import CreateDiscussionStack from './CreateDiscussionStack';
// import CameraStack from './CameraStack';
import ActivityStack from './ActivityStack';
import ProfileStack from './ProfileStack';
import { Ionicons, Feather } from '@expo/vector-icons';

// import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'rgb(255,255,255)',
        showLabel: false,
        style: { backgroundColor: 'rgb(0,0,0)' },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-shirt" size={26} color={color} />,
        }}
      />
      <Tab.Screen
        name="Create Discussion"
        component={CreateDiscussionStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-add" size={26} color={color} />,
          // tabBarOnPress: ({ navigation, defaultHandler }) => {
          //   Alert.alert(
          //     'Discuss Garment / Upload Fit',
          //     null,
          //     [
          //       {
          //         text: 'Start a new discussion',
          //         onPress: () => {
          //           defaultHandler();
          //         },
          //       },
          //       {
          //         text: 'Upload a new fit photo',
          //         onPress: () => {
          //           navigation.navigate('Camera');
          //         },
          //       },
          //       {
          //         text: 'Cancel',
          //         style: 'cancel',
          //       },
          //     ],
          //     { cancelable: false },
          //   );
          // },
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStack}
        options={{
          tabBarIcon: ({ color }) => <Feather name="activity" size={26} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={26} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNav;
