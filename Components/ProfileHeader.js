import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import styles from './Styles/ProfileHeaderStyles';

class ProfileHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { first_name, last_name, username } = this.props.user.profile;
    const { height, weight } = this.props.user;

    const feetFromInches = Math.floor(height / 12);
    const inchesRemainder = height % 12;
    const imperialHeight = `${feetFromInches}' ${inchesRemainder}"`;

    return (
      <ImageBackground
        source={{
          uri:
            'https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx'
        }}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          onPress={() => navigate('ProfileSettings')}
          style={styles.settingsIcon}
        >
          <View>
            <Ionicons
              name="ios-settings"
              size={20}
              color="#fff"
              style={{
                backgroundColor: 'transparent'
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Avatar
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
          </Text>
          <Text style={styles.headerText}>@{username}</Text>
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
          <View style={styles.descriptionItem}>
            <Text style={styles.descriptionText}>Followers</Text>
          </View>
          <View style={styles.descriptionItem}>
            <Text style={styles.descriptionText}>Following</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default ProfileHeader;
