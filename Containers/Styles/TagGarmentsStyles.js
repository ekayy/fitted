import { StyleSheet, StatusBar } from 'react-native';
import { Fonts, Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin,
    backgroundColor: '#fff'
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
  },

  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },

  rightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
    backgroundColor: 'red'
  },
  rightBtnText: {
    color: '#fff'
  },

  capturedPhotoSection: {
    flex: 1,
    flexDirection: 'row'
  },
  photo: {
    width: 150,
    height: 150
  },
  textArea: {
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa'
  },

  button: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgb(74,144,225)',
    marginRight: 10
  },
  buttonText: { color: '#fff' }
});
