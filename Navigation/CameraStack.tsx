import { createStackNavigator } from '@react-navigation/stack';
// import CreateDiscussion from '../Containers/CreateDiscussion';
import Camera from '../Containers/Camera';
import TagGarments from '../Containers/TagGarments';
import SearchGarments from '../Containers/SearchGarments';
import SelectSizing from '../Containers/SelectSizing';
import AddCustomGarment from '../Containers/AddCustomGarment';

export type CameraStackParamList = {
  Camera: undefined;
  'Tag Garments': undefined;
  'Search Garments': undefined;
  'Select Sizing': undefined;
  'Add Custom Garment': undefined;
};

const Stack = createStackNavigator<CameraStackParamList>();

const CameraStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name="Tag Garments" component={TagGarments} />
      <Stack.Screen name="Search Garments" component={SearchGarments} />
      <Stack.Screen name="Select Sizing" component={SelectSizing} />
      <Stack.Screen name="Add Custom Garment" component={AddCustomGarment} />
    </Stack.Navigator>
  );
};

export default CameraStack;
