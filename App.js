import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './Redux';
import './Config/ReactotronConfig';
import Reactotron from 'reactotron-react-native';
import RootContainer from './Containers/RootContainer';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
