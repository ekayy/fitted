import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
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

  favorite: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    // borderRadius: 10
  },

  description: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: '#fff'
  },

  heading: {
    marginBottom: Metrics.baseMargin / 2,
    fontWeight: 'bold'
  },
  row: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: '#fff',
    paddingBottom: Metrics.baseMargin
  },

  tag: {
    backgroundColor: 'rgba(0,0,0,.75)',
    flex: 0,
    padding: Metrics.baseMargin,
    alignSelf: 'flex-start',
    borderRadius: Metrics.baseMargin / 2
  }
});
