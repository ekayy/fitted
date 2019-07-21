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
      height: null,
      weight: null
    };
  }

  toggleUnits = () => {
    this.setState(prevState => ({
      isMetric: !prevState.isMetric
    }));
  };

  // Convert all height to inches and all weight to lbs and return an object ready for PATCH request
  convertMeasurements = (height, weight) => {
    let convertedHeight = null;
    let convertedWeight = null;
    if (this.state.isMetric) {
      if (height) {
        convertedHeight = (parseFloat(height) / 2.54).toFixed(2);
      }
      if (weight) {
        convertedWeight = (parseFloat(weight) * 2.2046).toFixed(2);
      }
    } else {
      if (height) {
        convertedHeight = parseFloat(height);
      }
      if (weight) {
        convertedWeight = parseFloat(weight);
      }
    }
    return {
      height: convertedHeight,
      weight: convertedWeight
    };
  };

  registerMeasurements = async () => {
    const { height, weight } = this.state;
    const { navigate } = this.props.navigation;
    // Package together profile object to have ready for PATCH
    const patchPayload = this.convertMeasurements(height, weight);
    console.log(patchPayload);
    try {
      const newMeasurements = await axios.patch(
        `${baseURL}/profiles/${this.props.profileId}/`,
        patchPayload
      );
      //navigate('App');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    const { isMetric, height, weight } = this.state;

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
                  onValueChange={this.toggleUnits}
                  value={isMetric}
                />
                <Text style={styles.switchLabel}>Metric</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.rowLabel}>Height</Text>
                <TextInput
                  ref="height"
                  value={height}
                  onChangeText={height => this.setState({ height })}
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder={isMetric ? '182' : `5' 5"`}
                />
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
                  placeholder={isMetric ? '68' : '150'}
                  keyboardType="number-pad"
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
