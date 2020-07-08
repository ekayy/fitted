import React, { createRef, RefObject, useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import Button from '../Components/Forms/Button';
import { Formik } from 'formik';
import { createGarment, clearCreatedGarment } from '../Redux/GarmentsRedux';
import * as Yup from 'yup';
import { CreateDiscussionProps, useTypedSelector, ContentType } from '../types';
import { AutocompleteInput } from '../Components/Forms/AutocompleteInput';
import { MyTextInput } from '../Components/Forms/MyTextInput';
import { fetchBrands } from '../Redux/BrandsRedux';
import { postComment } from '../Redux/CommentsRedux';

export interface CreateDiscussionFields {
  brand: string;
  color: string;
  discussion: string;
  model: string;
  type: string;
}

const createGarmentSchema = Yup.object().shape({
  brand: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  color: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  discussion: Yup.string().min(3, 'Too Short!').max(200, 'Too Long!').required('Required'),
  model: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  type: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

// Mock data
const types = [{ name: 'box logo' }, { name: 'clean' }, { name: 'ugly' }];
const colors = [{ name: 'red' }, { name: 'black' }, { name: 'orange' }];
// const seasons = [{ name: 'fall' }, { name: 'spring' }, { name: 'winter' }, { name: 'summer' }];
// const categories = [
//   { id: 1, name: 'Sizing' },
//   { id: 2, name: 'Care' },
//   { id: 3, name: 'Styling' },
//   { id: 4, name: 'Other' },
// ];

const CreateDiscussion: React.FC<CreateDiscussionProps> = ({ route, navigation }) => {
  // State
  const [discussion, setDiscussion] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Redux state
  const { createdGarment } = useTypedSelector((state) => state.garments);
  const { items: brands } = useTypedSelector((state) => state.brands);
  const { profileId } = useTypedSelector((state) => state.user);
  const { items: comments } = useTypedSelector((state) => state.comments);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    if (createdGarment && discussion.length) {
      const { id: garmentId } = createdGarment;

      (async () => {
        await dispatch(
          postComment({
            contentType: ContentType.GARMENT,
            objectId: garmentId,
            profileId,
            content: discussion,
          }),
        );

        navigation.reset({
          routes: [{ name: 'Create Choice' }],
        });

        navigation.navigate('Search', {
          screen: 'Garment Detail',
          params: { id: garmentId },
        });

        navigation.navigate('Search', {
          screen: 'Comments',
          params: { objectId: garmentId, contentType: ContentType.GARMENT },
        });
      })();
    }
  }, [discussion]);

  useEffect(() => {
    // reset fit redux
    dispatch(clearCreatedGarment());
  }, [comments]);

  // for focusing on next input
  const fieldRef1: RefObject<TextInput> = createRef<TextInput>();
  const fieldRef2: RefObject<TextInput> = createRef<TextInput>();
  const fieldRef3: RefObject<TextInput> = createRef<TextInput>();
  const fieldRef4: RefObject<TextInput> = createRef<TextInput>();

  const initialValues: CreateDiscussionFields = {
    brand: 'John Elliott',
    color: 'Black',
    discussion: 'This is a comment',
    model: 'Model name',
    type: 'Box Logo',
  };

  // TODO: Need to handle new brand case
  const getBrandId = (name: string): number => {
    return brands.filter((brand) => brand['name'] === name).length
      ? brands.filter((brand) => brand['name'] === name)[0]['id']
      : 999;
  };

  return (
    <StyledContainer>
      <KeyboardAvoidingView behavior="position" enabled>
        <StyledIntroduction>
          Have a garment specific question? Or silmply want to share a review of your thoughts for a
          specific garment?
        </StyledIntroduction>
        <StyledIntroduction>Get started below!</StyledIntroduction>

        <Formik
          initialValues={initialValues}
          validationSchema={createGarmentSchema}
          onSubmit={async (values) => {
            const { brand, color, model, discussion } = values;
            const brandId = getBrandId(brand);

            if (brandId === 999) {
              setError('Brand does not exist');
              setTimeout(() => setError(''), 2000);
              return;
            }

            // TODO: Not using redux properly
            await dispatch(createGarment({ brand: brandId, color, model }));

            setDiscussion(discussion);
          }}
        >
          {(props) => {
            const { handleSubmit, values } = props;
            return (
              <>
                <StyledForm>
                  <StyledFormRow style={{ zIndex: 5 }}>
                    <AutocompleteInput
                      {...props}
                      data={brands}
                      name="brand"
                      value={values.brand}
                      placeholder="Brand (e.g. Supreme)*"
                      onSubmitEditing={() => fieldRef1.current && fieldRef1.current.focus()}
                      returnKeyType="next"
                      testID="brand"
                    />
                  </StyledFormRow>

                  <MyTextInput
                    ref={fieldRef1}
                    {...props}
                    name="model"
                    placeholder="Name (e.g. BDU Shirt)*"
                    onSubmitEditing={() => fieldRef2.current && fieldRef2.current.focus()}
                    returnKeyType="next"
                    testID="model"
                  />

                  <StyledFormRow style={{ zIndex: 3 }}>
                    <AutocompleteInput
                      {...props}
                      ref={fieldRef2}
                      data={colors}
                      name="color"
                      value={values.color}
                      placeholder="Color (e.g. Camo)*"
                      onSubmitEditing={() => fieldRef3.current && fieldRef3.current.focus()}
                      returnKeyType="next"
                      testID="color"
                    />
                  </StyledFormRow>
                  <StyledFormRow style={{ zIndex: 2 }}>
                    <AutocompleteInput
                      {...props}
                      ref={fieldRef3}
                      data={types}
                      name="type"
                      value={values.type}
                      placeholder="Type (e.g. Box Logo)*"
                      onSubmitEditing={() => fieldRef4.current && fieldRef4.current.focus()}
                      returnKeyType="next"
                      testID="type"
                    />
                  </StyledFormRow>

                  <MyTextInput
                    {...props}
                    ref={fieldRef4}
                    name="discussion"
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Discussion (.e.g. True to size?)*"
                    testID="discussion"
                  />
                </StyledForm>

                <StyledButtonGroup>
                  <Button onPress={() => navigation.goBack()} title="Cancel" />

                  <Button primary onPress={handleSubmit} title="Submit" testID="submit" />
                </StyledButtonGroup>

                <StyledError>{error}</StyledError>
              </>
            );
          }}
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

const StyledError = styled.Text`
  color: red;
`;

export default CreateDiscussion;
