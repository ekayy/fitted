import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
// import createStore from './Redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './Redux';
import './Config/ReactotronConfig';
import Reactotron from 'reactotron-react-native';
import RootContainer from './Containers/RootContainer';

const { store, persistor } = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
