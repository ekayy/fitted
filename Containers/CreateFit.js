import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextInput from '../Components/FormikTextInput';
import { Formik } from 'formik';

const MyForm = props => (
  <View>
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => (
        <View>
          <TextInput
            name="email"
            onChangeText={props.setFieldValue}
            value={props.values.email}
          />
          <Button title="submit" onPress={props.handleSubmit} />
        </View>
      )}
    />
  </View>
);

class CreateFit extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

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
          <Button title="Add" onPress={this.setModalVisible} />
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

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={styles.modal}>
            <TouchableHighlight onPress={this.setModalVisible}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            <MyForm />
          </View>
        </Modal>
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
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#f3f3f3'
  }
};

export default CreateFit;
