import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';
import metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginVertical: Metrics.marginVertical
  },
  formContainer: {
    flex: 1,
    width: 315
  },
  form: {
    backgroundColor: Colors.snow,
    marginVertical: Metrics.baseMargin,
    borderRadius: 4,
    height: 188
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 14.5
  },
  rowLabel: {
    color: 'rgb(0,0,0)',
    marginVertical: Metrics.marginVertical,
    width: 51,
    fontSize: 14
  },
  textInput: {
    height: 36,
    width: 160,
    marginHorizontal: 28,
    color: Colors.coal,
    borderWidth: 0.5,
    borderColor: 'rgb(236,236,237)',
    padding: 7
  },
  rowInput: {
    flex: 1,
    flexDirection: 'row'
  },
  switchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  switchLabel: {},
  switch: {
    marginHorizontal: 10
  },
  buttonWrapper: {
    height: 44
  },
  buttonRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: 44
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgb(141,141,141)',
    width: 315,
    height: 44
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: 17
  },
  spacer: {
    height: 25
  }
});
