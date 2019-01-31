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
  }
};

export default AppStyles;
