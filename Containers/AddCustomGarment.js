import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import AppStyles from '../Themes/AppStyles';
import styles from './Styles/AddCustomGarmentStyles';
import { Formik, ErrorMessage } from 'formik';
import { createGarment } from '../Redux/GarmentsRedux';

class AddCustomGarment extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
  }

  onSubmit = values => {
    this.props.createGarment(values);

    // this.props.navigation.navigate('TagGarments', response);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.directions}>
          Complete all fields below to tag custom piece to your fit. We will add
          it to our database ASAP!
        </Text>

        <Formik
          initialValues={{ brand: '', model: '', color: '', size: '' }}
          onSubmit={values => this.onSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={AppStyles.form}>
              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="*Brand"
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  value={values.brand}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="*Model (Name of piece)"
                  onChangeText={handleChange('model')}
                  onBlur={handleBlur('model')}
                  value={values.model}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="*Color"
                  onChangeText={handleChange('color')}
                  onBlur={handleBlur('color')}
                  value={values.color}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="*Size"
                  onChangeText={handleChange('size')}
                  onBlur={handleBlur('size')}
                  value={values.size}
                />
              </View>

              <View style={styles.buttonWrapper}>
                <Button
                  onPress={handleSubmit}
                  title="Tag to Fit!"
                  buttonStyle={[AppStyles.buttonDefaultStyle]}
                  titleStyle={AppStyles.buttonDefaultTitleStyle}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  { createGarment }
)(AddCustomGarment);
