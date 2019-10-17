import React from 'react';
import styled from 'styled-components';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';

const DropDown = props => {
  const { options, defaultValue } = props;

  return (
    <ModalDropdown
      options={options}
      style={styles.dropdownButton}
      dropdownStyle={styles.dropdown}
      dropdownTextStyle={styles.dropdownText}
      dropdownTextHighlightStyle={styles.dropdownTextHighlight}
      // onSelect={(idx, value) => }
    >
      <StyledDropdownButtonContainer>
        <DropdownButtonText>{defaultValue}</DropdownButtonText>
        <Ionicons
          name="ios-arrow-down"
          size={25}
          color="#fff"
          style={{ marginLeft: 60 }}
        />
      </StyledDropdownButtonContainer>
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
`;

const styles = {
  dropdownButton: {
    backgroundColor: '#000',
    borderRadius: 4
  },
  dropdown: {
    height: 'auto'
  },
  dropdownText: {
    backgroundColor: '#000',
    fontSize: 14,
    color: '#fff',
    minWidth: 144,
    minHeight: 28,
    paddingVertical: 6,
    alignItems: 'center'
  },
  dropdownTextHighlight: {
    color: '#fff'
  }
};

export default DropDown;
