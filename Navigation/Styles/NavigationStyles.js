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
    fontWeight: '200',
    color: 'rgb(245,245,246)',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  }
});
