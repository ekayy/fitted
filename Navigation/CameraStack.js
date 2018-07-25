import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Camera from '../Containers/Camera';
import CreateFit from '../Containers/CreateFit';

const CameraStack = createStackNavigator(
  {
    Camera: {
      screen: Camera,
      navigationOptions: { title: 'Camera', header: null }
    },
    CreateFit: {
      screen: CreateFit,
      navigationOptions: { title: 'Fit - Add Detail' }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);

export default CameraStack;
