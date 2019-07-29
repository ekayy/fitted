import React, { Component } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../Config';

// Styles
import styles from './Styles/RegisterMeasurementsStyles';

class RegisterMeasurements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMetric: false,
      feet: null,
      inches: null,
      cm: null,
      weight: null
    };
  }

  toggleUnits = () => {
    this.setState(prevState => ({
      isMetric: !prevState.isMetric
    }));
  };

  // Convert all height to inches and all weight to lbs and return an object ready for PATCH request
  convertMeasurements = (feet, inches, cm, weight) => {
    let convertedHeight = null;
    let convertedWeight = null;
    if (this.state.isMetric) {
      if (cm) {
        convertedHeight = Math.round(parseFloat(cm) / 2.54);
      }
      if (weight) {
        convertedWeight = Math.round(parseFloat(weight) * 2.2046);
      }
    } else {
      if (feet) {
        convertedHeight = parseInt(feet) * 12;
        if (inches) {
          convertedHeight += parseInt(inches);
        }
      }
      if (weight) {
        convertedWeight = parseInt(weight);
      }
    }
    return {
      height: convertedHeight,
      weight: convertedWeight
    };
  };

  registerMeasurements = async () => {
    const { feet, inches, cm, weight } = this.state;
    const { navigate } = this.props.navigation;
    // Package together profile object to have ready for PATCH
    const patchPayload = this.convertMeasurements(feet, inches, cm, weight);
    try {
      const newMeasurements = await axios.patch(
        `${baseURL}/profiles/${this.props.profileId}/`,
        patchPayload
      );
      navigate('App');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    const { isMetric, cm, feet, inches, weight } = this.state;

    return (
      <View style={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>
            Congratulations on your new account!
          </Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>USA</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{
                    true: 'rgb(155,155,155)',
                    false: 'rgb(155,155,155)'
                  }}
                  thumbColor={'rgb(225,225,225)'}
                  onValueChange={this.toggleUnits}
                  value={isMetric}
                />
                <Text style={styles.switchLabel}>Metric</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.rowLabel}>Height</Text>
                {isMetric ? (
                  <TextInput
                    ref="cm"
                    value={cm}
                    onChangeText={cm => this.setState({ cm })}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="cm"
                    keyboardType="numeric"
                  />
                ) : (
                  <View style={styles.imperialRow}>
                    <TextInput
                      ref="feet"
                      value={feet}
                      onChangeText={feet => this.setState({ feet })}
                      style={styles.imperialInput}
                      underlineColorAndroid="transparent"
                      placeholder="ft"
                      keyboardType="numeric"
                    />
                    <TextInput
                      ref="inches"
                      value={inches}
                      onChangeText={inches => this.setState({ inches })}
                      style={styles.imperialInput}
                      underlineColorAndroid="transparent"
                      placeholder="in"
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.rowLabel}>Weight</Text>
                <TextInput
                  ref="weight"
                  value={weight}
                  onChangeText={weight => this.setState({ weight })}
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
              <TouchableOpacity
                style={styles.nextButtonWrapper}
                onPress={this.registerMeasurements}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileId: state.user.profileId
  };
};

export default connect(mapStateToProps)(RegisterMeasurements);
