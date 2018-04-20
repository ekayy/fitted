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

// const FBSDK = require('react-native-fbsdk')
// const {
//   LoginButton,
//   AccessToken
// } = FBSDK

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  };

  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor(props) {
    super(props);
    this.state = {
      username: 'fittedsf',
      password: 'original',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    this.forceUpdate();
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      this.props.navigation.goBack();
    }
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
      topLogo: { width: 100, height: 70 }
    });
  };

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    });
  };

  handlePressLogin = () => {
    const { username, password } = this.state;
    this.isAttempting = true;
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password);
  };

  handleChangeUsername = text => {
    this.setState({ username: text });
  };

  handleChangePassword = text => {
    this.setState({ password: text });
  };

  async loginFb() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '311869955951444',
      {
        permissions: ['public_profile']
      }
    );
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    }
  }

  render() {
    const { username, password } = this.state;
    const { fetching } = this.props;
    const editable = !fetching;
    const textInputStyle = editable
      ? styles.textInput
      : styles.textInputReadonly;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={Images.logo}
          style={[styles.topLogo, this.state.topLogo]}
        />
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
              onChangeText={this.handleChangeUsername}
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
              onChangeText={this.handleChangePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="Password"
            />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={this.handlePressLogin}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*<View style={[styles.row, { alignItems: 'center' }]}>
          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={(error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  alert(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => alert('logout.')}
          />
        </View>*/}
        <View style={[styles.row, { alignItems: 'center' }]}>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this.loginFb}
          >
            <View
              style={{
                backgroundColor: '#3b5998',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5
              }}
            >
              <Text style={styles.loginText}>Sign In With Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigate('RegisterStack')}>
            <View>
              <Text style={styles.loginText}>
                Don't have an account?
                <Text style={{ color: 'green' }}> Sign Up</Text>
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
