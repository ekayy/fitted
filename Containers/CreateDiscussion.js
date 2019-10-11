import React, { useState, Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../Components/Forms/Button';
import { withFormik } from 'formik';
import { fetchBrands } from '../Redux/BrandsRedux';
import { createGarment } from '../Redux/GarmentsRedux';
import Input from '../Components/Forms/Input';
import Checkbox from '../Components/Forms/Checkbox';

// Mock data
const types = [{ name: 'box logo' }, { name: 'clean' }, { name: 'ugly' }];
const colors = [{ name: 'red' }, { name: 'black' }, { name: 'orange' }];
const seasons = [
  { name: 'fall' },
  { name: 'spring' },
  { name: 'winter' },
  { name: 'summer' }
];
const categories = [
  { id: 1, name: 'Sizing' },
  { id: 2, name: 'Care' },
  { id: 3, name: 'Styling' },
  { id: 4, name: 'Other' }
];

const Form = props => {
  const {
    brands,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;

  const [checked, setChecked] = useState({});

  const selectItem = item => {
    setChecked({ ...checked, [item.id]: !checked[item.id] });
  };

  return (
    <StyledForm>
      <StyledFormRow style={{ zIndex: 5 }}>
        <Input
          name="brand"
          data={brands}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Brand (e.g. Supreme)"
          setFieldValue={setFieldValue}
          value={values.brand}
        />
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 4 }}>
        <Input
          name="type"
          data={types}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Type (e.g. Box Logo)"
          setFieldValue={setFieldValue}
          value={values.type}
        />
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 3 }}>
        <Input
          name="color"
          data={colors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Color (e.g. Camo)"
          setFieldValue={setFieldValue}
          value={values.color}
        />
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 2 }}>
        <Input
          name="season"
          data={seasons}
          handleBlur={handleBlur}
          handleChange={handleChange}
          placeholder="Season (e.g. FW19)"
          setFieldValue={setFieldValue}
          value={values.season}
        />
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 1, alignItems: 'center' }}>
        {categories.map(category => (
          <Checkbox
            key={category.name}
            title={category.name}
            checked={checked[category.id]}
            handlePress={() => selectItem(category)}
          />
        ))}
      </StyledFormRow>

      <StyledFormRow style={{ zIndex: 0 }}>
        <StyledTextArea
          multiline={true}
          numberOfLines={4}
          placeholder="Discussion"
          onChangeText={handleChange('discussion')}
          onBlur={handleBlur('discussion')}
          value={values.discussion}
        />
      </StyledFormRow>

      <StyledButtonGroup>
        <Button onPress={() => {}} title="Cancel" />

        <Button primary onPress={handleSubmit} title="Submit" />
      </StyledButtonGroup>
    </StyledForm>
  );
};

const CreateDiscussionForm = withFormik({
  mapPropsToValues: () => ({ brand: '', type: '', color: '', season: '' }),

  handleSubmit: (values, { setSubmitting }) => console.tron.log(values),

  displayName: 'CreateDiscussionForm'
})(Form);

class CreateDiscussion extends Component {
  state = {
    query: '',
    brands: []
  };

  componentDidMount() {
    this.props.fetchBrands();
  }

  // onSubmit = values => {
  //   this.props.createGarment(values);

  //   // this.props.navigation.navigate('TagGarments', response);
  // };

  render() {
    const { brands } = this.props;

    return (
      <StyledContainer>
        <StyledIntroduction>
          Have a garment specific question? Or simply want to share a review of
          your thoughts for a specific garment?
        </StyledIntroduction>
        <StyledIntroduction>Get started below!</StyledIntroduction>

        <CreateDiscussionForm brands={brands} />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f3f3f3;
  margin-bottom: 20px;
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
  margin: 10px 0;
`;

const StyledTextArea = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  height: 150px;
`;

const StyledButtonGroup = styled.View`
  position: relative;
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const mapStateToProps = ({ user, brands }) => {
  return { user, brands: brands.items };
};

export default connect(
  mapStateToProps,
  { fetchBrands, createGarment }
)(CreateDiscussion);
