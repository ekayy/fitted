import React from 'react';
import styled from 'styled-components/native';

const Button = (props) => {
  const { title, onPress, primary } = props;

  return (
    <StyledTouchableOpacity {...props} primary={primary} onPress={onPress}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: ${(props) => (props.primary ? '#6fa6e8' : '#da4f34')};
  border: 1px solid ${(props) => (props.primary ? '#6fa6e8' : '#da4f34')};
  padding: 10px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  color: #fff;
`;

export default Button;
