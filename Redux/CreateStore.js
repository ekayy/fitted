import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import Reactotron from '../Config/ReactotronConfig';
import thunk from 'redux-thunk';

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Thunk Middleware ------------- */

  middleware.push(thunk);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // const createAppropriateStore = Config.useReactotron
  //   ? Reactotron.createStore
  //   : createStore;
  const store = createStore(rootReducer, compose(...enhancers, Reactotron.createEnhancer()));
  const persistor = persistStore(store);

  return { persistor, store };
};
