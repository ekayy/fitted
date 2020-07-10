import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import Reactotron from '../Config/ReactotronConfig';
import thunk from 'redux-thunk';
import Config from '../Config';

// creates the store
export default (rootReducer, initialState) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Thunk Middleware ------------- */

  middleware.push(thunk);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore;

  // if (Config.useReactotron) {
  // enhancers.push(Reactotron.createEnhancer());
  // }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createAppropriateStore(rootReducer, initialState, composeEnhancers(...enhancers));

  const persistor = persistStore(store);

  return { persistor, store };
};
