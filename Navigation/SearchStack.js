import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Search from '../Containers/Search';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        title: 'Search',
        header: null
      }
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
    initialRouteName: 'Search'
  }
);

export default SearchStack;
