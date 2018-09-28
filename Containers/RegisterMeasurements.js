import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Picker,
  TouchableOpacity,
  ImageBackground
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
      <ImageBackground
        source={{
          uri:
            'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350'
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Congrats!</Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Units</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>US</Text>
                <Switch
                  style={styles.switch}
                  onTintColor="white"
                  onValueChange={this.toggleUnits}
                  value={isMetric}
                />
                <Text style={styles.switchLabel}>Metric</Text>
              </View>
            </View>

            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.rowInput}>
                  <Text style={styles.rowLabel}>Height (Feet)</Text>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="5"
                  />
                </View>

                <View style={styles.rowInput}>
                  <Text style={styles.rowLabel}>Height (Inches)</Text>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="7"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowInput}>
                  <Text style={styles.rowLabel}>Weight (lbs)</Text>
                  <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="130"
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <Button
                title="Next"
                onPress={this.handleLogin}
                backgroundColor="#000"
              />
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
      </ImageBackground>
    );
  }
}

export default RegisterMeasurements;
