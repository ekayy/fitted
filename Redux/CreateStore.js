import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import * as Config from '../Config';

// creates the store
export default rootReducer => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Thunk Middleware ------------- */

  middleware.push(thunk);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const createAppropriateStore = Config.useReactotron
    ? Reactotron.createStore
    : createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));
  const persistor = persistStore(store);

  return { persistor, store };
};
