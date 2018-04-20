import { StackNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
export default StackNavigator(
  {
    Feed: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Feed',
    initialRouteParams: { ...this.state },
    headerMode: 'screen',
    navigationOptions: {
      // headerStyle: styles.header
    }
  }
);
