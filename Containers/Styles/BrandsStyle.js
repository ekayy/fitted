import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image: {
    width: '100%',
    height: 200
  },
  button: {
    flex: 1,
    width: Metrics.screenWidth / 2
  }
});
