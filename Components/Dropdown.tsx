import React from 'react';
import styled from 'styled-components/native';
import ModalDropdown from './ModalDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Keyboard } from 'react-native';

interface Props {
  options: string[];
  value: string;
  defaultValue: string;
  onSelect(index: string, option: string): void;
}

const Dropdown: React.FC<Props> = ({ options, value, defaultValue, onSelect }) => {
  return (
    <ModalDropdown
      dropdownTextHighlightStyle={styles.dropdownTextHighlight}
      dropdownStyle={styles.dropdown}
      dropdownTextStyle={styles.dropdownText}
      onSelect={onSelect}
      options={options}
      style={styles.dropdownButton}
      onDropdownWillShow={Keyboard.dismiss}
    >
      <StyledDropdownButtonContainer>
        <DropdownButtonText>{value ? value : defaultValue}</DropdownButtonText>
        <Ionicons name="ios-arrow-down" size={25} color="#000" />
      </StyledDropdownButtonContainer>
    </ModalDropdown>
  );
};

const DropdownButtonText = styled.Text`
  color: #000;
`;
const StyledDropdownButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  padding: 6px 12px;
`;

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: '#f3f3f3',
  },
  dropdown: {
    height: 'auto',
  },
  dropdownText: {
    backgroundColor: '#f3f3f3',
    fontSize: 14,
    color: '#000',
    width: 160,
    paddingHorizontal: 12,
  },
  dropdownTextHighlight: {
    backgroundColor: '#f3f3f3',
    color: '#000',
  },
});

export default Dropdown;
