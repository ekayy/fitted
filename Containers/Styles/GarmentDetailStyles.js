import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400
  },

  section: {
    display: 'flex',
    padding: Metrics.baseMargin
  },
  sectionTitle: {
    display: 'flex',
    paddingBottom: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  sectionTitleText: {
    color: '#333'
  },
  sectionSubtitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  buttonAltStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: Metrics.baseMargin,
    width: Metrics.screenWidth / 2 - 20
  },
  buttonAltTitleStyle: {
    color: '#444',
    fontSize: 13
  },
  buttonDefaultStyle: {
    backgroundColor: '#444',
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: Metrics.baseMargin,
    width: Metrics.screenWidth / 2 - 20
  },
  button: {
    display: 'flex',
    width: '100%',
    paddingVertical: Metrics.doubleBaseMargin
  },

  favorite: {
    position: 'absolute',
    bottom: 0,
    right: Metrics.baseMargin
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image2: {
    width: undefined,
    height: 200
  },
  descriptionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  descriptionText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: Metrics.baseMargin
  },
  colorSection: {
    padding: Metrics.baseMargin
  },
  colorText: {
    display: 'flex',
    flexDirection: 'row'
  },
  colorSwatches: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin
  },
  swatch: {
    marginRight: Metrics.baseMargin
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin
  },

  label: {
    fontWeight: 'bold',
    marginRight: 10
  },

  reviews: {
    padding: Metrics.doubleBaseMargin
  },
  reviewItem: {
    marginVertical: Metrics.baseMargin
  }
});
