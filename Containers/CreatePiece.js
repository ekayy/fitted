import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Metrics } from "../Themes";
import axios from "axios";

import { brands } from "../data.json";

import { baseURL } from "../Config";

class CreatePiece extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sess</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#f3f3f3"
  },
  listItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  imageContainer: {
    flex: 1,
    width: 160,
    height: 150
  },
  image: {
    width: "100%",
    height: 150,
    marginHorizontal: 20
  },
  description: {
    flex: 1,
    alignItems: "center"
  }
};

export default CreatePiece;
