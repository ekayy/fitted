import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

interface Props {
  name: string;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
  handleChange(name: string): any;
  handleBlur(name: string): any;
}

export const MyTextInput = React.forwardRef(({ ...props }: Props, ref: React.Ref<TextInput>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField({ ...props });
  const { name, multiline, handleChange, handleBlur } = props;

  return (
    <StyledFormRow style={multiline && { height: 100 }}>
      <StyledTextInput
        ref={ref}
        {...field}
        {...props}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
      />

      <StyledErrorWrapper>
        {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}
      </StyledErrorWrapper>
    </StyledFormRow>
  );
});

const StyledTextInput = styled.TextInput``;

const StyledFormRow = styled.View`
  background-color: #fff;
  padding: 5px 20px;
  border: 0.5px solid rgb(236, 236, 237);
  height: 50.5px;
  position: relative;
  z-index: 1;
  margin: 10px 0;
`;

const StyledError = styled.Text`
  color: red;
`;

const StyledErrorWrapper = styled.View`
  position: absolute;
  bottom: 1px;
  right: 5px;
`;
