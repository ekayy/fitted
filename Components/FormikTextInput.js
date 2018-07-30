import React, { Component } from 'react';
import { TextInput } from 'react-native';

class FormikTextInput extends Component {
  handleChange = (value: string) => {
    // remember that onChangeText will be Formik's setFieldValue
    this.props.onChangeText(this.props.name, value);
  };

  render() {
    // we want to pass through all the props except for onChangeText
    const { onChangeText, ...otherProps } = this.props;
    return <TextInput onChangeText={this.handleChange} {...otherProps} />;
  }
}

export default FormikTextInput;
