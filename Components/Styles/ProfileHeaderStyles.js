import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  headerText: {
    backgroundColor: 'transparent',
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 20,
    maxHeight: 200
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1
  },

  descriptionContainer: {
    backgroundColor: '#000',
    flexDirection: 'row'
  },
  descriptionItem: {
    flex: 1,
    padding: 10
  },
  descriptionText: {
    color: Colors.snow,
    textAlign: 'center'
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
    width: undefined,
    height: 200
  },
  button: {
    flex: 1,
    width: Metrics.screenWidth / 2
  }
});
