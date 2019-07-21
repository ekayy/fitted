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
    return (
      <View style={styles.container}>
        <Text>
          Complete all fields below to tag custom piece to your fit. We will add
          it to our database ASAP!
        </Text>

        <Formik
          initialValues={{ brand: '', model: '', color: '', size: '' }}
          onSubmit={values => console.tron.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={formStyles.form}>
              <View style={formStyles.formRow}>
                <TextInput
                  style={formStyles.textInput}
                  placeholder="Brand"
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  value={values.brand}
                />
              </View>

              <View style={formStyles.formRow}>
                <TextInput
                  style={formStyles.textInput}
                  placeholder="Model"
                  onChangeText={handleChange('model')}
                  onBlur={handleBlur('model')}
                  value={values.model}
                />
              </View>

              <View style={formStyles.formRow}>
                <TextInput
                  style={formStyles.textInput}
                  placeholder="Color"
                  onChangeText={handleChange('color')}
                  onBlur={handleBlur('color')}
                  value={values.color}
                />
              </View>

              <View style={formStyles.formRow}>
                <TextInput
                  style={formStyles.textInput}
                  placeholder="Size"
                  onChangeText={handleChange('size')}
                  onBlur={handleBlur('size')}
                  value={values.size}
                />
              </View>
              <Button onPress={handleSubmit} title="Tag to Fit!" />
            </View>
          )}
        </Formik>
      </View>
    );
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
