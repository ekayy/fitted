import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { Button, Avatar } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { AppStyles, Metrics } from '../Themes';
import styles from './Styles/GarmentDetailStyles';

import { FavoriteButton } from '../Components/FavoriteButton';
import CommentList from '../Components/Comment/CommentList';
import { favoriteGarment } from '../Redux/UserRedux';
import { fetchFits, clearCreatedFit, tagGarmentToFit } from '../Redux/FitsRedux';
import { fetchComments } from '../Redux/CommentsRedux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { GarmentDetailProps } from '../types';
import { useTypedSelector } from '../types';

const GarmentDetail: React.FC<GarmentDetailProps> = ({ route, navigation }) => {
  // Navigation params
  const {
    id: garmentId,
    color,
    brand,
    model,
    photo,
    purchase_page: purchasePage,
    favorited_by: favoritedBy,
  } = route.params;

  // Redux state
  const { items: fits } = useTypedSelector((state) => state.fits);
  const { items: brands } = useTypedSelector((state) => state.brands);
  const { items: comments } = useTypedSelector((state) => state.comments);
  const user = useTypedSelector((state) => state.user);
  const { favoriteGarments } = user;
  const brandName = brands[brand - 1]['name'];

  // State
  const [toggled, setToggled] = useState<boolean>(false);
  const [favoriteLength, setFavoriteLength] = useState<number>(favoritedBy.length);

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFits(garmentId));
    dispatch(fetchComments());
    favoriteGarments.includes(garmentId) ? setToggled(true) : setToggled(false);
  }, []);
  useEffect(() => {
    toggled ? setFavoriteLength(favoritedBy.length + 1) : setFavoriteLength(favoritedBy.length);
  }, [toggled]);

  const favorite = () => {
    dispatch(favoriteGarment(garmentId, user));
    favoriteGarments.includes(garmentId) ? setToggled(false) : setToggled(true);
  };

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [garmentFits, setGarmentFits] = useState([]);
  // const [count, setCount] = useState<number>(0);

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(purchasePage);
  };

  // photo taken will be associated with the current garment
  const addPhotoToFit = async () => {
    await dispatch(clearCreatedFit());
    await dispatch(tagGarmentToFit(route.params));
    navigation.navigate('Create Discussion', { screen: 'Camera' });
  };

  const _renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => navigation.navigate('Fit Detail', item)}
      >
        <Image style={styles.carouselImage} source={{ uri: item.photo }} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: photo }} />

        <View style={styles.favorite}>
          <FavoriteButton onPress={favorite} toggled={toggled} />
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <View style={styles.descriptionSectionLeft}>
          <Avatar size="small" rounded activeOpacity={0.7} />
          <View style={styles.descriptionText}>
            <Text style={styles.label}>{brandName !== null && brandName}</Text>
            <Text>{model}</Text>
          </View>
        </View>

        <View style={styles.descriptionSectionRight}>
          <Text>
            {favoriteLength} add{favoriteLength !== 1 && 's'} to closet
          </Text>
        </View>
      </View>

      <View style={styles.colorSection}>
        <View style={styles.colorText}>
          <Text style={styles.label}>Color</Text>
          <Text>{color}</Text>
        </View>
        {/* <View style={styles.colorSwatches}>
         <Avatar
            size="small"
            rounded
            activeOpacity={0.7}
            containerStyle={styles.swatch}
            overlayContainerStyle={{ backgroundColor: color.toLowerCase() }}
          />
        <Avatar size="small" rounded activeOpacity={0.7} containerStyle={styles.swatch} />
        </View> */}
      </View>

      <View style={styles.buttonSection}>
        <Button
          title="Add to favorites"
          buttonStyle={[AppStyles.buttonAltStyle, { width: Metrics.screenWidth / 2 - 20 }]}
          titleStyle={{ color: '#000', fontSize: 13 }}
        />
        <Button
          title="View website"
          onPress={handleOpenWithWebBrowser}
          buttonStyle={[AppStyles.buttonDefaultStyle, { width: Metrics.screenWidth / 2 - 20 }]}
          titleStyle={{ fontSize: 13 }}
        />
      </View>

      <View style={AppStyles.section}>
        <View style={AppStyles.sectionTitle}>
          <Text style={AppStyles.sectionTitleText}>Photos</Text>
        </View>

        <TouchableOpacity style={AppStyles.sectionSubtitle} onPress={addPhotoToFit}>
          <Ionicons name="ios-camera" size={25} style={{ marginRight: 10, color: '#aaa' }} />
          <Text>Add a photo</Text>
        </TouchableOpacity>

        <Carousel
          activeSlideAlignment="start"
          data={fits.slice(0, 10)}
          renderItem={_renderCarouselItem}
          sliderWidth={Metrics.screenWidth - 20}
          itemWidth={(Metrics.screenWidth - 20) / 3}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />

        {fits.length > 0 && (
          <View style={AppStyles.button}>
            <Button
              title={`See all ${fits.length} photos`}
              buttonStyle={[AppStyles.buttonAltStyle]}
              titleStyle={AppStyles.buttonAltTitleStyle}
              onPress={() => navigation.navigate('Fits', route.params)}
            />
          </View>
        )}
      </View>

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
            contentType="garment"
            objectId={id}
          />
        )}
        <View style={AppStyles.button}>
          <Button
            title={`See all discussion`}
            buttonStyle={[AppStyles.buttonAltStyle]}
            titleStyle={AppStyles.buttonAltTitleStyle}
            onPress={() =>
              navigation.navigate('Comments', {
                objectId: id,
                contentType: 'garment',
              })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default GarmentDetail;
