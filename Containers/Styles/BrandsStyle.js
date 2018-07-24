import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: Metrics.screenWidth / 2,
    height: 150,
    padding: 20
  },
  image: {
    width: '100%',
    height: 150
  }
});
