import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class CreateFit extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { image } = this.props.navigation.state.params;

    return (
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <View style={styles.image}>
              <Image
                source={{ uri: image }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder="Add a comment"
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Pieces</Text>
          <View style={styles.formRow}>
            <View style={styles.image}>
              <Image
                source={{ uri: image }}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Text>
                Acne Studios{'\n'}
                Chelsea Boots{'\n'}
                Brown{'\n'}
                8.5 US
              </Text>
            </View>
          </View>
          <Button title="Add" onPress={() => {}} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Tags</Text>
          <View style={styles.formRow} />
          <Button title="Add" onPress={() => {}} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Social</Text>
          <View style={styles.formRow} />
        </View>
        <TouchableOpacity>Share Fit</TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = {
  formContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff'
  },
  formRow: {
    flex: 1,
    flexDirection: 'row'
    // alignItems: 'top'
  },
  image: { marginRight: 10 },
  textInput: { flex: 1 },
  formTitle: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10
  }
};

export default CreateFit;
