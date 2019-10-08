import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Search from '../Containers/Search';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
import Profile from '../Containers/Profile';
import Fits from '../Containers/Fits';
import Comments from '../Containers/Comments';
import CommentIndex from '../Components/Comment/CommentIndex';

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
    },
    Fits: {
      screen: Fits,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.model
      })
    },
    Comments: {
      screen: Comments,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.model
      })
    },
    CommentIndex: {
      screen: CommentIndex,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.model
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.user.username
      })
    }
  },
  {
    initialRouteName: 'Search'
  }
);

export default SearchStack;
