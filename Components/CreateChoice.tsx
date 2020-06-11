import React from 'react';
import { View } from 'react-native';
import { CreateChoiceProps } from '../types';
import Button from './Forms/Button';

const CreateChoice: React.FC<CreateChoiceProps> = ({ navigation }) => {
  // const showAlert = () => {
  //   Alert.alert(
  //     'Discuss Garment / Upload Fit',
  //     '',
  //     [
  //       {
  //         text: 'Start a new discussion',
  //         // onPress: () => {
  //         //   // defaultHandler();
  //         // },
  //       },
  //       {
  //         text: 'Upload a new fit photo',
  //         onPress: () => {
  //           navigation.navigate('Camera');
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <Button
          title="Start a new discussion"
          onPress={() => navigation.navigate('Create Discussion')}
        />
      </View>

      <View style={{ flex: 0.5 }}>
        <Button
          title="Upload a new fit photo"
          primary
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </View>
  );
};

export default CreateChoice;
