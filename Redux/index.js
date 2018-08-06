import { combineReducers } from 'redux';
import configureStore from './CreateStore';
// import navigation from './NavigationRedux';
import user from './UserRedux';
// import profiles from './ProfilesRedux';
// import brands from './BrandsRedux';
// import garments from './GarmentsRedux';
// import fits from './FitsRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    // navigation,
    user
    // profiles
    // brands,
    // garments,
    // fits
  });

  return configureStore(rootReducer);
};
