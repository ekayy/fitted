import React from 'react';
import { StackNavigator } from 'react-navigation';
import BrandScreen from '../Containers/BrandScreen';

const RootStack = StackNavigator({
  Home: {
    screen: BrandScreen
  }
});

export default RootStack;
