import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import brands from './BrandsRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    brands
  });

  return configureStore(rootReducer);
};
