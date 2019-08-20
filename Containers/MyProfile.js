import React, { Component } from 'react';
import { View, Dimensions, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { favoriteGarment } from '../Redux/UserRedux';
import axios from 'axios';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ProfileHeader from '../Components/ProfileHeader';
import FitsGrid from '../Components/FitsGrid';
import GarmentsGrid from '../Components/GarmentsGrid';
import { baseURL } from '../Config';
import { withNavigationFocus } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import styles from './Styles/MyProfileStyles';

class MyProfile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'garments', title: 'Closet', icon: 'hanger' },
      { key: 'fits', title: 'Favorite Fits', icon: 'tshirt-crew' }
      // { key: 'myfits', title: 'My Fits' }
    ],
    loading: false,
    refreshing: false,
    favoriteFits: [],
    favoriteGarments: [],
    myFits: [],
    editingCloset: false
  };

  componentDidMount() {
    this.fetchFavoriteGarments();
    this.fetchFavoriteFits();
    this.fetchMyFits();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.favoriteGarments != this.props.favoriteGarments) {
      this.setState({ refreshing: true, favoriteGarments: [] }, () => {
        this.fetchFavoriteGarments();
      });
    }

    if (previousProps.favoriteFits != this.props.favoriteFits) {
      this.setState({ refreshing: true, favoriteFits: [] }, () => {
        this.fetchFavoriteFits();
      });
    }
  }

  fetchFavoriteGarments = async () => {
    this.setState({
      error: null,
      refreshing: true
    });

    await Promise.all(
      this.props.favoriteGarments.map(async garmentId => {
        const response = await axios.get(`${baseURL}/garments/${garmentId}`);

        try {
          this.setState({
            favoriteGarments: [...this.state.favoriteGarments, response.data]
          });
        } catch (error) {
          this.setState({
            error
          });
        }
      })
    );

    this.setState({
      error: null,
      loading: false,
      refreshing: false
    });
  };

  fetchFavoriteFits = async () => {
    this.setState({
      error: null,
      refreshing: true
    });

    await Promise.all(
      this.props.favoriteFits.map(async fitId => {
        const response = await axios.get(`${baseURL}/fits/${fitId}`);

        try {
          this.setState({
            favoriteFits: [...this.state.favoriteFits, response.data]
          });
        } catch (error) {
          this.setState({
            error
          });
        }
      })
    );

    this.setState({
      error: null,
      refreshing: false
    });
  };

  fetchMyFits = async () => {
    const { profileId } = this.props.user;

    this.setState({
      error: null,
      refreshing: true
    });

    const response = await axios.get(`${baseURL}/profiles/${profileId}/fits`);

    try {
      this.setState({
        myFits: response.data,
        error: null,
        refreshing: false
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  handleGarmentRefresh = () => {
    this.setState({ refreshing: true, favoriteGarments: [] }, () => {
      this.fetchFavoriteGarments();
    });
  };

  handleFitRefresh = () => {
    this.setState({ refreshing: true, favoriteFits: [] }, () => {
      this.fetchFavoriteFits();
    });
  };

  handleMyFitRefresh = () => {
    this.setState({ refreshing: true, myFits: [] }, () => {
      this.fetchMyFits();
    });
  };

  handleLoadMore = () => {};

  // show button to remove garments from closet
  editCloset = () => {
    this.setState({
      editingCloset: !this.state.editingCloset
    });
  };

  // Remove garment from closet
  unfavoriteGarment = id => {
    const { user, favoriteGarment } = this.props;

    favoriteGarment(id, user);
  };

  render() {
    const initialLayout = {
      height: 0,
      width: Dimensions.get('window').width
    };

    return (
      <View style={styles.container}>
        <ProfileHeader
          navigation={this.props.navigation}
          user={this.props.user}
        />

        <View style={styles.tabContainer}>
          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
            initialLayout={initialLayout}
            tabBarPosition="bottom"
          />
        </View>
      </View>
    );
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      tabStyle={styles.tabStyle}
      labelStyle={styles.labelStyle}
      style={styles.tabBarStyle}
      renderIcon={this._renderIcon}
    />
  );

  _renderScene = ({ route }) => {
    const {
      favoriteGarments,
      favoriteFits,
      myFits,
      loading,
      page,
      refreshing,
      editingCloset
    } = this.state;

    _renderIcon = ({ route, color }) => (
      <MaterialCommunityIcons name={route.icon} size={24} color={color} />
    );

    switch (route.key) {
      case 'garments':
        return (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.closet}>
              <Text>Closet</Text>
              <Button
                title={editingCloset ? 'Close' : 'Edit'}
                buttonStyle={styles.editButtonStyle}
                titleStyle={styles.editButtonTitleStyle}
                onPress={this.editCloset}
              />
            </View>

            <GarmentsGrid
              data={favoriteGarments}
              navigation={this.props.navigation}
              numCol={2}
              handleLoadMore={this.handleLoadMore}
              onRefresh={this.handleGarmentRefresh}
              refreshing={refreshing}
              loading={loading}
              editingCloset={editingCloset}
              unfavoriteGarment={this.unfavoriteGarment}
            />
          </ScrollView>
        );
      case 'fits':
        return (
          <FitsGrid
            data={favoriteFits}
            navigation={this.props.navigation}
            numCol={2}
            handleLoadMore={this.handleLoadMore}
            onRefresh={this.handleFitRefresh}
            refreshing={refreshing}
            loading={loading}
          />
        );
      // case "myfits":
      //   return (
      //     <FitsGrid
      //       data={myFits}
      //       navigation={this.props.navigation}
      //       handleLoadMore={this.handleLoadMore}
      //       onRefresh={this.handleMyFitRefresh}
      //       refreshing={refreshing}
      //       loading={loading}
      //     />
      //   );
      default:
        return null;
    }
  };
}

const mapStateToProps = state => {
  return {
    favoriteGarments: state.user.favoriteGarments,
    favoriteFits: state.user.favoriteFits,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { favoriteGarment }
)(withNavigationFocus(MyProfile));
