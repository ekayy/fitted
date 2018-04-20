import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight / 2,
    backgroundColor: Colors.background
  },
  description: {
    backgroundColor: '#ccc'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gridItem: {
    flex: 1,
    height: 200,
    backgroundColor: '#333'
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    width: Metrics.screenWidth / 2 - 10
  },
  image: {
    height: 200,
    marginVertical: 10,
    width: Metrics.screenWidth / 2 - 10
  },

  tabContainer: {
    // backgroundColor: Colors.snow
  },
  tabItem: {
    height: Metrics.navBarHeight
  },
  tabLabel: {
    // color: '#000',
    fontWeight: '700',
    marginTop: Metrics.navBarHeight / 2
  },
  indicator: {
    // backgroundColor: '#000'
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
    flex: 1
  }
});
