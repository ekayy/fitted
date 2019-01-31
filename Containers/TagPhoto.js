import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import SearchGarments from './SearchGarments';
import { connect } from 'react-redux';
import { fetchGarments } from '../Redux/GarmentsRedux';
import styles from './Styles/TagPhotoStyles';
import { AppStyles, Colors } from '../Themes';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Fit = t.struct({
  profile: t.String,
  style: t.maybe(t.String),
  photo: t.String,
  garments: t.String
});

const Garment = t.struct({
  color: t.String,
  sku: t.String,
  model: t.String,
  photo: t.String
});

class TagPhoto extends Component {
  state = {
    modalVisible: false,
    searchTerm: '',
    garments: [],
    results: [],
    remainingResults: [],
    error: null,
    loading: false,
    refreshing: false,
    limit: 9999
  };

  setModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  addPiece = () => {
    const value = this.refs.form.getValue();
    if (value) {
      console.tron.log(value);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { image } = this.props.navigation.state.params;

    return (
      <ScrollView style={AppStyles.container}>
        <View style={AppStyles.section}>
          <View style={styles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Garments</Text>
            </View>

            <TouchableOpacity
              style={AppStyles.sectionSubtitle}
              onPress={() => navigate('SearchGarments')}
            >
              <Ionicons
                name="ios-add-circle"
                size={25}
                style={{ marginRight: 10, color: '#aaa' }}
              />
              <Text>Add a garment</Text>
            </TouchableOpacity>

            <View style={styles.formRow}>
              <View style={styles.product}>
                <View style={styles.productImage}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
                <View style={styles.productAttributes}>
                  <Text>
                    Acne Studios{'\n'}
                    Chelsea Boots{'\n'}
                    Brown
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={AppStyles.sectionSubtitle}>
                <Ionicons
                  name="ios-add"
                  size={25}
                  style={{ marginRight: 10, color: '#aaa' }}
                />
                <Text>Add size</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={AppStyles.button}>
            <Button
              title="Share"
              buttonStyle={[AppStyles.buttonDefaultStyle]}
              titleStyle={AppStyles.buttonDefaultTitleStyle}
              onPress={() => navigate('SearchGarments')}
            />
          </View>
        </View>

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={styles.modal}>
            <TouchableHighlight
              onPress={this.setModalVisible}
              style={styles.close}
            >
              <Ionicons
                name="ios-close"
                size={50}
                color="#000"
                style={styles.close}
              />
            </TouchableHighlight>

            {/*}<Form ref="form" type={Fit} />*/}
            <Button title="Add Piece" onPress={this.addPiece} />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    garments: state.garments.items
  };
};

export default connect(
  mapStateToProps,
  {
    fetchGarments
  }
)(TagPhoto);
