import React from 'react';
import { View } from 'react-native';
import BrandGrid from '../Components/BrandGrid';
import { Brand } from '../types';

interface Props {
  brands?: Brand[];
  brandTable: any[];
}

const Home: React.FC<Props> = (props) => {
  const { brandTable } = props;

  // State
  // const [error, setError] = useState<string | null>(null);
  // const [refreshing, setRefreshing] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  const handleRefresh = () => {};

  const handleLoadMore = () => {};

  return (
    <View style={styles.container}>
      <BrandGrid
        brandTable={brandTable}
        handleLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        refreshing={false}
        loading={false}
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
