// import createSecureStore from 'redux-persist-expo-securestore';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import { persistReducer } from 'redux-persist';

import user from './UserRedux';
import garments from './GarmentsRedux';
import fits from './FitsRedux';
import comments from './CommentsRedux';
import brands from './BrandsRedux';
import profiles from './ProfilesRedux';
import search from './SearchRedux';
import activity from './ActivityRedux';

const persistConfig = {
  key: 'root',
  storage,
};

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  user,
  garments,
  fits,
  comments,
  brands,
  profiles,
  search,
  activity,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState) => {
  return configureStore(persistedReducer, initialState);
};

export type RootState = ReturnType<typeof rootReducer>;
