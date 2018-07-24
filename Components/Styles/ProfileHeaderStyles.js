import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerText: {
    backgroundColor: 'transparent',
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  },
  backgroundImage: {
    paddingTop: 20
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1
  },

  descriptionContainer: {
    backgroundColor: '#000',
    flex: 1,
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
