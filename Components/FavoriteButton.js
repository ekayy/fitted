import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/FavoriteButtonStyles";
import { MaterialIcons } from "@expo/vector-icons";

class FavoriteButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
  };

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     toggled: false
  //   };
  // }

  // toggleItem = () => {
  //   this.setState({ toggled: !this.state.toggled });
  // };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ alignItems: "center" }}>
          <MaterialIcons
            name={this.props.toggled ? "bookmark" : "bookmark-border"}
            size={30}
            color="#000"
            style={{
              backgroundColor: "transparent"
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FavoriteButton;
