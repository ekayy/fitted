import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from './Navigation/SearchStack';

import { FETCH_BRANDS_BEGIN, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from './BrandsRedux';
import {
  CREATE_FIT_BEGIN,
  CREATE_FIT_SUCCESS,
  CREATE_FIT_FAILURE,
  CLEAR_CREATED_FIT,
  TAG_GARMENT_TO_FIT,
  REMOVE_GARMENT_FROM_FIT,
  FETCH_FITS_BEGIN,
  FETCH_FITS_SUCCESS,
  FETCH_FITS_FAILURE,
} from './FitsRedux';

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

type GarmentDetailRouteProp = RouteProp<SearchStackParamList, 'Garment Detail'>;
type GarmentDetailNavigationProp = StackNavigationProp<SearchStackParamList, 'Garment Detail'>;

export type GarmentDetailProps = {
  route: GarmentDetailRouteProp;
  navigation: GarmentDetailNavigationProp;
};

// https://redux.js.org/recipes/usage-with-typescript
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface Brand {
  id: number;
  name: string;
}

export interface Garment {
  id: number;
  color: string;
  sku: string;
  brand: number;
  brand_name: string;
  model: string;
  photo: string;
  purchase_page: string;
  comments: Comment[];
}

export interface Fit {
  id: number;
  created_date: string;
  profile: number;
  description: string;
  style?: string;
  photo: string;
  likes: number[];
  garments: number[];
  height: number;
  weight: number;
}

export interface User {
  error: string;
  token: string;
  profileId: number;
  isLoggedIn: boolean;
  height: number;
  weight: number;
  loading: boolean;
  profile: Profile;
  favoriteGarments: number[];
  favoriteFits: number[];
}

export interface Profile {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  username: string;
  created_date: string;
}

export interface Reply {
  id: number;
  created_date: string;
  profile: number;
  comment: number;
  content: string;
  upvotes: number;
  downvotes: number;
}

export interface BrandState {
  error: string;
  loading: boolean;
  items: Brand[];
}

export interface CommentState {
  error: string;
  loading: boolean;
  items: Comment[];
  content: string;
}

export interface GarmentState {
  items: Garment[];
  loading: boolean;
  error: string;
}

export interface FitState {
  createdFit: Boolean;
  taggedGarments: number[];
  loading: boolean;
  error: string;
  garmentId: number;
  items: Fit[];
}

// Action Creator Types
interface FetchBrandsBeginAction {
  type: typeof FETCH_BRANDS_BEGIN;
}

interface FetchBrandsSuccessAction {
  type: typeof FETCH_BRANDS_SUCCESS;
  payload: BrandState;
}

interface FetchBrandsFailureAction {
  type: typeof FETCH_BRANDS_FAILURE;
  payload: BrandState;
}

export type BrandActionTypes =
  | FetchBrandsBeginAction
  | FetchBrandsSuccessAction
  | FetchBrandsFailureAction;

interface CreateFitBeginAction {
  type: typeof CREATE_FIT_BEGIN;
}

interface CreateFitBeginAction {
  type: typeof CREATE_FIT_BEGIN;
}

interface CreateFitSuccessAction {
  type: typeof CREATE_FIT_SUCCESS;
  payload: FitState;
}

interface CreateFitFailureAction {
  type: typeof CREATE_FIT_FAILURE;
  payload: FitState;
}

interface ClearCreatedFitAction {
  type: typeof CLEAR_CREATED_FIT;
}

interface TagGarmentToFitAction {
  type: typeof TAG_GARMENT_TO_FIT;
  payload: FitState;
}

interface RemoveGarmentFromFitAction {
  type: typeof REMOVE_GARMENT_FROM_FIT;
  payload: FitState;
}

interface FetchFitsBeginAction {
  type: typeof FETCH_FITS_BEGIN;
}
interface FetchFitsSuccessAction {
  type: typeof FETCH_FITS_SUCCESS;
  payload: FitState;
}
interface FetchFitsFailureAction {
  type: typeof FETCH_FITS_FAILURE;
  payload: FitState;
}

export type FitActionTypes =
  | CreateFitBeginAction
  | CreateFitSuccessAction
  | CreateFitFailureAction
  | ClearCreatedFitAction
  | TagGarmentToFitAction
  | RemoveGarmentFromFitAction
  | FetchFitsBeginAction
  | FetchFitsSuccessAction
  | FetchFitsFailureAction;
