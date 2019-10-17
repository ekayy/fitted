import { createStackNavigator } from 'react-navigation';
import Activity from '../Containers/Activity';

const ActivityStack = createStackNavigator(
  {
    Activity: {
      screen: Activity,
      navigationOptions: { title: 'Activity' }
    }
  },
  {
    initialRouteName: 'Activity'
  }
);

export default ActivityStack;
