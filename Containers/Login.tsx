import React, { useEffect, createRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fbAppId } from '../Config';
import { login, fetchProfile, loginClearError } from '../Redux/UserRedux';
import * as Facebook from 'expo-facebook';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MyTextInput } from '../Components/Forms/MyTextInput';

import styles from './Styles/LoginStyles';
import { LoginProps, useTypedSelector } from '../types';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ route, navigation }: LoginProps) => {
  const dispatch = useDispatch();
  const passwordInputRef = createRef<MyTextInput>();

  const { profileId, error, loading, isLoggedIn } = useTypedSelector((state) => state.user);

  const initialValues: LoginFormValues = {
    username: 'fittedsf',
    password: 'original',
  };

  // fetch profile if successful login
  useEffect(() => {
    dispatch(fetchProfile(profileId));
  }, [isLoggedIn]);

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

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, 'Too Short!')
            .max(35, 'Must be 35 characters or less')
            .required('Required'),
          password: Yup.string()
            .min(3, 'Too Short!')
            .max(35, 'Must be 35 characters or less')
            .required('Required'),
        })}
        onSubmit={(values) => {
          dispatch(login(values.username, values.password));
          setTimeout(() => dispatch(loginClearError()), 2000);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={styles.form}>
              <MyTextInput
                name="username"
                style={!loading ? styles.textInput : styles.textInputReadonly}
                value={values.username}
                editable={!loading}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                underlineColorAndroid="transparent"
                onSubmitEditing={() =>
                  passwordInputRef.current !== null && passwordInputRef.current.focus()
                }
                placeholder="Username or Email"
              />

              <MyTextInput
                name="password"
                ref={passwordInputRef}
                style={!loading ? styles.textInput : styles.textInputReadonly}
                value={values.password}
                editable={!loading}
                keyboardType="default"
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                underlineColorAndroid="transparent"
                placeholder="Password"
              />
            </View>

            <View style={styles.loginWrapper}>
              <View style={[styles.loginRow, { alignItems: 'center' }]}>
                <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSubmit as any}>
                  <View style={styles.loginButton}>
                    <Text style={styles.loginText}>LOGIN</Text>
                  </View>

                  {error && <Text style={styles.error}>{error}</Text>}
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
          </>
        )}
      </Formik>
    </ScrollView>
  );
  // }
};

export default Login;
