import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { removeGarmentFromFit, createFit } from '../Redux/FitsRedux';
import styles from './Styles/TagGarmentsStyles';
import { AppStyles } from '../Themes';
import { brands } from '../data.json';

class TagGarments extends Component {
  state = {
    modalVisible: false,
    error: null,
    loading: false,
    refreshing: false
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

  shareFit = () => {
    const { navigate } = this.props.navigation;
    const { image } = this.props.navigation.state.params;
    const { taggedGarments, profileId, createFit } = this.props;

    const garmentIds = taggedGarments.map(item => item.id);

    // post fit to api
    // TODO: to remove required like to allow post with no initial likes
    // TODO: set up s3 for image upload
    createFit({
      profile: profileId,
      photo: image,
      likes: [1],
      garments: garmentIds
    });

    // navigate to newly created Fit
    // navigate('FitDetail', );
  };

  render() {
    const { navigate } = this.props.navigation;
    // user captured image
    const { image } = this.props.navigation.state.params;
    const { taggedGarments, refreshing } = this.props;

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

            <SwipeListView
              data={taggedGarments}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              renderItem={this.renderGarment}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-150}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  if (rowMap[rowKey]) {
                    rowMap[rowKey].closeRow();
                  }
                }, 3000);
              }}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              refreshing={refreshing}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
            />
          </View>

          <View style={AppStyles.button}>
            <Button
              title="Share"
              buttonStyle={[AppStyles.buttonDefaultStyle]}
              titleStyle={AppStyles.buttonDefaultTitleStyle}
              onPress={this.shareFit}
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

  renderGarment = (rowData, rowMap) => {
    const { id, brand, model, photo } = rowData.item;

    const brandName = brands[brand].name;

    return (
      <View style={styles.formRow} key={id}>
        <View style={styles.product}>
          <View style={styles.productImage}>
            <Image source={{ uri: photo }} style={{ width: 80, height: 80 }} />
          </View>
          <View style={styles.productAttributes}>
            <Text>
              {brandName}
              {'\n'}
              {model}
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
    );
  };

  // render swipe list view to delete
  renderHiddenItem = (rowData, rowMap) => {
    const { id } = rowData.item;

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.rightBtn}
          onPress={_ => this.props.removeGarmentFromFit(id)}
        >
          <Text style={styles.rightBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return {
    taggedGarments: state.fits.taggedGarments,
    profileId: state.user.profileId
  };
};

export default connect(
  mapStateToProps,
  {
    removeGarmentFromFit,
    createFit
  }
)(TagGarments);
