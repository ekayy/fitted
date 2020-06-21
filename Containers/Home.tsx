import React, { useState } from 'react';
import { View } from 'react-native';
import BrandGrid from '../Components/BrandGrid';
import { Brand, UserState } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  brands?: Brand[];
  brandTable?: any[];
  user?: UserState;
  navigation?: StackNavigationProp<any, any>;
}

const Home: React.FC<Props> = (props) => {
  const { brandTable, navigation, user } = props;

  // State
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRefresh = () => {};

  const handleLoadMore = () => {};

  return (
    <View style={styles.container}>
      <BrandGrid
        brandTable={brandTable}
        navigation={navigation}
        numCol={2}
        handleLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        loading={loading}
        user={user}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
};

export default Home;
