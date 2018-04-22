import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/LoginScreenStyles';
import { Images, Metrics } from '../Themes';
import LoginActions from '../Redux/LoginRedux';

class LoginScreen extends React.Component {
  render() {
    return <View />;
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (username, password) =>
      dispatch(LoginActions.loginRequest(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
