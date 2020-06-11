import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Vibration,
  Animated,
  PanResponder,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { Ionicons, EvilIcons } from '@expo/vector-icons';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image: null,
      photoId: 1,
      zoom: 0,
    };
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch((e) => {
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
      allowsEditing: true,
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      let image = result.uri;
      // this.setState({ image: result.uri });

      // move on
      this.props.navigation.navigate('Tag Garments', { image });
    }
  };

  renderCamera() {
    let { image, zoom, type } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <StyledContainer>
        <StyledHeaderContainer>
          {image && (
            <StyledHeader>
              <Button title="Retake" onPress={() => this.setState({ image: null })} />

              <Button title="Next" onPress={() => navigate('Tag Garments', { image })} />
            </StyledHeader>
          )}
        </StyledHeaderContainer>
        <Camera
          style={{ flex: 0.65 }}
          type={type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          {image && (
            <StyledImageContainer>
              <StyledImage source={{ uri: image }} />
            </StyledImageContainer>
          )}
        </Camera>

        <StyledControlsContainer>
          {!image && (
            <StyledControls>
              <StyledToggle>
                <Button
                  title="Library"
                  onPress={this.pickImage}
                  // buttonStyle={styles.toggleButtons}
                  color="#fff"
                />
              </StyledToggle>

              <TouchableOpacity onPress={this.takePicture}>
                <Ionicons name="ios-radio-button-on" size={90} color="#fff" />
              </TouchableOpacity>

              <StyledReverseButton
                onPress={() => {
                  this.setState({
                    type:
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Ionicons name="ios-reverse-camera" size={40} color="#fff" />
              </StyledReverseButton>
            </StyledControls>
          )}
        </StyledControlsContainer>
      </StyledContainer>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      // let photo = await this.camera.takePictureAsync();

      this.camera.takePictureAsync().then((data) => {
        const image = `${FileSystem.documentDirectory}photos/photo_${this.state.photoId}.jpg`;

        FileSystem.moveAsync({
          from: data.uri,
          to: image,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
            image,
          });
          Vibration.vibrate();
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
      return this.renderCamera();
    }
  }
}

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledHeaderContainer = styled.View`
  flex: 0.1;
  background: #000;
`;

const StyledHeader = styled.View`
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeaderText = styled.TouchableOpacity`
  color: #fff;
`;

const StyledControlsContainer = styled.View`
  flex: 0.25;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.95);
`;

const StyledControls = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

const StyledReverseButton = styled.TouchableOpacity`
  position: absolute;
  right: 80px;
`;

const StyledToggle = styled.View`
  position: absolute;
  left: 60px;
`;

const StyledImageContainer = styled.View`
  background-color: #fff;
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledImage = styled.Image`
  background-color: #fff;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export default CameraScreen;
