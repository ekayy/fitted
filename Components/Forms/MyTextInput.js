import React from 'react';
import { useField } from 'formik';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../Themes';

export const MyTextInput = React.forwardRef(({ ...props }, ref) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField({ ...props });

  return (
    <StyledFormRow>
      <TextInput ref={ref} {...props} style={{ height: 40, color: Colors.coal, fontSize: 17 }} />

      <StyledErrorWrapper>
        {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}
      </StyledErrorWrapper>
    </StyledFormRow>
  );
});

const StyledFormRow = styled.View`
  padding: 5px 20px;
  border: 0.5px solid rgb(236, 236, 237);
  height: 50.5px;
`;

const StyledError = styled.Text`
  color: red;
`;

const StyledErrorWrapper = styled.View`
  position: absolute;
  bottom: 1px;
  right: 5px;
`;
