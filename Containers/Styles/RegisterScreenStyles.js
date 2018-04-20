import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  rowInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  switchLabel: {
    color: Colors.charcoal
  },
  switch: {
    marginHorizontal: 10
  },
  headerText: {
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  },

  formContainer: {
    flex: 1
  },
  picker: {
    backgroundColor: '#fff'
  }
});
