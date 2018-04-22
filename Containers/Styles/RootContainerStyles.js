import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  }
});
