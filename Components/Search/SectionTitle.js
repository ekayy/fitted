import React, { Component } from 'react';
import styled from 'styled-components/native';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';
import { Divider } from 'react-native-elements';

const SectionTitle = props => {
  return <SectionText>{props.text}</SectionText>;
};

const SectionText = styled.Text`
  text-transform: uppercase;
  color: #909090;
  padding: 10px 10px 5px 10px;
`;

export default SectionTitle;
