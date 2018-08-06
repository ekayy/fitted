import { combineReducers } from 'redux';
import configureStore from './CreateStore';
// import navigation from './NavigationRedux';
import login from './LoginRedux';
import profiles from './ProfilesRedux';
// import brands from './BrandsRedux';
// import garments from './GarmentsRedux';
// import fits from './FitsRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    // navigation,
    login,
    profiles
    // brands,
    // garments,
    // fits
  });

  return configureStore(rootReducer);
};
