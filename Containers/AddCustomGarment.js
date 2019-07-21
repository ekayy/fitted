import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import formStyles from '../Themes/AppStyles';

import { Formik, ErrorMessage } from 'formik';

class AddCustomGarment extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f3f3f3'
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1,
    width: 160,
    height: 150
  },
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: 20
  },
  description: {
    flex: 1,
    alignItems: 'center'
  }
};

export default AddCustomGarment;
