import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  headerText: {
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  },
  imageContainer: {
    marginTop: 10
  },
  image: {
    height: 200,
    marginLeft: 10,
    width: Metrics.screenWidth / 2 - 15
  }
});
