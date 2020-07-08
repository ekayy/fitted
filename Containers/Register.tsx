import React, { useRef, createRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchProfile, loginClearError, register, login } from '../Redux/UserRedux';
import styles from './Styles/LoginStyles';
import { RegisterProps, useTypedSelector } from '../types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../Components/Forms/MyTextInput';

interface RegisterFormValues {
  firstName: string;
  email: string;
  username: string;
  password: string;
}

const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(35, 'Must be 35 characters or less')
    .required('Required'),
  email: Yup.string()
    .email()
    .min(3, 'Too Short!')
    .max(35, 'Must be 35 characters or less')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(35, 'Must be 35 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(35, 'Must be 35 characters or less')
    .required('Required'),
});

const Register: React.FC<RegisterProps> = ({ route, navigation }: RegisterProps) => {
  const dispatch = useDispatch();

  // for focusing on next input
  const emailInputRef = createRef<TextInput>();
  const usernameInputRef = createRef<TextInput>();
  const passwordInputRef = createRef<TextInput>();

  // Load UserRedux
  const { profileId, registerError, loading } = useTypedSelector((state) => state.user);

  const initialValues: RegisterFormValues = {
    firstName: 'asdfasdf',
    email: 'asdfasdf@mail.com',
    username: 'asdfasdf',
    password: 'asdfasdf',
  };

  // for preventing hook running on initial load
  const initialRender = useRef(true);

  // fetch profile if successful login
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const profile = profileId && dispatch(fetchProfile(profileId));

      // Move on to next step (RegisterMeasurements) if everything is good
      profile && navigation.navigate('Register Measurements');
    }
  }, [profileId]);

  const signup = async ({ firstName, email, username, password }: RegisterFormValues) => {
    try {
      // POST for new user
      await dispatch(register({ username, password, firstName, email }));

      // Login
      await dispatch(login(username, password));

      setTimeout(() => dispatch(loginClearError()), 2000);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => signup(values)}
      >
        {(props) => {
          const { handleSubmit, values } = props;
          return (
            <>
              <View style={styles.form}>
                <MyTextInput
                  {...props}
                  name="firstName"
                  style={!loading ? styles.textInput : styles.textInputReadonly}
                  value={values.firstName}
                  editable={!loading}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() =>
                    emailInputRef.current !== null && emailInputRef.current.focus()
                  }
                  placeholder="First Name"
                />

                <MyTextInput
                  {...props}
                  name="email"
                  ref={emailInputRef}
                  style={!loading ? styles.textInput : styles.textInputReadonly}
                  value={values.email}
                  editable={!loading}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() =>
                    usernameInputRef.current !== null && usernameInputRef.current.focus()
                  }
                  placeholder="Email Address"
                />

                <MyTextInput
                  {...props}
                  name="username"
                  ref={usernameInputRef}
                  style={!loading ? styles.textInput : styles.textInputReadonly}
                  value={values.username}
                  editable={!loading}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() =>
                    passwordInputRef.current !== null && passwordInputRef.current.focus()
                  }
                  placeholder="Username"
                />

                <MyTextInput
                  {...props}
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
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                />
              </View>

              <View>
                <View style={[styles.loginRow, { alignItems: 'center' }]}>
                  <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSubmit as any}>
                    <View style={styles.loginButton}>
                      <Text style={styles.loginText}>Sign Up</Text>
                    </View>

                    {registerError &&
                      registerError.map((err, index) => (
                        <Text key={index} style={styles.error}>
                          {registerError[index * 2 + 1]}
                        </Text>
                      ))}
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View>
                    <Text style={styles.switchText}>
                      Already have an account?
                      <Text style={styles.switchText}> Sign In</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default Register;
