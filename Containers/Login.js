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
import { connect } from 'react-redux';
import { Metrics } from '../Themes';
import axios from 'axios';
import { baseURL, fbAppId } from '../Config';
import { login, fetchProfile } from '../Redux/UserRedux';

import styles from './Styles/LoginStyles';

class Login extends Component {
  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor(props) {
    super(props);
    this.state = {
      username: 'wesleylulee',
      password: 'password',
      loading: false
    };
    this.isAttempting = false;
  }

  signInAsync = async () => {
    const { username, password } = this.state;

    await this.props.login(username, password);

    await this.props.fetchProfile(this.props.profileId);

    if (!this.props.error) {
      await this.props.navigation.navigate('App');
    }
  };

  loginFb = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      fbAppId,
      {
        permissions: ['public_profile']
      }
    );
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      this.props.navigation.navigate('App');
    }
  };

  render() {
    const { username, password, loading } = this.state;
    const editable = !loading;
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly;
    const { navigate } = this.props.navigation;

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
                <Text style={styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.row, { alignItems: 'center' }]}>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this.loginFb}
          >
            <View style={styles.facebookButton}>
              <Text style={styles.loginText}>Sign In With Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <View>
              <Text style={styles.switchText}>
                Don't have an account?
                <Text style={styles.switchText}> Sign Up</Text>
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

const mapStateToProps = state => {
  return {
    error: state.user.error,
    loading: state.user.loading,
    profileId: state.user.profileId
  };
};

export default connect(
  mapStateToProps,
  { login, fetchProfile }
)(Login);
