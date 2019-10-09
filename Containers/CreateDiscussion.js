import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import AppStyles from '../Themes/AppStyles';
import { Formik, ErrorMessage } from 'formik';
import { fetchBrands } from '../Redux/BrandsRedux';
import { createGarment } from '../Redux/GarmentsRedux';

class CreateDiscussion extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
  }

  onSubmit = values => {
    this.props.createGarment(values);

    // this.props.navigation.navigate('TagGarments', response);
  };

  render() {
    const { brands } = this.props;

    return (
      <StyledContainer>
        <StyledIntroduction>
          Have a garment specific question? Or simply want to share a review of
          your thoughts for a specific garment?
        </StyledIntroduction>
        <Text>Get started below!</Text>

        <Formik
          initialValues={{ brand: '', model: '', color: '', size: '' }}
          onSubmit={values => this.onSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={AppStyles.form}>
              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="Brand (e.g. Supreme)"
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  value={values.brand}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="Type (e.g. Box Logo)"
                  onChangeText={handleChange('type')}
                  onBlur={handleBlur('type')}
                  value={values.type}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="Color (e.g. Camo)"
                  onChangeText={handleChange('color')}
                  onBlur={handleBlur('color')}
                  value={values.color}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  style={AppStyles.textInput}
                  placeholder="Season (e.g. FW19)"
                  onChangeText={handleChange('season')}
                  onBlur={handleBlur('season')}
                  value={values.season}
                />
              </View>

              <View style={AppStyles.formRow}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={AppStyles.textInput}
                  placeholder="Discussion"
                  onChangeText={handleChange('discussion')}
                  onBlur={handleBlur('discussion')}
                  value={values.discussion}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <Button
                  onPress={() => {}}
                  title="Cancel"
                  buttonStyle={[AppStyles.buttonDefaultStyle]}
                  titleStyle={AppStyles.buttonDefaultTitleStyle}
                />

                <Button
                  onPress={handleSubmit}
                  title="Submit"
                  buttonStyle={[AppStyles.buttonDefaultStyle]}
                  titleStyle={AppStyles.buttonDefaultTitleStyle}
                />
              </View>
            </View>
          )}
        </Formik>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f3f3f3;
  align-items: center;
`;

const StyledIntroduction = styled.Text`
  text-align: center;
  margin-bottom: 10px;
`;

const mapStateToProps = ({ user, brands }) => {
  return { user, brands: brands.items };
};

export default connect(
  mapStateToProps,
  { fetchBrands, createGarment }
)(CreateDiscussion);
