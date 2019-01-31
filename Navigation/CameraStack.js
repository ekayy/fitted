import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Camera from '../Containers/Camera';
import TagPhoto from '../Containers/TagPhoto';
import SearchGarments from '../Containers/SearchGarments';
import SelectSizing from '../Containers/SelectSizing';
import CreatePiece from '../Containers/CreatePiece';

const CameraStack = createStackNavigator(
  {
    Camera: {
      screen: Camera,
      navigationOptions: { title: 'Camera', header: null }
    },
    TagPhoto: {
      screen: TagPhoto,
      navigationOptions: { title: 'Tag garments' }
    },
    SearchGarments: {
      screen: SearchGarments,
      navigationOptions: { title: 'Searching Database' }
    },
    SelectSizing: {
      screen: SelectSizing,
      navigationOptions: { title: 'Select Sizing' }
    },
    CreatePiece: {
      screen: CreatePiece,
      navigationOptions: { title: 'Create Piece' }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);

export default CameraStack;
