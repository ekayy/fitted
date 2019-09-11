import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#f3f3f3'
  },
  tabContainer: {
    flex: 1
  },

  tabBarStyle: {
    // backgroundColor: '#4a4a4a'
  },
  tabStyle: {
    backgroundColor: '#4a4a4a',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  indicatorStyle: {
    backgroundColor: '#4a4a4a'
  },
  labelStyle: {
    textAlign: 'center'
  },

  closet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20
  },
  editButtonStyle: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#737373'
  },
  editButtonTitleStyle: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase'
  }
});
