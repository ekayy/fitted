import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Vibration
} from 'react-native';
import { Camera, FileSystem, Permissions, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

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
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      let image = result.uri;
      // this.setState({ image: result.uri });

      // move on
      this.props.navigation.navigate('CreateFit', { image });
    }
  };

  renderCamera() {
    let { image } = this.state;

    return (
      <Camera
        style={{ flex: 1 }}
        type={this.state.type}
        ref={ref => {
          this.camera = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', right: 20 }}
            onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
              });
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              Flip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={this.takePicture}>
            <Ionicons
              name="ios-radio-button-on-outline"
              size={60}
              color="#fff"
            />
          </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
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
          this.props.navigation.navigate('CreateFit', { image });
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
      return (
        <View style={{ flex: 1 }}>
          {this.renderCamera()}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 20,
              backgroundColor: 'transparent'
            }}
          >
            <Button title="Library" onPress={this.pickImage} />
          </View>
        </View>
      );
    }
  }
}

export default CameraScreen;
