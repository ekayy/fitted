import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list = [
  {
    title: 'Edit profile',
    icon: 'ios-create-outline'
  },
  {
    title: 'Change password',
    icon: 'ios-lock-outline'
  },
  {
    title: 'Change email address',
    icon: 'ios-mail-outline'
  },
  {
    title: 'Log out',
    icon: 'ios-log-out',
    route: 'logout'
  }
];

class ProfileSettings extends Component {
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <List>
        <ListItem
          title="Edit profile"
          leftIcon={{ name: 'ios-create-outline', type: 'ionicon' }}
          onPress={() => {
            navigate('ProfileSettingsEdit');
          }}
        />
        <ListItem
          title="Change password"
          leftIcon={{ name: 'ios-lock-outline', type: 'ionicon' }}
          onPress={() => {}}
        />
        <ListItem
          title="Change email address"
          leftIcon={{ name: 'ios-mail-outline', type: 'ionicon' }}
          onPress={() => {}}
        />
        <ListItem
          hideChevron
          title="Log out"
          leftIcon={{ name: 'ios-log-out', type: 'ionicon' }}
          onPress={this.signOutAsync}
        />
      </List>
    );
  }
}

export default ProfileSettings;
