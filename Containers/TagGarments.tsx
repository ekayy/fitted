import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeGarmentFromFit, createFit, clearCreatedFit } from '../Redux/FitsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import styles from './Styles/TagGarmentsStyles';
import { AppStyles } from '../Themes';
import { useTypedSelector, TagGarmentsProps } from '../types';
import { useDispatch } from 'react-redux';

const TagGarments: React.FC<TagGarmentsProps> = ({ route, navigation }) => {
  // Navigation params
  const { image } = route.params;

  // Redux state
  const { taggedGarments, createdFit } = useTypedSelector((state) => state.fits);
  const { items: brands } = useTypedSelector((state) => state.brands);
  const { profileId } = useTypedSelector((state) => state.user);

  // State
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);
  useEffect(() => {
    // if fit created
    if (createdFit) {
      setDescription('');

      navigation.reset({
        routes: [{ name: 'Create Choice' }],
      });

      navigation.navigate('Search', {
        screen: 'Fit Detail',
        params: createdFit,
      });

      // reset fit redux
      dispatch(clearCreatedFit());
    }
  }, [createdFit]);

  // set header navigation button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search Garments')}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="ios-add" size={40} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const shareFit = async () => {
    const garmentIds = taggedGarments.map((item) => item.id);

    // post fit to api
    // TODO: set up s3 for image upload
    if (garmentIds.length > 0 && profileId !== null) {
      await dispatch(
        createFit({
          description,
          garments: garmentIds,
          photo: image,
          profile: profileId,
        }),
      );
    } else {
      setError('You must tag a garment to this fit');
      setTimeout(() => setError(''), 3000);
    }
  };

  const renderGarment = (rowData, rowMap) => {
    const { id, brand, model, photo } = rowData.item;
    const brandName = brands[brand - 1].name;

    return (
      <View style={styles.formRow} key={id}>
        <View style={styles.product}>
          <View style={styles.productImage}>
            <Image source={{ uri: photo }} style={{ width: 80, height: 80 }} />
          </View>
          <View style={styles.productAttributes}>
            <Text>
              {brandName} {'\n'} {model}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {};

  // render swipe list view to delete
  const renderHiddenItem = (rowData, rowMap) => {
    const { id: garmentId } = rowData.item;

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={(_) => dispatch(removeGarmentFromFit({ garmentId }))}
        >
          <Text style={styles.rightBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Close swiped row after time
  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    }, 3000);
  };

  const renderHeader = () => (
    <View style={styles.capturedPhotoSection}>
      <Image source={{ uri: image }} style={styles.photo} />

      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Describe your fit here!"
        onChangeText={(text) => setDescription(text)}
        style={styles.textArea}
        returnKeyType="go"
      />
    </View>
  );

  const renderFooter = () => (
    <>
      <View style={AppStyles.button}>
        <Button title="Share" buttonStyle={[AppStyles.buttonDefaultStyle]} onPress={shareFit} />
      </View>
      <Text style={AppStyles.error}>{error}</Text>
    </>
  );

  return (
    <View style={AppStyles.section}>
      <View style={styles.section}>
        <SwipeListView
          data={taggedGarments}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={renderGarment}
          renderHiddenItem={renderHiddenItem}
          onRowOpen={onRowOpen}
          rightOpenValue={-150}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
        />
      </View>
    </View>
  );
};

export default TagGarments;
