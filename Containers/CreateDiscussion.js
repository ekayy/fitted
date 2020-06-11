import React, { useState, Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Button from '../Components/Forms/Button';
import { withFormik } from 'formik';
import { fetchBrands } from '../Redux/BrandsRedux';
import { createGarment } from '../Redux/GarmentsRedux';
import Input from '../Components/Forms/Input';
import Checkbox from '../Components/Forms/Checkbox';
import * as Yup from 'yup';

const CreateGarmentSchema = Yup.object().shape({
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

const Form = (props) => {
  const {
    brands,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const [checked, setChecked] = useState({});

  // const selectItem = item => {
  //   setChecked({ ...checked, [item.id]: !checked[item.id] });
  // };

  const selectItem = (item) => {
    checked.includes(item.id)
      ? setChecked(checked.filter((id) => id !== item.id))
      : setChecked([...checked, item.id]);
  };

  return (
    <StyledForm>
      <StyledFormRow style={{ zIndex: 5 }}>
        <Input
          name="brand"
          data={brands}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Brand (e.g. Supreme)*"
          setFieldValue={setFieldValue}
          value={values.brand}
        />
        <StyledErrorWrapper>
          {errors.brand && touched.brand ? <StyledError>{errors.brand}</StyledError> : null}
        </StyledErrorWrapper>
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 4 }}>
        <Input
          name="type"
          data={types}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Type (e.g. Box Logo)*"
          setFieldValue={setFieldValue}
          value={values.type}
        />
        <StyledErrorWrapper>
          {errors.type && touched.type ? <StyledError>{errors.type}</StyledError> : null}
        </StyledErrorWrapper>
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 3 }}>
        <Input
          name="color"
          data={colors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Color (e.g. Camo)*"
          setFieldValue={setFieldValue}
          value={values.color}
        />
        <StyledErrorWrapper>
          {errors.color && touched.color ? <StyledError>{errors.color}</StyledError> : null}
        </StyledErrorWrapper>
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 2 }}>
        <Input
          name="season"
          data={seasons}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Season (e.g. FW19)*"
          setFieldValue={setFieldValue}
          value={values.season}
        />
        <StyledErrorWrapper>
          {errors.season && touched.season ? <StyledError>{errors.season}</StyledError> : null}
        </StyledErrorWrapper>
      </StyledFormRow>

      {/* <StyledFormRow style={{ zIndex: 1, alignItems: 'center' }}>
        {categories.map(category => (
          <Checkbox
            key={category.name}
            title={category.name}
            checked={checked[category.id]}
            handlePress={() => selectItem(category)}
          />
        ))}
      </StyledFormRow> */}

      <StyledFormRow style={{ zIndex: 0 }}>
        <StyledTextArea
          multiline={true}
          numberOfLines={4}
          placeholder="Discussion (.e.g. True to size?)*"
          onChangeText={handleChange('discussion')}
          onBlur={handleBlur('discussion')}
          value={values.discussion}
          style={errors.discussion}
        />
        <StyledErrorWrapper>
          {errors.discussion && touched.discussion ? (
            <StyledError>{errors.discussion}</StyledError>
          ) : null}
        </StyledErrorWrapper>
      </StyledFormRow>

      <StyledButtonGroup>
        <Button onPress={() => {}} title="Cancel" />

        <Button primary onPress={handleSubmit} title="Submit" />
      </StyledButtonGroup>
    </StyledForm>
  );
};

const CreateDiscussionForm = withFormik({
  mapPropsToValues: () => ({
    brand: '',
    type: '',
    color: '',
    season: '',
    discussion: '',
  }),

  validationSchema: CreateGarmentSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    const { createGarment, navigation } = props;

    const garmentData = await createGarment(values);

    /* TODO create discussion comment */

    navigation.navigate('Garment Detail', garmentData);
  },

  displayName: 'CreateDiscussionForm',
})(Form);

class CreateDiscussion extends Component {
  state = {
    query: '',
    brands: [],
  };

  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {
    const { brands, createGarment, navigation } = this.props;

    return (
      <StyledContainer>
        <KeyboardAvoidingView behavior="position" enabled>
          <StyledIntroduction>
            Have a garment specific question? Or simply want to share a review of your thoughts for
            a specific garment?
          </StyledIntroduction>
          <StyledIntroduction>Get started below!</StyledIntroduction>

          <CreateDiscussionForm
            brands={brands}
            createGarment={createGarment}
            navigation={navigation}
          />
        </KeyboardAvoidingView>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.ScrollView`
  padding: 20px;
  background-color: #f3f3f3;
`;

const StyledIntroduction = styled.Text`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledForm = styled.View`
  margin: 0 20px 20px 20px;
`;

const StyledFormRow = styled.View`
  position: relative;
  z-index: 1;
  margin: 15px 0;
`;

const StyledTextArea = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  height: 150px;
`;

const StyledButtonGroup = styled.View`
  position: relative;
  margin: 10px 0 100px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledError = styled.Text`
  color: red;
`;

const StyledErrorWrapper = styled.View`
  position: absolute;
  bottom: -20px;
  left: 15px;
`;

const mapStateToProps = ({ user, brands }) => {
  return { user, brands: brands.items };
};

export default connect(mapStateToProps, { fetchBrands, createGarment })(CreateDiscussion);
