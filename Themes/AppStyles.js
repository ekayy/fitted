import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const AppStyles = {
  screen: {
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  container: {
    flex: 1,
    backgroundColor: Colors.snow
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#444',
    paddingVertical: Metrics.baseMargin,
    width: '100%'
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
    width: '100%'
  },
  button: {
    display: 'flex',
    width: '100%',
    paddingVertical: Metrics.doubleBaseMargin
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
  }
};

export default AppStyles;
