import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import { Avatar } from "react-native-elements";
import axios from "axios";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import ProfileHeader from "../Components/ProfileHeader";
import FitsGrid from "../Components/FitsGrid";
import GarmentsGrid from "../Components/GarmentsGrid";
import { baseURL } from "../Config";

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: "garments", title: "Garments" },
      { key: "fits", title: "Fits" }
    ],
    loading: false,
    refreshing: false,
    garments: [],
    fits: []
  };

  componentDidMount() {
    // this.fetchProfile();
  }

  // fetchProfile = async () => {
  //   console.tron.log(this.props.navigation.state.params);
  //   this.setState({
  //     error: null,
  //     refreshing: true
  //   });
  // };

  handleRefresh = () => {
    this.setState({ refreshing: true, garments: [], fits: [] }, () => {
      this.fetchProfile();
    });
  };

  handleLoadMore = () => {};

  render() {
    const initialLayout = {
      height: 0,
      width: Dimensions.get("window").width
    };

    const { user } = this.props.navigation.state.params;
    const { first_name, last_name, username } = user;
    const firstName = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    const lastName = last_name.charAt(0).toUpperCase() + last_name.slice(1);
    const initials =
      first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar size="large" rounded title={initials} activeOpacity={0.7} />
          <Text style={styles.headerText}>{firstName}</Text>
        </View>

        <View style={styles.tabContainer}>
          <TabViewAnimated
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
          />
        </View>
      </View>
    );
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      tabStyle={styles.tabStyle}
      style={styles.tabBarStyle}
    />
  );

  _renderScene = ({ route }) => {
    const { garments, fits, loading, page, refreshing } = this.state;

    switch (route.key) {
      case "garments":
        return (
          <GarmentsGrid
            data={garments}
            navigation={this.props.navigation}
            numCol={3}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
          />
        );
      case "fits":
        return (
          <FitsGrid
            data={fits}
            navigation={this.props.navigation}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleRefresh}
            refreshing={refreshing}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#f3f3f3"
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 30
  },
  headerText: {
    marginLeft: 10
  },

  tabContainer: {
    flex: 1
  },
  tabBarStyle: {
    backgroundColor: "#fff"
  },
  tabStyle: {
    backgroundColor: "red"
  },
  indicatorStyle: {
    backgroundColor: "red"
  }
};

export default Profile;
