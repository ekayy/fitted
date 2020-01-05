import { createStackNavigator } from 'react-navigation';
import CreateDiscussion from '../Containers/CreateDiscussion';
import GarmentDetail from '../Containers/GarmentDetail';
import FitDetail from '../Containers/FitDetail';
// import Profile from '../Containers/Profile';
import Fits from '../Containers/Fits';
import Comments from '../Containers/Comments';
import CommentSingle from '../Components/Comment/CommentSingle';
import Camera from '../Containers/Camera';
import TagGarments from '../Containers/TagGarments';
import SearchGarments from '../Containers/SearchGarments';
import SelectSizing from '../Containers/SelectSizing';
import AddCustomGarment from '../Containers/AddCustomGarment';

const CreateDiscussionStack = createStackNavigator(
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
    },
    CreateDiscussion: {
      screen: CreateDiscussion,
      navigationOptions: { title: 'Discussion' }
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
      screen: Comments
    },
    CommentSingle: {
      screen: CommentSingle
    }
  },
  {
    initialRouteName: 'CreateDiscussion'
  }
);

export default CreateDiscussionStack;
