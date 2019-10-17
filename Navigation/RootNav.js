import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppNav from './AppNav';
import AuthStack from './AuthStack';
import AuthLoading from '../Containers/AuthLoading';

export const RootNav = createSwitchNavigator(
  {
    AuthLoading: { screen: AuthLoading },
    Auth: { screen: AuthStack },
    App: { screen: AppNav }
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(RootNav);
