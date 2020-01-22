import React from 'react';
import styled from 'styled-components';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';

const DropDown = props => {
  const { options, defaultValue, onSelect } = props;

  return (
    <ModalDropdown
      options={options}
      defaultValue={defaultValue}
      style={styles.dropdownButtonStyle}
      textStyle={styles.textStyle}
      dropdownStyle={styles.dropdownStyle}
      dropdownTextStyle={styles.dropdownTextStyle}
      dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
      onSelect={onSelect}
    >
      {/* <StyledDropdownButtonContainer>
        <DropdownButtonText>{defaultValue}</DropdownButtonText>
        <Ionicons name="ios-arrow-down" size={25} color="#fff" style={{ marginLeft: 60 }} />
      </StyledDropdownButtonContainer> */}
    </ModalDropdown>
  );
};

const DropdownButtonText = styled.Text`
  color: #fff;
`;
const StyledDropdownButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 144px;
  min-height: 28px;
  padding: 6px;
  background-color: #000;
`;

const styles = {
  dropdownButtonStyle: {
    backgroundColor: '#000',
    // borderRadius: 4,
    color: '#fff',
    width: 120
  },
  dropdownStyle: {
    height: 56,
    width: 120
  },
  textStyle: {
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14
  },
  dropdownTextStyle: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  dropdownTextHighlightStyle: {
    color: '#fff'
  }
};

export default DropDown;
