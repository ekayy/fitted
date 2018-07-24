import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
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
import { Metrics } from '../Themes';
import axios from 'axios';
import { baseURL } from '../Config';
import Reactotron from 'reactotron-react-native';

import styles from './Styles/LoginStyles';

class Register extends Component {
  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false
    };
    this.isAttempting = false;
  }

  signInAsync = async () => {
    const { username, password } = this.state;

    try {
      const response = await axios.post(`${baseURL}/user/get_auth_token/`, {
        username,
        password
      });

      await AsyncStorage.setItem('userToken', response.data.token);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { username, password, loading } = this.state;
    const editable = !loading;
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly;
    const { navigate, goBack } = this.props.navigation;

    return (
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Username</Text>
            <TextInput
              ref="username"
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this._handleChangeUsername}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder="Username"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <TextInput
              ref="password"
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={this._handleChangePassword}
              underlineColorAndroid="transparent"
              placeholder="Password"
            />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.signInAsync}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => goBack(null)}>
            <View>
              <Text style={styles.switchText}>
                Already have an account?
                <Text style={styles.switchText}> Sign In</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _handleChangeUsername = text => {
    this.setState({ username: text });
  };

  _handleChangePassword = text => {
    this.setState({ password: text });
  };
}

export default Register;
