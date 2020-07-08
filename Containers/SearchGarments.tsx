import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../Redux/BrandsRedux';
import { tagGarmentToFit } from '../Redux/FitsRedux';
import { AppStyles } from '../Themes';
import styles from './Styles/TagGarmentsStyles';
import { Garment, useTypedSelector, SearchGarmentsProps } from '../types';

const SearchGarments: React.FC<SearchGarmentsProps> = ({ route, navigation }) => {
  // Navigation params
  const { image } = route.params;

  // Redux state
  const { items: garments } = useTypedSelector((state) => state.garments);
  const { taggedGarments } = useTypedSelector((state) => state.fits);
  const { items: brands } = useTypedSelector((state) => state.brands);

  // State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedGarments, setSearchedGarments] = useState<Garment[]>([]);
  const [searchResults, setSearchResults] = useState<Garment[]>([]);
  const [remainingResults, setRemainingResults] = useState<Garment[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    setRefreshing(true);
    dispatch(fetchBrands());
  }, []);
  useEffect(() => {
    setRefreshing(true);
    setSearchedGarments(garments);
    setSearchResults(garments);
  }, [brands]);
  useEffect(() => {
    setRefreshing(false);
    setSearchResults([...searchedGarments.slice(0, 10)]);
    setRemainingResults([...searchedGarments.slice(10)]);
  }, []);

  // set header navigation button
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Searching Database',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Add Custom Garment')}
          style={{ marginRight: 20 }}
        >
          <Ionicons name="ios-add" size={40} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleChange = (searchTerm) => {
    const searchResults = searchedGarments.filter((result) =>
      searchTerm ? result.model.toLowerCase().includes(searchTerm) : searchedGarments,
    );

    let slicedResults = searchResults.slice(0, 10);
    let remainingResults = searchResults.slice(10);

    setSearchTerm(searchTerm);
    setRemainingResults(remainingResults);
    setSearchResults(slicedResults);
  };

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   setSearchResults([]);
  //   dispatch(fetchGarments());
  // };

  //   // do nothing because the entire page is loaded
  const handleLoadMore = () => {
    // setLoading(true);
    setRemainingResults(remainingResults.slice(10));
    setSearchResults([...searchResults, ...remainingResults.slice(0, 10)]);
    // setLoading(false);
  };

  const tagToFit = (item: Garment) => {
    const { id: garmentId } = item;

    // check if garment id already tagged to a fit
    if (!taggedGarments.filter((garment) => garment.id === garmentId).length) {
      garmentId && dispatch(tagGarmentToFit(item));
      navigation.navigate('Tag Garments', { image });
    } else {
      // display an error message to user
      navigation.goBack();
    }
  };

  const renderGarment = ({ item }: { item: Garment }) => {
    const { model, brand, photo } = item;
    const brandName = brands[brand].name;

    return (
      <View style={styles.section}>
        <View style={styles.formRow}>
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

          <TouchableOpacity style={AppStyles.sectionSubtitle} onPress={() => tagToFit(item)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Tag to fit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={AppStyles.container}>
      <SearchBar
        lightTheme
        placeholder="Search"
        onChangeText={handleChange}
        autoCapitalize="none"
        platform="ios"
        value={searchTerm}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={renderGarment}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default SearchGarments;
