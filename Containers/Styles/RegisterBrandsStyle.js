import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  headerText: {
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.marginVertical,
    ...Fonts.style.h4
  }
});
