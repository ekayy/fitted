import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import FitsGrid from '../Components/FitsGrid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { tagGarmentToFit, clearCreatedFit } from '../Redux/FitsRedux';
import { FitsProps, useTypedSelector } from '../types';
import { useDispatch } from 'react-redux';

const Fits: React.FC<FitsProps> = ({ route, navigation }) => {
  // Navigation params

  // Redux state
  // const { items: brands } = useTypedSelector((state) => state.brands);
  const { items: fits } = useTypedSelector((state) => state.fits);

  // State
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // set header navigation button
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPress} style={{ marginRight: 20 }}>
          <Ionicons name="ios-camera" size={40} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onPress = async () => {
    setError(null);

    await dispatch(clearCreatedFit());
    await dispatch(tagGarmentToFit(route.params));

    navigation.navigate('Create Discussion', {
      screen: 'Camera',
    });
  };

  return (
    <FitsGrid
      data={fits}
      navigation={navigation}
      handleLoadMore={() => {}}
      onRefresh={() => {}}
      refreshing={refreshing}
      loading={loading}
      numCol={3}
    />
  );
};

export default Fits;
