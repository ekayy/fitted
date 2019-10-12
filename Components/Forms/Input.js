import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TouchableOpacity, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const Input = props => {
  const [query, setQuery] = useState('');

  const {
    data,
    placeholder,
    name,
    handleBlur,
    handleChange,
    setFieldValue,
    value
  } = props;

  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const findQuery = query => {
    if (query === '') {
      return [];
    }

    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(item => item.name.search(regex) >= 0);
  };

  const renderItem = ({ item, i }) => (
    <TouchableOpacity onPress={() => setFieldValue(name, item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const results = findQuery(value);

  return (
    <Autocomplete
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={styles.containerStyle}
      data={results.length === 1 && comp(value, results[0].name) ? [] : results}
      inputContainerStyle={styles.inputContainerStyle}
      keyExtractor={(item, i) => item.name}
      listContainerStyle={styles.listContainerStyle}
      listStyle={styles.listStyle}
      onBlur={handleBlur(name)}
      onChangeText={handleChange(name)}
      placeholder={placeholder}
      renderItem={renderItem}
      value={value}
    />
  );
};

const styles = {
  containerStyle: {},
  inputContainerStyle: {
    borderWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  listContainerStyle: {},
  listStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0
  }
};

export default Input;
