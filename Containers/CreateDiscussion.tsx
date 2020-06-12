import React, { createRef } from 'react';
import { KeyboardAvoidingView, View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import Button from '../Components/Forms/Button';
import { Formik } from 'formik';
// import { fetchBrands } from '../Redux/BrandsRedux';
import { createGarment } from '../Redux/GarmentsRedux';
// import Checkbox from '../Components/Forms/Checkbox';
import * as Yup from 'yup';
import { CreateDiscussionProps, useTypedSelector } from '../types';
import { AutocompleteInput } from '../Components/Forms/AutocompleteInput';
import { MyTextInput } from '../Components/Forms/MyTextInput';

export interface CreateDiscussionFields {
  brand: string;
  type: string;
  color: string;
  season: string;
  discussion: string;
}

const createGarmentSchema = Yup.object().shape({
  brand: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  type: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  color: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  season: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  discussion: Yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
});

// Mock data
const types = [{ name: 'box logo' }, { name: 'clean' }, { name: 'ugly' }];
const colors = [{ name: 'red' }, { name: 'black' }, { name: 'orange' }];
const seasons = [{ name: 'fall' }, { name: 'spring' }, { name: 'winter' }, { name: 'summer' }];
const categories = [
  { id: 1, name: 'Sizing' },
  { id: 2, name: 'Care' },
  { id: 3, name: 'Styling' },
  { id: 4, name: 'Other' },
];

const CreateDiscussion: React.FC<CreateDiscussionProps> = ({ route, navigation }) => {
  // Redux state
  const { items: brands } = useTypedSelector((state) => state.brands);

  const dispatch = useDispatch();

  // for focusing on next input
  const fieldRef1 = createRef<TextInput>();
  const fieldRef2 = createRef<TextInput>();
  const fieldRef3 = createRef<TextInput>();
  const fieldRef4 = createRef<TextInput>();

  const initialValues: CreateDiscussionFields = {
    brand: '',
    type: '',
    color: '',
    season: '',
    discussion: '',
  };

  return (
    <StyledContainer>
      <KeyboardAvoidingView behavior="position" enabled>
        <StyledIntroduction>
          Have a garment specific question? Or simply want to share a review of your thoughts for a
          specific garment?
        </StyledIntroduction>
        <StyledIntroduction>Get started below!</StyledIntroduction>

        <Formik
          initialValues={initialValues}
          validationSchema={createGarmentSchema}
          onSubmit={async (values) => {
            const garmentData = await dispatch(createGarment(values));

            //     /* TODO create discussion comment */

            navigation.navigate('Garment Detail', garmentData);
          }}
        >
          {(props) => (
            <>
              <StyledForm>
                <StyledFormRow style={{ zIndex: 5 }}>
                  <AutocompleteInput
                    {...props}
                    data={brands}
                    name="brand"
                    placeholder="Brand (e.g. Supreme)*"
                    onSubmitEditing={() => fieldRef1.current !== null && fieldRef1.current.focus()}
                    returnKeyType="next"
                  />
                </StyledFormRow>
                <StyledFormRow style={{ zIndex: 4 }}>
                  <AutocompleteInput
                    ref={fieldRef1}
                    {...props}
                    data={types}
                    name="type"
                    placeholder="Type (e.g. Box Logo)*"
                    onSubmitEditing={() => fieldRef2.current !== null && fieldRef2.current.focus()}
                    returnKeyType="next"
                  />
                </StyledFormRow>
                <StyledFormRow style={{ zIndex: 3 }}>
                  <AutocompleteInput
                    {...props}
                    ref={fieldRef2}
                    data={colors}
                    name="color"
                    placeholder="Color (e.g. Camo)*"
                    onSubmitEditing={() => fieldRef3.current !== null && fieldRef3.current.focus()}
                    returnKeyType="next"
                  />
                </StyledFormRow>
                <StyledFormRow style={{ zIndex: 2 }}>
                  <AutocompleteInput
                    {...props}
                    ref={fieldRef3}
                    data={seasons}
                    name="season"
                    placeholder="Type (e.g. Box Logo)*"
                    onSubmitEditing={() => fieldRef4.current !== null && fieldRef4.current.focus()}
                    returnKeyType="next"
                  />
                </StyledFormRow>

                <MyTextInput
                  {...props}
                  ref={fieldRef4}
                  name="discussion"
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Discussion (.e.g. True to size?)*"
                />
              </StyledForm>

              <StyledButtonGroup>
                <Button onPress={() => {}} title="Cancel" />

                <Button primary onPress={props.handleSubmit} title="Submit" />
              </StyledButtonGroup>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </StyledContainer>
  );
};

const StyledForm = styled.View`
  border-radius: 5px;
  margin: 0 20px 20px 20px;
`;

const StyledContainer = styled.View`
  padding: 20px;
  background-color: #f3f3f3;
`;

const StyledIntroduction = styled.Text`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledFormRow = styled.View`
  position: relative;
  z-index: 1;
  margin: 10px 0;
`;

const StyledButtonGroup = styled.View`
  /* position: relative; */
  margin: 10px 20px 100px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

export default CreateDiscussion;
