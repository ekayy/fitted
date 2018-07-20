import { createStore, applyMiddleware, compose } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';

// creates the store
export default rootReducer => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Thunk Middleware ------------- */

  middleware.push(thunk);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const store = Reactotron.createStore(rootReducer, compose(...enhancers));

  return store;
};
