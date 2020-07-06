import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './Styles/LoginStyles';
import { fbAppId } from '../Config';
import { connect } from 'react-redux';
import { login, fetchProfile, logout } from '../Redux/UserRedux';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.isAttempting = false;
  }

  componentDidMount() {
    this.props.logout();
  }

  loginFb = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(fbAppId, {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

      this.props.navigation.navigate('App');
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.landingContainer}>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>Sign up to start sharing your</Text>
            <Text style={styles.welcomeSubtitle}>Outfits of The Day!</Text>
          </View>
        </View>
        <View style={styles.loginWrapper}>
          <View style={[styles.loginRow, { alignItems: 'center' }]}>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.loginFb}>
              <View style={styles.facebookButton}>
                <Text style={styles.loginText}>Log In With Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.hairline} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.hairline} />
          </View>

          <View style={[styles.loginRow, { alignItems: 'center' }]}>
            <TouchableOpacity
              style={styles.loginButtonWrapper}
              onPress={() => navigate('Register')}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign Up With Email</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={[styles.bottomTextContainer, styles.policy]}>
            <Text style={[styles.switchText, styles.bottomText]}>
              By signing up, you agree to our Terms & Privacy Policy
            </Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <TouchableWithoutFeedback onPress={() => navigate('Login')}>
              <View>
                <Text style={[styles.switchText, styles.bottomText]}>
                  Already have an account?
                  <Text style={styles.highlightBlue}> Sign In</Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    loading: state.user.loading,
    profileId: state.user.profileId,
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps, { login, fetchProfile, logout })(Landing);
