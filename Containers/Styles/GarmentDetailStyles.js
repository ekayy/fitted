import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400,
  },

  favorite: {
    position: 'absolute',
    bottom: 0,
    right: Metrics.baseMargin,
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333',
  },
  image2: {
    width: undefined,
    height: 200,
  },
  descriptionSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  descriptionSectionLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionSectionRight: {},
  descriptionText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: Metrics.baseMargin,
  },
  colorSection: {
    padding: Metrics.baseMargin,
  },
  colorText: {
    display: 'flex',
    flexDirection: 'row',
  },
  colorSwatches: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
  },
  swatch: {
    marginRight: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },

  reviews: {
    padding: Metrics.doubleBaseMargin,
  },
  reviewItem: {
    marginVertical: Metrics.baseMargin,
  },

  carouselItem: {
    height: 150,
    backgroundColor: '#333',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
});
