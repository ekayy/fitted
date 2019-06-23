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
import { baseURL } from '../Config';
import Reactotron from 'reactotron-react-native';
import { login, fetchProfile } from '../Redux/UserRedux';

import styles from './Styles/LoginStyles';

class Register extends Component {
  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      loading: false
    };
    this.isAttempting = false;
  }

  signInAsync = async () => {
    const { name, email, username, password } = this.state;
    // Package together profile object to have ready for POST request
    const postPayload = {
      user: {
        username: username,
        password: password,
        first_name: name,
        last_name: 'Doe',
        email: email
      },
      height: '66',
      weight: '115'
    };
    // POST for new user
    const newUser = await axios.post(`${baseURL}/profiles/`, postPayload);
    // Login with new user once new user is created
    await this.props.login(username, password);
    // Fetch profile of new user once new user is created
    await this.props.fetchProfile(this.props.profileId);
    // Move on to next step (RegisterMeasurements) if everything is good
    if (!this.props.error) {
      await this.props.navigation.navigate('RegisterMeasurements');
    }
  };

  render() {
    const { name, email, username, password, loading } = this.state;
    const editable = !loading;
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly;
    const { navigate, goBack } = this.props.navigation;

    return (
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              ref="name"
              style={textInputStyle}
              value={name}
              editable={editable}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={name => this.setState({ name })}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder="Name*"
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              ref="email"
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder="Email Address*"
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              ref="username"
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={username => this.setState({ username })}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder="Username*"
            />
          </View>

          <View style={styles.formRow}>
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
              onChangeText={password => this.setState({ password })}
              underlineColorAndroid="transparent"
              placeholder="Password*"
            />
          </View>
        </View>

        <View style={styles.loginWrapper}>
          <View style={[styles.loginRow, { alignItems: 'center' }]}>
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
          <TouchableOpacity onPress={() => navigate('Login')}>
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
)(Register);
