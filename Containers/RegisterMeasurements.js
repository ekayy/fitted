import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Picker,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';

// Styles
import styles from './Styles/RegisterMeasurementsStyles';

class RegisterMeasurements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMetric: false
    };
  }

  toggleUnits = () => {
    this.setState(prevState => ({
      isMetric: !prevState.isMetric
    }));
  };

  handleLogin = () => {
    const { navigate } = this.props.navigation;

    // navigate('App')
  };

  render() {
    const { goBack } = this.props.navigation;
    const { isMetric } = this.state;

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
                  onTintColor="white"
                  onValueChange={this.toggleUnits}
                  value={isMetric}
                />
                <Text style={styles.switchLabel}>Metric</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.rowLabel}>Height*</Text>
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="5' 5''"
                />
              </View>
            </View>
            <View style={styles.spacer} />
            <View style={styles.row}>
              <View style={styles.rowInput}>
                <Text style={styles.rowLabel}>Weight*</Text>
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="130"
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={[styles.buttonRow, { alignItems: 'center' }]}>
              <TouchableOpacity
                style={styles.nextButtonWrapper}
                onPress={this.handleLogin}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/*}<View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>*/}
        </View>
      </View>
    );
  }
}

export default RegisterMeasurements;
