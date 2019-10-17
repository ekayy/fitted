import React from 'react';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = props => {
  const { title, checked, handlePress } = props;

  return (
    <CheckBox
      right
      iconRight
      title={title}
      onPress={handlePress}
      uncheckedIcon={<Ionicons name="ios-radio-button-off" size={25} />}
      checkedIcon={<Ionicons name="ios-checkmark-circle-outline" size={25} />}
      containerStyle={styles.containerStyle}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      wrapperStyle={styles.wrapperStyle}
      textStyle={styles.textStyle}
      checkedColor="rgb(74, 144, 226)"
      checked={checked}
    />
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    margin: 0,
    backgroundColor: '#fff',
    width: '100%'
  },
  inputStyle: {
    margin: 0
  },
  inputContainerStyle: {
    margin: 0
  },
  wrapperStyle: {
    paddingRight: 10,
    margin: 0
  },
  textStyle: {
    flex: 1,
    fontWeight: 'normal'
  }
};

export default Checkbox;
