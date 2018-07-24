import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Picker,
  TouchableOpacity
} from 'react-native';

// Styles
import styles from './Styles/RegisterMeasurementsStyles';

class RegisterMeasurements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: '5'
    };
  }
  render() {
    const { goBack, navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Congrats!</Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Units</Text>
              <View style={styles.rowInput}>
                <Text style={styles.switchLabel}>US</Text>
                <Switch style={styles.switch} />
                <Text style={styles.switchLabel}>Metric</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Height</Text>
              <View style={styles.rowInput}>
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="5' 0"
                />
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Weight</Text>
              <View style={styles.rowInput}>
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="130"
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigate('App')}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
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
        </View>
      </View>
    );
  }
}

export default RegisterMeasurements;
