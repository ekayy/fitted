import { createStore, applyMiddleware, compose } from 'redux';
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

  const store = createStore(rootReducer, compose(...enhancers));

  return store;
};
