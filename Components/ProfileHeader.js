import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import styles from './Styles/ProfileHeaderStyles';

class ProfileHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { height, weight, user } = this.props.user;

    const feetFromInches = Math.floor(height / 12);
    const inchesRemainder = height % 12;
    const imperialHeight = `${feetFromInches}' ${inchesRemainder}"`;

    return (
      <ImageBackground
        source={{
          uri:
            'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350',
        }}
        style={styles.backgroundImage}
      >
        <TouchableOpacity onPress={() => navigate('Profile Settings')} style={styles.settingsIcon}>
          <View>
            <Ionicons
              name="ios-settings"
              size={20}
              color="#fff"
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.header}>
          {/*<Avatar
            large
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
            }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text style={styles.headerText}>
            {first_name} {last_name}
          </Text>*/}
          <Text style={styles.headerText}>@{user && user['username']}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionItem}>
            <Text style={styles.descriptionText}>Height</Text>
            <Text style={styles.descriptionText}>{imperialHeight}</Text>
          </View>
          <View style={styles.descriptionItem}>
            <Text style={styles.descriptionText}>Weight</Text>
            <Text style={styles.descriptionText}>{weight} lbs</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ProfileHeader;
