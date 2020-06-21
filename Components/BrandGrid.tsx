import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Garment, Brand, useTypedSelector } from '../types';
import { favoriteGarment } from '../Redux/UserRedux';
import { useDispatch } from 'react-redux';

const BrandGrid: React.FC = (props) => {
  const { brandTable, style, refreshing, loading, onRefresh, handleLoadMore } = props;

  // Redux state
  const { items: brands } = useTypedSelector((state) => state.brands);

  // State

  const [showAll, setShowAll] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<string>('');

  const setSeeAllBrand = (brand) => {
    setShowAll(true);
    setCurrentBrand(brand);
  };

  const renderBrand = (item: Brand) => {
    return (
      <View>
        <View style={styles.brandheader}>
          <Text style={styles.brandLabel}>{item.name.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => setSeeAllBrand(item.name)} style={styles.seeAll}>
            <Text>See All</Text>
            <Ionicons
              name="md-arrow-dropright"
              size={30}
              color="rgb(74,74,74)"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={style}
          data={brandTable[item.name].slice(0, 10)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({ item }) => <BrandGarment item={item} />}
          onRefresh={() => onRefresh()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListFooterComponent={renderFooter}
        />
      </View>
    );
  };

  const renderShowAllHeader = () => (
    <View style={styles.showAllContainer}>
      <View style={styles.showAllText}>
        <Text style={styles.welcomeTitle}>{currentBrand}</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const goBack = () => {
    setShowAll(false);
  };

  return (
    <View>
      {showAll ? (
        <View>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
              <Ionicons
                name="ios-arrow-round-back"
                size={30}
                color="#FFFFFF"
                style={{ marginHorizontal: 12 }}
              />
              <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            columnWrapperStyle={styles.row}
            style={style}
            data={brandTable[currentBrand]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => <BrandGarment item={item} />}
            onRefresh={onRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            refreshing={refreshing}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            ListHeaderComponent={renderShowAllHeader}
            ListFooterComponent={renderFooter}
          />
        </View>
      ) : (
        <FlatList
          style={style}
          data={brands}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={({ item }) => renderBrand(item)}
          onRefresh={onRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

// rendered garment with local toggled state
const BrandGarment: React.FC<{ item: Garment }> = ({ item, navigation }) => {
  // Redux state
  const user = useTypedSelector((state) => state.user);
  const { favoriteGarments } = user;

  // State
  const [toggled, setToggled] = useState<boolean>(false);
  const { id, model, photo } = item;

  // Effect
  const dispatch = useDispatch();
  useEffect(() => {
    favoriteGarments.includes(id) ? setToggled(true) : setToggled(false);
  }, []);

  // if not valid photo, add a stock image
  const photoUrl =
    photo.length > 10
      ? photo
      : 'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';

  const favorite = (garmentId) => {
    dispatch(favoriteGarment(garmentId, user));
    favoriteGarments.includes(garmentId) ? setToggled(false) : setToggled(true);
  };

  return (
    <TouchableOpacity
      style={styles.gridItem}
      key={id}
      onPress={() => navigation.navigate('Garment Detail', item)}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: photoUrl }} />
      </View>
      <Text style={styles.text}>{model.toLowerCase()}</Text>
      <TouchableOpacity onPress={() => favorite(id)} style={styles.bookmarkContainer}>
        <Text style={{ color: 'rgb(74, 144, 226)' }}>
          {toggled ? 'Bookmarked' : 'Bookmark for later'}
        </Text>
        <MaterialCommunityIcons
          name={toggled ? 'bookmark' : 'bookmark-outline'}
          size={16}
          color="rgb(74, 144, 226)"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
    width: 136,
  },
  welcomeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0.8)',
    height: 160,
  },
  showAllContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0.8)',
    height: 100,
  },
  welcomeText: {
    paddingTop: 32,
  },
  showAllText: {
    paddingTop: 20,
  },
  welcomeTitle: {
    textAlign: 'center',
    fontSize: 32,
    color: 'rgb(255,255,255)',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 17,
    color: 'rgb(255,255,255)',
  },
  brandheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  brandLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'rgb(74,74,74)',
  },
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    width: 136,
    height: 136,
    position: 'relative',
  },
  image: {
    width: 136,
    height: 136,
  },
  text: {
    maxWidth: '80%',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  backButtonContainer: {
    backgroundColor: 'rgb(0,0,0.8)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
});

export default BrandGrid;
