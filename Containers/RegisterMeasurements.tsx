import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { baseURL } from '../Config';
import { setIsLoggedIn } from '../Redux/UserRedux';
import { useDispatch } from 'react-redux';
import { RegisterMeasurementsProps, useTypedSelector } from '../types';
import { Formik } from 'formik';
import styles from './Styles/RegisterMeasurementsStyles';
import * as Yup from 'yup';
import { MyTextInput } from '../Components/Forms/MyTextInput';

interface RegisterMeasurementsFormValues {
  cm: string;
  feet: string;
  inches: string;
  weight: string;
}

const registerMeasurementsValidationSchema = Yup.object({
  cm: Yup.number(),
  feet: Yup.number(),
  inches: Yup.number(),
  weight: Yup.number().required('Required'),
});

const RegisterMeasurements: React.FC<RegisterMeasurementsProps> = ({
  route,
  navigation,
}: RegisterMeasurementsProps) => {
  const dispatch = useDispatch();

  // Load UserRedux
  const { profileId } = useTypedSelector((state) => state.user);

  // State
  const [isMetric, setIsMetric] = useState<boolean>(false);

  const initialValues: RegisterMeasurementsFormValues = {
    cm: '',
    feet: '',
    inches: '',
    weight: '',
  };

  const toggleUnits = () => {
    setIsMetric(!isMetric);
  };

  // Convert all height to inches and all weight to lbs and return an object ready for PATCH request
  const convertMeasurements = (feet, inches, cm, weight) => {
    let convertedHeight;
    let convertedWeight;
    if (isMetric) {
      if (cm) convertedHeight = Math.round(parseFloat(cm) / 2.54);
      if (weight) convertedWeight = Math.round(parseFloat(weight) * 2.2046);
    } else {
      if (feet) {
        convertedHeight = parseInt(feet) * 12;
        if (inches) convertedHeight += parseInt(inches);
      }

      if (weight) convertedWeight = parseInt(weight);
    }

    return {
      height: convertedHeight,
      weight: convertedWeight,
    };
  };

  const registerMeasurements = async ({ feet, inches, cm, weight }) => {
    // Package together profile object to have ready for PATCH
    const patchPayload = convertMeasurements(feet, inches, cm, weight);
    try {
      // new measurements POST
      await axios.patch(`${baseURL}/profiles/${profileId}/`, patchPayload);

      dispatch(setIsLoggedIn());
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerMeasurementsValidationSchema}
        onSubmit={(values) => registerMeasurements(values)}
      >
        {(props) => {
          const { handleSubmit, values } = props;
          return (
            <>
              <View style={styles.formContainer}>
                <Text style={styles.headerText}>Congratulations on your new account!</Text>
                <View style={styles.form}>
                  <View style={styles.row}>
                    <View style={styles.switchContainer}>
                      <Text style={styles.switchLabel}>USA</Text>
                      <Switch
                        style={styles.switch}
                        trackColor={{
                          true: 'rgb(155,155,155)',
                          false: 'rgb(155,155,155)',
                        }}
                        thumbColor={'rgb(225,225,225)'}
                        onValueChange={toggleUnits}
                        value={isMetric}
                      />
                      <Text style={styles.switchLabel}>Metric</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.rowInput}>
                      <Text style={styles.rowLabel}>Height</Text>
                      {isMetric ? (
                        <MyTextInput
                          {...props}
                          name="cm"
                          value={values.cm}
                          style={styles.textInput}
                          underlineColorAndroid="transparent"
                          placeholder="cm"
                          keyboardType="numeric"
                        />
                      ) : (
                        <View style={styles.imperialRow}>
                          <MyTextInput
                            {...props}
                            name="feet"
                            value={values.feet}
                            style={styles.imperialInput}
                            underlineColorAndroid="transparent"
                            placeholder="ft"
                            keyboardType="numeric"
                          />
                          <MyTextInput
                            {...props}
                            name="inches"
                            value={values.inches}
                            style={styles.imperialInput}
                            underlineColorAndroid="transparent"
                            placeholder="in"
                            keyboardType="numeric"
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.rowInput}>
                      <Text style={styles.rowLabel}>Weight</Text>
                      <MyTextInput
                        {...props}
                        name="weight"
                        value={values.weight}
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        placeholder={isMetric ? 'kg' : 'lbs'}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.buttonWrapper}>
                  <View style={[styles.buttonRow, { alignItems: 'center' }]}>
                    <TouchableOpacity onPress={handleSubmit as any}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default RegisterMeasurements;
