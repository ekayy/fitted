import React from 'react';
import styled from 'styled-components/native';
import { MyTextInput } from './Forms/MyTextInput';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../Redux/UserRedux';
import * as Yup from 'yup';
import { useTypedSelector } from '../types';

const initialValues: { email: string } = {
  email: '',
};

const changeEmailValidationSchema = Yup.object({
  email: Yup.string()
    .email()
    .label('Email')
    .min(3, 'Too Short!')
    .max(35, 'Must be 35 characters or less')
    .required('Required'),
});

const ChangeEmail = () => {
  const dispatch = useDispatch();

  // Redux state
  const { profileId, error, loading } = useTypedSelector((state) => state.user);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changeEmailValidationSchema}
      onSubmit={({ email }) => {
        dispatch(updateProfile(profileId, { email }));
        // setTimeout(() => dispatch(loginClearError()), 2000);
      }}
    >
      {(props) => {
        const { handleSubmit, values } = props;
        return (
          <>
            <StyledForm>
              <MyTextInput
                {...props}
                name="email"
                value={values.email}
                editable={!loading}
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                placeholder="Email"
              />

              <StyledButtonContainer>
                <StyledLoginButton onPress={handleSubmit as any}>
                  <StyledLoginButtonText>Update Email Address</StyledLoginButtonText>
                </StyledLoginButton>

                {error && <StyledError>{error}</StyledError>}
              </StyledButtonContainer>
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
};

const StyledForm = styled.View`
  margin: 10px auto;
  border-radius: 5px;
  width: 315px;
`;

const StyledButtonContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const StyledLoginButton = styled.TouchableOpacity`
  height: 44px;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: rgb(141, 141, 141);
  width: 315px;
`;

const StyledLoginButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 17px;
`;

const StyledError = styled.Text`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export default ChangeEmail;
