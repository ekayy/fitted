import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70
    // backgroundColor: Colors.background
  },
  headerText: {
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  rowInput: {
    flex: 1
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  switchLabel: {},
  switch: {
    marginHorizontal: 10
  }
});
