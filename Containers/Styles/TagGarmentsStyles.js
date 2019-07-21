import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  formRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.baseMargin
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  productImage: {
    marginRight: Metrics.baseMargin
  },
  textInput: {
    flex: 1
  },
  formTitle: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10
  },

  close: {
    position: 'absolute',
    top: 5,
    right: 15,
    backgroundColor: 'transparent'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 25,
    backgroundColor: '#f3f3f3'
  }
});
