import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  AsyncStorage
} from "react-native";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { Metrics } from "../Themes";
import GarmentsList from "../Components/GarmentsList";
import FavoriteButton from "../Components/FavoriteButton";
import axios from "axios";
import { baseURL } from "../Config";
import { favoriteFit } from "../Redux/UserRedux";

class FitDetail extends Component {
  state = {
    error: null,
    loading: true,
    garments: [],
    toggled: false,
    profile: "",
    username: ""
  };

  componentDidMount() {
    this.fetchGarments();
    this.setState({ toggled: false });
    this.getFavoriteState();
    this.fetchProfile();
  }

  fetchGarments = async () => {
    const { garments } = this.props.navigation.state.params;

    const filteredGarments = garments.map(async garmentId => {
      const response = await axios.get(`${baseURL}/garments/${garmentId}`);

      try {
        this.setState({
          garments: [...this.state.garments, response.data],
          error: null,
          loading: false
        });
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
      }
    });
  };

  fetchProfile = async () => {
    const { profile } = this.props.navigation.state.params;

    const response = await axios.get(`${baseURL}/profiles/${profile}`);

    try {
      this.setState({
        profile: response.data,
        username: response.data.user.username
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  getFavoriteState = () => {
    const { id } = this.props.navigation.state.params;
    const { favoriteFits } = this.props.user;

    if (favoriteFits.includes(id)) {
      this.setState({ toggled: true });
    } else {
      this.setState({ toggled: false });
    }
  };

  favoriteFit = async () => {
    // favoriteId
    const { id } = this.props.navigation.state.params;

    await this.props.favoriteFit(id, this.props.user);

    this.getFavoriteState();
  };

  handlePress = () => {
    const { navigate } = this.props.navigation;
    const { profile } = this.state;

    navigate("Profile", profile);
  };

  render() {
    const { photo } = this.props.navigation.state.params;
    const { profile, username } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{ uri: photo }} />

            <View style={styles.favorite}>
              <FavoriteButton
                onPress={this.favoriteFit}
                toggled={this.state.toggled}
              />
              <Text>{this.state.garments.photo}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profile} onPress={this.handlePress}>
            <Avatar
              large
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              }}
              activeOpacity={0.7}
              style={styles.profileImage}
            />
            <Text style={styles.profileText}>@{username}</Text>
          </TouchableOpacity>

          <GarmentsList
            data={this.state.garments}
            navigation={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400
  },
  favorite: {
    position: "absolute",
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: "#333"
  },
  image2: {
    width: undefined,
    height: 200
  },

  profile: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 30
  },
  profileImage: {
    marginLeft: 30
  },
  profileText: {
    marginLeft: 30
  }
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  { favoriteFit }
)(FitDetail);
