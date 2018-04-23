import React from 'react';
import { StackNavigator } from 'react-navigation';
import Brands from '../Containers/Brands';
import Garments from '../Containers/Garments';
import Fits from '../Containers/Fits';

const BrandStack = StackNavigator(
  {
    Brands: {
      screen: Brands
    },
    Garments: {
      screen: Garments
    },
    Fits: {
      screen: Fits
    }
  },
  {
    initialRouteName: 'Brands'
  }
);

export default BrandStack;
