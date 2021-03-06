import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppStyles, Metrics } from '../Themes';
import GarmentsList from '../Components/GarmentsList';
import FavoriteButton from '../Components/FavoriteButton';
import axios from 'axios';
import { baseURL } from '../Config';
import { favoriteFit } from '../Redux/UserRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { fetchComments } from '../Redux/CommentsRedux';
import CommentList from '../Components/Comment/CommentList';

class FitDetail extends Component {
  state = {
    error: null,
    loading: true,
    garments: [],
    toggled: false,
    profile: '',
    username: ''
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    this.props.fetchBrands();
    this.fetchGarments();
    this.setState({ toggled: false });
    this.getFavoriteState();
    this.fetchProfile();
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.props.fetchComments(id, 'fits');
    });
  }

  componentWillUnmount() {
    this.willFocus.remove();
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
    const { profileId } = this.props.user;

    const response = await axios.get(`${baseURL}/profiles/${profileId}`);

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

    navigate('Profile', profile);
  };

  render() {
    const { comments } = this.props;
    const { navigate } = this.props.navigation;
    const { id, photo, height, weight } = this.props.navigation.state.params;
    const { profile, username } = this.state;

    const feet = parseInt(height / 12);
    const inches = height % 12;

    const convertedHeight = `${feet}"${inches}'`;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.profile} onPress={this.handlePress}>
              <Avatar
                large
                rounded
                source={{
                  uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                }}
                activeOpacity={0.7}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.profileText}>
                  {username.toUpperCase()} &#11825; Height: {convertedHeight} &#11825; Weight:{' '}
                  {weight} lbs
                </Text>
              </View>
            </TouchableOpacity>

            <Image style={styles.image} source={{ uri: photo }} />

            <View style={styles.favorite}>
              <FavoriteButton onPress={this.favoriteFit} toggled={this.state.toggled} />
              <Text>{this.state.garments.photo}</Text>
            </View>
          </View>

          <View style={AppStyles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Garments</Text>
            </View>
          </View>

          <GarmentsList
            data={this.state.garments}
            navigation={this.props.navigation}
            brands={this.props.brands}
          />

          <View style={AppStyles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Discussion</Text>
            </View>

            {comments.length > 0 && (
              <CommentList
                {...this.props}
                data={comments.slice(0, 3)}
                renderViewComments
                renderLeaveComment
                numReplies={1}
                contentType="fit"
                objectId={id}
              />
            )}
            <View style={AppStyles.button}>
              <Button
                title={`See all discussion`}
                buttonStyle={[AppStyles.buttonAltStyle]}
                titleStyle={AppStyles.buttonAltTitleStyle}
                onPress={() =>
                  navigate('Comments', {
                    objectId: id,
                    contentType: 'fit'
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400
  },
  favorite: {
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image2: {
    width: undefined,
    height: 200
  },

  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  profileImage: {
    marginLeft: 30
  },
  profileText: {
    marginLeft: 30
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    brands: state.brands.items,
    commments: state.comments.items
  };
};

export default connect(mapStateToProps, { favoriteFit, fetchBrands, fetchComments })(FitDetail);
