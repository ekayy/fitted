import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  controlsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  controls: {
    flex: 0.25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

  reverse: {
    position: 'absolute',
    right: 80
  },

  toggle: {
    position: 'absolute',
    left: 60
  }
});
