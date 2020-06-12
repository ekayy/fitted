import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { logout } from '../Redux/UserRedux';

class ProfileSettings extends Component {
  signOutAsync = async () => {
    this.props.logout();
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <ListItem
          chevron
          title="Edit profile"
          leftIcon={{ name: 'ios-create', type: 'ionicon' }}
          onPress={() => {
            navigate('Edit Profile');
          }}
        />
        <ListItem
          chevron
          title="Change password"
          leftIcon={{ name: 'ios-lock', type: 'ionicon' }}
          onPress={() => {
            navigate('Change Password');
          }}
        />
        <ListItem
          chevron
          title="Change email address"
          leftIcon={{ name: 'ios-mail', type: 'ionicon' }}
          onPress={() => {
            navigate('Change Email');
          }}
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

export default connect(null, { logout })(ProfileSettings);
