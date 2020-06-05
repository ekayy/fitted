import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  landingContainer: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0.8)',
    height: 300,
    marginBottom: 5,
  },
  welcomeText: {
    paddingTop: 70,
  },
  welcomeTitle: {
    textAlign: 'center',
    paddingBottom: 13,
    fontSize: 32,
    color: 'rgb(255,255,255)',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    paddingVertical: 2,
    fontSize: 17,
    color: 'rgb(255,255,255)',
  },
  container: {
    flex: 1,
    paddingTop: 45,
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 5,
    width: 315,
  },
  loginRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  formRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderWidth: 0.5,
    borderColor: 'rgb(236,236,237)',
    height: 50.5,
    paddingVertical: 5,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontSize: 17,
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginButtonWrapper: {
    height: 44,
  },
  loginButton: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgb(141,141,141)',
    width: 315,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: 17,
  },
  facebookButton: {
    backgroundColor: 'rgb(59,89,152)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 315,
  },
  switchText: {
    textAlign: 'center',
    color: Colors.green,
  },
  headerText: {
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  or: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(135,136,140)',
    alignSelf: 'center',
    paddingHorizontal: 13,
  },
  hairline: {
    backgroundColor: 'rgb(135,136,140)',
    height: 1,
    width: 128,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomTextContainer: {
    backgroundColor: 'rgb(0,0,0)',
    paddingVertical: 15,
  },
  bottomText: {
    color: 'rgb(255,255,255)',
  },
  policy: {
    borderWidth: 1,
    borderBottomColor: 'rgb(151,151,151)',
  },
  highlightBlue: {
    color: 'rgb(74,144,226)',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
