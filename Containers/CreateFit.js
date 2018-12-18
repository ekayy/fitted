import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchGarments from "./SearchGarments";
import { connect } from "react-redux";
import { fetchGarments } from "../Redux/GarmentsRedux";

import t from "tcomb-form-native";

const Form = t.form.Form;

const Fit = t.struct({
  profile: t.String,
  style: t.maybe(t.String),
  photo: t.String,
  garments: t.String
});

const Garment = t.struct({
  color: t.String,
  sku: t.String,
  model: t.String,
  photo: t.String
});

class CreateFit extends Component {
  state = {
    modalVisible: false,
    searchTerm: "",
    garments: [],
    results: [],
    remainingResults: [],
    error: null,
    loading: false,
    refreshing: false,
    limit: 9999
  };

  setModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  addPiece = () => {
    const value = this.refs.form.getValue();
    if (value) {
      console.tron.log(value);
    }
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
            <Text>Placeholder</Text>
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
            <View style={{ alignSelf: "center" }}>
              <Text>
                Acne Studios{"\n"}
                Chelsea Boots{"\n"}
                Brown{"\n"}
                8.5 US
              </Text>
            </View>
          </View>
          <Button title="Add" onPress={() => navigate("SearchGarments")} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Tags</Text>
          <View style={styles.formRow} />
          <Button title="Add" onPress={() => {}} />
        </View>
        <TouchableOpacity>Share Fit</TouchableOpacity>

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={styles.modal}>
            <TouchableHighlight
              onPress={this.setModalVisible}
              style={styles.close}
            >
              <Ionicons
                name="ios-close"
                size={50}
                color="#000"
                style={styles.close}
              />
            </TouchableHighlight>

            {/*}<Form ref="form" type={Fit} />*/}
            <Button title="Add Piece" onPress={this.addPiece} />
          </View>
        </Modal>

        <Button title="Save Fit" onPress={() => {}} />
      </ScrollView>
    );
  }
}

const styles = {
  formContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff"
  },
  formRow: {
    flex: 1,
    flexDirection: "row"
    // alignItems: 'top'
  },
  image: {
    marginRight: 10
  },
  textInput: {
    flex: 1
  },
  formTitle: {
    flex: 1,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10
  },

  close: {
    position: "absolute",
    top: 5,
    right: 15,
    backgroundColor: "transparent"
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 25,
    backgroundColor: "#f3f3f3"
  }
};

const mapStateToProps = state => {
  return {
    garments: state.garments.items
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGarments
  }
)(CreateFit);
