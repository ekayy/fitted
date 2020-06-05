import React, { useState, useEffect, createRef } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fbAppId } from '../Config';
import { login, fetchProfile } from '../Redux/UserRedux';
import * as Facebook from 'expo-facebook';

import styles from './Styles/LoginStyles';
import { LoginProps, useTypedSelector } from '../types';

const Login: React.FC<LoginProps> = ({ route, navigation }: LoginProps) => {
  const dispatch = useDispatch();
  const passwordInputRef = createRef<TextInput>();

  const [username, setUsername] = useState<string>('fittedsf');
  const [password, setPassword] = useState<string>('original');

  const { profileId, error, loading } = useTypedSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile(profileId));
  }, [profileId]);

  const loginAsync = async () => {
    await dispatch(login(username, password));
  };

  const loginFb = async () => {
    try {
      await Facebook.initializeAsync(fbAppId);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${await response.data.name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  const renderError = () => {
    return (
      <View>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.form}>
        <View style={styles.formRow}>
          <TextInput
            style={!loading ? styles.textInput : styles.textInputReadonly}
            value={username}
            editable={!loading}
            keyboardType="default"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setUsername(text)}
            underlineColorAndroid="transparent"
            onSubmitEditing={() =>
              passwordInputRef.current !== null && passwordInputRef.current.focus()
            }
            placeholder="Username or Email"
          />
        </View>

        <View style={styles.formRow}>
          <TextInput
            ref={passwordInputRef}
            style={!loading ? styles.textInput : styles.textInputReadonly}
            value={password}
            editable={!loading}
            keyboardType="default"
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            underlineColorAndroid="transparent"
            placeholder="Password"
          />
        </View>
      </View>

      <View style={styles.loginWrapper}>
        <View style={[styles.loginRow, { alignItems: 'center' }]}>
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={loginAsync}>
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>LOGIN</Text>
            </View>

            {error && renderError()}
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.hairline} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.hairline} />
        </View>

        <View style={[styles.loginRow, { alignItems: 'center' }]}>
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={loginFb}>
            <View style={styles.facebookButton}>
              <Text style={styles.loginText}>Log In With Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.loginRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View>
              <Text style={styles.switchText}>
                Don't have an account?
                <Text style={styles.switchText}> Sign Up</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
  // }
};

export default Login;
