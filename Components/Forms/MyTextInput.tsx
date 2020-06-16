import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components/native';
import { CSSProperties } from 'styled-components';
import { TextInput } from 'react-native';

interface Props {
  style?: CSSProperties;
  name: string;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
  handleChange(name: string): any;
  handleBlur(name: string): any;
  [key: string]: any;
}

export const MyTextInput = React.forwardRef(({ ...props }: Props, ref: React.Ref<TextInput>) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [, meta] = useField({ ...props });
  const { name, style, handleChange, handleBlur, values } = props;

  return (
    <StyledFormRow>
      <StyledTextInput
        style={style}
        ref={ref}
        {...props}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
      />

      <StyledErrorWrapper>
        {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}
      </StyledErrorWrapper>
    </StyledFormRow>
  );
});

const StyledTextInput = styled.TextInput`
  height: 42px;
  overflow: hidden;x
`;

const StyledFormRow = styled.View`
  overflow: hidden;
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
