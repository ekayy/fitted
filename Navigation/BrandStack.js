import React from 'react';
import { StackNavigator } from 'react-navigation';
import Brands from '../Containers/Brands';
import BrandOverview from '../Containers/BrandOverview';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';

const BrandStack = StackNavigator(
  {
    Brands: {
      screen: Brands,
      navigationOptions: { title: 'Brands' }
    },
    BrandOverview: {
      screen: BrandOverview,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name
      })
    },
    GarmentDetail: {
      screen: GarmentDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.model
      })
    },
    FitDetail: {
      screen: FitDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.username
      })
    }
  },
  {
    initialRouteName: 'Brands'
  }
);

export default BrandStack;
