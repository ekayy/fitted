import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import BrandsRedux from './BrandsRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    brands: BrandsRedux
  });

  return configureStore(rootReducer);
};
