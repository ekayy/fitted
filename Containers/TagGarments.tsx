import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeGarmentFromFit, createFit, clearCreatedFit } from '../Redux/FitsRedux';
import { fetchBrands } from '../Redux/BrandsRedux';
import styles from './Styles/TagGarmentsStyles';
import { AppStyles } from '../Themes';
// import { StackActions, NavigationActions } from '@react-navigation/native';
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
    // const { navigate, dispatch } = this.props.navigation;
    // const { image } = this.props.route.params;
    // const { taggedGarments, profileId, createFit, clearCreatedFit } = this.props;
    // const { description } = this.state;

    // const garmentIds = taggedGarments.map((item) => item);

    // post fit to api
    // TODO: to remove required like to allow post with no initial likes
    // TODO: set up s3 for image upload
    if (garmentIds.length > 0) {
      await createFit({
        profile: profileId,
        photo: image,
        likes: [1],
        garments: taggedGarments,
        description,
      });

      setDescription('');

      // reset navigation to Camera route on successful fit creation
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'Camera' })],
      // });
      // dispatch(resetAction);

      // navigate to newly created Fit
      navigation.navigate('Fit Detail', createdFit);

      // reset fit redux
      clearCreatedFit();
    } else {
      setError('You must tag a garment to this fit');
    }
  };

  const renderGarment = (rowData, rowMap) => {
    const { id, brand, model, photo } = rowData.item;
    const brandName = brands[brand].name;

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
        onChangeText={(description) => setDescription(description)}
        value={description}
        style={styles.textArea}
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
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Searching Database',
  //     headerRight: (
  //       <TouchableOpacity
  //         onPress={navigation.getParam('searchGarments')}
  //         style={{
  //           marginRight: 20,
  //         }}
  //       >
  //         <Ionicons name="ios-add" size={40} color="#000" />
  //       </TouchableOpacity>
  //     ),
  //   };
  // };

  // state = {
  //   description: null,
  //   error: null,
  //   loading: false,
  //   refreshing: false,
  // };

  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     searchGarments: this._searchGarments,
  //   });

  //   this.props.fetchBrands();
  // }

  // _searchGarments = () => {
  //   this.setState({ error: null });
  //   this.props.navigation.navigate('SearchGarments');
  // };

  // shareFit = async () => {
  //   const { navigate, dispatch } = this.props.navigation;
  //   const { image } = this.props.route.params;
  //   const { taggedGarments, profileId, createFit, clearCreatedFit } = this.props;
  //   const { description } = this.state;

  //   const garmentIds = taggedGarments.map((item) => item.id);

  //   // post fit to api
  //   // TODO: to remove required like to allow post with no initial likes
  //   // TODO: set up s3 for image upload
  //   if (garmentIds.length > 0) {
  //     await createFit({
  //       profile: profileId,
  //       photo: image,
  //       likes: [1],
  //       garments: garmentIds,
  //       description,
  //     });

  //     this.setState({ description: null });

  //     // reset navigation to Camera route on successful fit creation
  //     const resetAction = StackActions.reset({
  //       index: 0,
  //       actions: [NavigationActions.navigate({ routeName: 'Camera' })],
  //     });
  //     dispatch(resetAction);

  //     // navigate to newly created Fit
  //     navigate('FitDetail', this.props.createdFit);

  //     // reset fit redux
  //     clearCreatedFit();
  //   } else {
  //     this.setState({
  //       error: 'You must tag a garment to this fit',
  //     });
  //   }
  // };

  // render() {
  //   const { navigate } = this.props.navigation;
  //   // user captured image
  //   const { image } = this.props.route.params;
  //   const { taggedGarments, refreshing } = this.props;

  //   return (
  //     <ScrollView style={AppStyles.container}>
  //       <View style={AppStyles.section}>
  //         <View style={styles.section}>
  //           <View style={styles.capturedPhotoSection}>
  //             <Image source={{ uri: image }} style={styles.photo} />

  //             <TextInput
  //               multiline={true}
  //               numberOfLines={4}
  //               placeholder="Describe your fit here!"
  //               onChangeText={(description) => this.setState({ description })}
  //               value={this.state.description}
  //               style={styles.textArea}
  //             />
  //           </View>

  //           {/* <TouchableOpacity
  //             style={AppStyles.sectionSubtitle}
  //             onPress={() => navigate('SearchGarments')}
  //           >
  //             <Ionicons
  //               name="ios-add-circle"
  //               size={25}
  //               style={{ marginRight: 10, color: '#aaa' }}
  //             />
  //             <Text>Add a garment</Text>
  //           </TouchableOpacity> */}

  //           <SwipeListView
  //             data={taggedGarments}
  //             keyExtractor={(item, index) => index.toString()}
  //             numColumns={1}
  //             renderItem={this.renderGarment}
  //             renderHiddenItem={this.renderHiddenItem}
  //             onRowOpen={this.onRowOpen}
  //             rightOpenValue={-150}
  //             onEndReached={this.handleLoadMore}
  //             onEndReachedThreshold={0}
  //             refreshing={refreshing}
  //             initialNumToRender={10}
  //             maxToRenderPerBatch={10}
  //           />
  //         </View>

  //         <View style={AppStyles.button}>
  //           <Button
  //             title="Share"
  //             buttonStyle={[AppStyles.buttonDefaultStyle]}
  //             titleStyle={AppStyles.buttonDefaultTitleStyle}
  //             onPress={this.shareFit}
  //           />
  //         </View>
  //         <Text style={AppStyles.error}>{this.state.error}</Text>
  //       </View>
  //     </ScrollView>
  //   );
  // }

  // renderGarment = (rowData, rowMap) => {
  //   const { brands } = this.props;

  //   console.log(rowData);

  //   const { id, brand, model, photo } = rowData.item;
  //   const brandName = brands[brand].name;

  //   return (
  //     <View style={styles.formRow} key={id}>
  //       <View style={styles.product}>
  //         <View style={styles.productImage}>
  //           <Image source={{ uri: photo }} style={{ width: 80, height: 80 }} />
  //         </View>
  //         <View style={styles.productAttributes}>
  //           <Text>
  //             {brandName}
  //             {'\n'}
  //             {model}
  //           </Text>
  //         </View>
  //       </View>

  //       {/* <TouchableOpacity style={AppStyles.sectionSubtitle}>
  //         <Ionicons
  //           name="ios-add"
  //           size={25}
  //           style={{ marginRight: 10, color: '#aaa' }}
  //         />
  //         <Text>Add size</Text>
  //       </TouchableOpacity> */}
  //     </View>
  //   );
  // };

  // // render swipe list view to delete
  // renderHiddenItem = (rowData, rowMap) => {
  //   const { id } = rowData.item;

  //   return (
  //     <View style={styles.rowBack}>
  //       <TouchableOpacity
  //         style={styles.rightBtn}
  //         onPress={(_) => this.props.removeGarmentFromFit(id)}
  //       >
  //         <Text style={styles.rightBtnText}>Delete</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // // Close swiped row after time
  // onRowOpen = (rowKey, rowMap) => {
  //   setTimeout(() => {
  //     if (rowMap[rowKey]) {
  //       rowMap[rowKey].closeRow();
  //     }
  //   }, 3000);
  // };
};

// const mapStateToProps = (state) => {
//   return {
//     taggedGarments: state.fits.taggedGarments,
//     createdFit: state.fits.createdFit,
//     profileId: state.user.profileId,
//     brands: state.brands.items,
//   };
// };

// export default connect(mapStateToProps, {
//   removeGarmentFromFit,
//   createFit,
//   clearCreatedFit,
//   fetchBrands,
// })(TagGarments);

export default TagGarments;
