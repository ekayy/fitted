import { createStackNavigator } from 'react-navigation';
import CreateDiscussion from '../Containers/CreateDiscussion';
import Camera from '../Containers/Camera';
import TagGarments from '../Containers/TagGarments';
import SearchGarments from '../Containers/SearchGarments';
import SelectSizing from '../Containers/SelectSizing';
import AddCustomGarment from '../Containers/AddCustomGarment';

const CameraStack = createStackNavigator(
  {
    Camera: {
      screen: Camera,
      navigationOptions: { title: 'Camera', header: null }
    },
    TagGarments: {
      screen: TagGarments,
      navigationOptions: { title: 'Tag Garments' }
    },
    SearchGarments: {
      screen: SearchGarments,
      navigationOptions: { title: 'Searching Database' }
    },
    SelectSizing: {
      screen: SelectSizing,
      navigationOptions: { title: 'Select Sizing' }
    },
    AddCustomGarment: {
      screen: AddCustomGarment,
      navigationOptions: { title: 'Add Custom Garment' }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);

export default CameraStack;
