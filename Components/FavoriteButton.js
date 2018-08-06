import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/FavoriteButtonStyles';
import { Ionicons } from '@expo/vector-icons';

class FavoriteButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
  };

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     toggled: false
  //   };
  // }

  // toggleItem = () => {
  //   this.setState({ toggled: !this.state.toggled });
  // };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ alignItems: 'center' }}>
          <Ionicons
            name={this.props.toggled ? 'ios-bookmark' : 'ios-bookmark-outline'}
            size={30}
            color="#000"
            style={{
              backgroundColor: 'transparent'
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FavoriteButton;
