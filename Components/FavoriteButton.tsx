import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const FavoriteButton: React.FC<{ onPress(): void; toggled: boolean }> = ({
  onPress,
  toggled,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ alignItems: 'center' }}>
        <MaterialIcons
          name={toggled ? 'bookmark' : 'bookmark-border'}
          size={30}
          color="#000"
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </TouchableOpacity>
  );
};
