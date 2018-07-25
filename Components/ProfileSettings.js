import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

class ProfileSettings extends Component {
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <ListItem
          chevron
          title="Edit profile"
          leftIcon={{ name: 'ios-create-outline', type: 'ionicon' }}
          onPress={() => {
            navigate('ProfileSettingsEdit');
          }}
        />
        <ListItem
          chevron
          title="Change password"
          leftIcon={{ name: 'ios-lock-outline', type: 'ionicon' }}
          onPress={() => {}}
        />
        <ListItem
          chevron
          title="Change email address"
          leftIcon={{ name: 'ios-mail-outline', type: 'ionicon' }}
          onPress={() => {}}
        />
        <ListItem
          title="Log out"
          leftIcon={{ name: 'ios-log-out', type: 'ionicon' }}
          onPress={this.signOutAsync}
        />
      </View>
    );
  }
}

export default ProfileSettings;
