import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './Redux';
import RootContainer from './Containers/RootContainer';

if (__DEV__) {
  import('./Config/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const { store, persistor } = createStore();

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from 'react-native-screens';
enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  );
};

const SHOW_STORYBOOK = false;

let RootComponent = App;
if (__DEV__ && SHOW_STORYBOOK) {
  // Only include Storybook if we're in dev mode
  const StorybookUIRoot = require('./storybook').default;
  RootComponent = StorybookUIRoot;
}

export default RootComponent;
