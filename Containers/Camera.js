import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Vibration
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles/CameraStyles';

class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    photoId: 1
  };

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      // console.log(e, 'Directory exists');
    });
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      let image = result.uri;
      // this.setState({ image: result.uri });

      // move on
      this.props.navigation.navigate('TagGarments', { image });
    }
  };

  renderCamera() {
    let { image } = this.state;

    return (
      <Camera
        style={styles.container}
        type={this.state.type}
        ref={ref => {
          this.camera = ref;
        }}
      >
        <View style={styles.controlsContainer}>
          <View style={styles.controls}>
            <View style={styles.toggle}>
              <Button
                title="Library"
                onPress={this.pickImage}
                buttonStyle={styles.toggleButtons}
                color="#fff"
              />
            </View>

            <TouchableOpacity style={{}} onPress={this.takePicture}>
              <Ionicons name="ios-radio-button-on" size={90} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reverse}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Ionicons name="ios-reverse-camera" size={40} color="#fff" />
            </TouchableOpacity>
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, backgroundColor: '#fff' }}
            />
          )}
        </View>
      </Camera>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      // let photo = await this.camera.takePictureAsync();

      this.camera.takePictureAsync().then(data => {
        const image = `${FileSystem.documentDirectory}photos/Photo_${
          this.state.photoId
        }.jpg`;

        FileSystem.moveAsync({
          from: data.uri,
          to: image
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1
          });
          Vibration.vibrate();
          this.props.navigation.navigate('TagGarments', { image });
        });
      });

      // console.log(photo);
    }
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return <View style={styles.container}>{this.renderCamera()}</View>;
    }
  }
}

export default CameraScreen;
