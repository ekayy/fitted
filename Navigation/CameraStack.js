import React from "react";
import { createStackNavigator } from "react-navigation";
import Camera from "../Containers/Camera";
import SearchGarments from "../Containers/SearchGarments";
import CreateFit from "../Containers/CreateFit";

const CameraStack = createStackNavigator(
  {
    Camera: {
      screen: Camera,
      navigationOptions: { title: "Camera", header: null }
    },
    SearchGarments: {
      screen: SearchGarments,
      navigationOptions: { title: "Searching Database" }
    },
    CreateFit: {
      screen: CreateFit,
      navigationOptions: { title: "Fit - Add Detail" }
    }
  },
  {
    initialRouteName: "Camera"
  }
);

export default CameraStack;
