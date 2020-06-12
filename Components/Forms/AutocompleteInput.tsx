import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useField } from 'formik';
import { CreateDiscussionFields } from '../../Containers/CreateDiscussion';

interface AutocompleteData {
  name: string;
  id?: number;
}

interface Props {
  name: string;
  placeholder?: string;
  data: AutocompleteData[];
  values: CreateDiscussionFields;
  setFieldValue(name: string, item: string): any;
  handleChange(name: string): any;
  handleBlur(name: string): any;
}

export const AutocompleteInput = React.forwardRef(
  ({ ...props }: Props, ref: React.Ref<TextInput>) => {
    const [field, meta] = useField({ ...props });
    const { handleChange, handleBlur, setFieldValue, values, data, placeholder, name } = props;

    // State
    const [results, setResults] = useState<AutocompleteData[]>([]);

    // Effects
    useEffect(() => {
      setResults(findQuery(values[name]));
    }, [values]);

    // comparison function
    const comp = (a, b): boolean => a.toLowerCase().trim() === b.toLowerCase().trim();

    // filter through values in autocomplete data array
    const findQuery = (query: string): AutocompleteData[] =>
      query === '' ? [] : data.filter((item) => item.name.search(escape(query.trim())) >= 0);

    // render autocomplete item
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => setFieldValue(name, item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );

    // render own TextInput because ref is not propagated
    const renderInput = (props) => <TextInput {...props} ref={ref} />;

    return (
      <>
        <Autocomplete
          {...props}
          {...field}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.containerStyle}
          data={results.length === 1 && comp(values[name], results[0].name) ? [] : results}
          inputContainerStyle={styles.inputContainerStyle}
          keyExtractor={(item, i) => item['name']}
          listContainerStyle={styles.listContainerStyle}
          listStyle={styles.listStyle}
          onBlur={handleBlur(name)}
          onChangeText={handleChange(name)}
          placeholder={placeholder}
          renderItem={renderItem}
          renderTextInput={renderInput}
        />

        <StyledErrorWrapper>
          {meta.touched && meta.error && <StyledError>{meta.error}</StyledError>}
        </StyledErrorWrapper>
      </>
    );
  },
);

const styles = {
  containerStyle: {},
  inputContainerStyle: {
    borderWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  listContainerStyle: {},
  listStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0,
  },
};

const StyledErrorWrapper = styled.View`
  position: absolute;
  bottom: -20px;
  left: 15px;
`;

const StyledError = styled.Text`
  color: red;
`;
