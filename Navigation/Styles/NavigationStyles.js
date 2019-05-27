import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: 'rgb(0,0,0)'
  },
  label: {
    marginTop: Metrics.navBarHeight / 2,
    fontWeight: '700',
    fontSize: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '100',
    color: 'rgb(245,245,246)',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1
  }
});
