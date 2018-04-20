import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  header: {
    height: Metrics.navBarHeight
  },
  label: {
    marginTop: Metrics.navBarHeight / 2,
    fontWeight: '700',
    fontSize: 12
  }
});
