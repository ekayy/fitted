import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Avatar, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AppStyles, Metrics } from '../Themes';
import GarmentsList from '../Components/GarmentsList';
import { FavoriteButton } from '../Components/FavoriteButton';

import { favoriteFit } from '../Redux/UserRedux';
import { fetchFitGarments } from '../Redux/GarmentsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
// import { fetchComments } from '../Redux/CommentsRedux';
// import CommentList from '../Components/Comment/CommentList';

import { FitDetailProps, Fit } from '../types';
import { useTypedSelector } from '../types';
import { fetchFit } from '../Redux/FitsRedux';

const FitDetail: React.FC<FitDetailProps> = ({ route, navigation }) => {
  // Navigation params
  const { id: fitId } = route.params;

  // Redux state
  const { items: brands } = useTypedSelector((state) => state.brands);
  const { fitGarments } = useTypedSelector((state) => state.garments);
  const { createdFit } = useTypedSelector((state) => state.fits);
  const user = useTypedSelector((state) => state.user);
  const { favoriteFits, user: profile } = user;

  // State
  const [convertedHeight, setConvertedHeight] = useState<string>();
  const [toggled, setToggled] = useState<boolean>(false);
  const [fit, setFit] = useState<Partial<Fit>>({});
  const { photo, height, weight, garments, images } = fit;

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const result = await fetchFit(fitId);
      setFit(result);
    })();
  }, [createdFit]);
  useEffect(() => {
    dispatch(fetchBrands());
    favoriteFits.includes(fitId) ? setToggled(true) : setToggled(false);
  }, []);
  useEffect(() => {
    // run once fit data fetched
    garments && dispatch(fetchFitGarments(garments));

    if (height) {
      const feet = Math.floor(height / 12);
      const inches = height % 12;
      setConvertedHeight(`${feet}"${inches}'`);
    }
  }, [fit]);

  // useEffect(() => {
  //   if (fit) {
  //     const { model } = fit;
  //     navigation.setOptions({ title: model });
  //   }
  // }, [fit]);

  const favorite = () => {
    dispatch(favoriteFit(fitId, user));
    favoriteFits.includes(fitId) ? setToggled(false) : setToggled(true);
  };

  //   const fetchProfile = async () => {
  //   const response = await axios.get(`${baseURL}/profiles/${profileId}`);
  //   try {
  //     this.setState({
  //       profile: response.data,
  //       username: response.data.user.username,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error,
  //     });
  //   }
  // };

  const renderHeader = () => {
    return (
      <>
        <View>
          <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate('Profile')}>
            {/* <Avatar
              rounded
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
              activeOpacity={0.7}
            /> */}
            <View>
              <Text style={styles.profileText}>
                {profile && profile['username']} &#11825; Height: {convertedHeight} &#11825; Weight:{' '}
                {weight} lbs
              </Text>
            </View>
          </TouchableOpacity>

          <Image
            style={styles.image}
            source={{ uri: images && images.length ? images[0]['image'] : photo }}
          />

          <View style={styles.favorite}>
            <FavoriteButton onPress={favorite} toggled={toggled} />
          </View>
        </View>

        <View style={AppStyles.section}>
          <View style={AppStyles.sectionTitle}>
            <Text style={AppStyles.sectionTitleText}>Garments</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <GarmentsList
      data={fitGarments}
      navigation={navigation}
      brands={brands}
      ListHeaderComponent={renderHeader}
    />
  );
};
// state = {
//   error: null,
//   loading: true,
//   garments: [],
//   toggled: false,
//   profile: '',
//   username: '',
// };

// componentDidMount() {
//   const { id } = this.props.navigation.state.params;

//   this.props.fetchBrands();
//   this.fetchGarments();
//   this.setState({ toggled: false });
//   this.getFavoriteState();
//   this.fetchProfile();
//   this.willFocus = this.props.navigation.addListener('willFocus', () => {
//     this.props.fetchComments(id, 'fits');
//   });
// }

// componentWillUnmount() {
//   this.willFocus.remove();
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  image: {
    width: Metrics.screenWidth,
    minHeight: 400,
  },
  favorite: {
    position: 'absolute',
    bottom: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin,
  },
  gridItem: {
    flex: 1,
    width: Metrics.screenWidth / 3,
    height: 200,
    backgroundColor: '#333',
  },
  image2: {
    width: undefined,
    height: 200,
  },

  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  profileImage: {
    marginLeft: 30,
  },
  profileText: {
    marginLeft: 30,
  },
});

export default FitDetail;
