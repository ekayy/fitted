import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 5,
    width: 315
  },
  loginRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  formRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderWidth: 0.5,
    borderColor: 'rgb(236,236,237)',
    height: 50.5,
    paddingVertical: 5
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontSize: 17
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginButtonWrapper: {
    height: 44
  },
  loginButton: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgb(141,141,141)',
    width: 315
  },
  loginText: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: 17
  },
  facebookButton: {
    backgroundColor: 'rgb(59,89,152)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 315
  },
  switchText: {
    textAlign: 'center',
    color: Colors.green
  },
  headerText: {
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  },
  or: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(135,136,140)'
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  }
});
