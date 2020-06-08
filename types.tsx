import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from './Navigation/SearchStack';
import { ProfileStackParamList } from './Navigation/ProfileStack';

import {
  FETCH_BRANDS_BEGIN,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
} from './Redux/BrandsRedux';
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
} from './Redux/FitsRedux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  LOGIN_CLEAR_ERROR,
  FAVORITE_ITEM,
  UNFAVORITE_ITEM,
} from './Redux/UserRedux';

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './Redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AuthParamList } from './Navigation/AuthStack';
import {
  FETCH_GARMENTS_BEGIN,
  FETCH_GARMENTS_SUCCESS,
  FETCH_GARMENTS_FAILURE,
  CREATE_GARMENT_BEGIN,
  CREATE_GARMENT_SUCCESS,
  CREATE_GARMENT_FAILURE,
  FETCH_FIT_GARMENTS_BEGIN,
  FETCH_FIT_GARMENTS_SUCCESS,
  FETCH_FIT_GARMENTS_FAILURE,
} from './Redux/GarmentsRedux';

type SearchRouteProp = RouteProp<SearchStackParamList, 'Search'>;
type SearchNavigationProp = StackNavigationProp<SearchStackParamList, 'Search'>;

export type SearchProps = {
  route: SearchRouteProp;
  navigation: SearchNavigationProp;
};

type GarmentDetailRouteProp = RouteProp<SearchStackParamList, 'Garment Detail'>;
type GarmentDetailNavigationProp = StackNavigationProp<SearchStackParamList, 'Garment Detail'>;

export type GarmentDetailProps = {
  route: GarmentDetailRouteProp;
  navigation: GarmentDetailNavigationProp;
};

type FitDetailRouteProp = RouteProp<SearchStackParamList, 'Fit Detail'>;
type FitDetailNavigationProp = StackNavigationProp<SearchStackParamList, 'Fit Detail'>;

export type FitDetailProps = {
  route: FitDetailRouteProp;
  navigation: FitDetailNavigationProp;
};

type FitsRouteProp = RouteProp<SearchStackParamList, 'Fits'>;
type FitsNavigationProp = StackNavigationProp<SearchStackParamList, 'Fits'>;

export type FitsProps = {
  route: FitsRouteProp;
  navigation: FitsNavigationProp;
};

type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;

export type ProfileProps = {
  route: ProfileRouteProp;
  navigation: ProfileNavigationProp;
};

type LoginRouteProp = RouteProp<AuthParamList, 'Login'>;
type LoginNavigationProp = StackNavigationProp<AuthParamList, 'Login'>;

export type LoginProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
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

export interface BrandState {
  error: string | null;
  loading: boolean;
  items: Brand[];
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

export interface GarmentState {
  items: Garment[];
  loading: boolean;
  error: string | null;
  fitGarments: Garment[];
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

export interface FitState {
  createdFit: boolean | null;
  error: string | null;
  garmentId: number | null;
  items: Fit[];
  loading: boolean;
  taggedGarments: number[];
}

export interface UserState {
  error: string | null;
  favoriteFits: number[];
  favoriteGarments: number[];
  height: number | null;
  isFavorite: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  profileId: number | null;
  token: string | null;
  user: Profile | null;
  weight: number | null;
}

export interface Profile {
  username: string;
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

export interface CommentState {
  error: string;
  loading: boolean;
  items: Comment[];
  content: string;
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

export interface FavoriteGarmentParams {
  token: string;
  profileId: number;
  favoriteGarments: number[];
}

export interface FavoriteFitParams {
  token: string;
  profileId: number;
  favoriteFits: number[];
}

// Action Creator Types
interface FetchBrandsBeginAction {
  type: typeof FETCH_BRANDS_BEGIN;
}

interface FetchBrandsSuccessAction {
  type: typeof FETCH_BRANDS_SUCCESS;
  payload: Brand[];
}

interface FetchBrandsFailureAction {
  type: typeof FETCH_BRANDS_FAILURE;
  payload: Pick<BrandState, 'error'>;
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
  payload: Fit;
}

interface CreateFitFailureAction {
  type: typeof CREATE_FIT_FAILURE;
  payload: Pick<FitState, 'error'>;
}

interface ClearCreatedFitAction {
  type: typeof CLEAR_CREATED_FIT;
}

interface TagGarmentToFitAction {
  type: typeof TAG_GARMENT_TO_FIT;
  payload: number;
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
  payload: Fit[];
}
interface FetchFitsFailureAction {
  type: typeof FETCH_FITS_FAILURE;
  payload: Pick<FitState, 'error'>;
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

interface FetchGarmentsBeginAction {
  type: typeof FETCH_GARMENTS_BEGIN;
}
interface FetchGarmentsSuccessAction {
  type: typeof FETCH_GARMENTS_SUCCESS;
  payload: Garment[];
}
interface FetchGarmentsFailureAction {
  type: typeof FETCH_GARMENTS_FAILURE;
  payload: Pick<GarmentState, 'error'>;
}

interface FetchFitGarmentsBeginAction {
  type: typeof FETCH_FIT_GARMENTS_BEGIN;
}
interface FetchFitGarmentsSuccessAction {
  type: typeof FETCH_FIT_GARMENTS_SUCCESS;
  payload: Garment[];
}
interface FetchFitGarmentsFailureAction {
  type: typeof FETCH_FIT_GARMENTS_FAILURE;
  payload: Pick<GarmentState, 'error'>;
}

interface CreateGarmentBeginAction {
  type: typeof CREATE_GARMENT_BEGIN;
}
interface CreateGarmentSuccessAction {
  type: typeof CREATE_GARMENT_SUCCESS;
}
interface CreateGarmentFailureAction {
  type: typeof CREATE_GARMENT_FAILURE;
  payload: GarmentState;
}

export type GarmentActionTypes =
  | FetchGarmentsBeginAction
  | FetchGarmentsSuccessAction
  | FetchGarmentsFailureAction
  | FetchFitGarmentsBeginAction
  | FetchFitGarmentsSuccessAction
  | FetchFitGarmentsFailureAction
  | CreateGarmentBeginAction
  | CreateGarmentSuccessAction
  | CreateGarmentFailureAction;

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: Pick<UserState, 'token' | 'profileId'>;
}
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: Pick<UserState, 'error'>;
}
interface LogoutAction {
  type: typeof LOGOUT;
}
interface LoginClearErrorAction {
  type: typeof LOGIN_CLEAR_ERROR;
}

interface ProfileRequestAction {
  type: typeof PROFILE_REQUEST;
}
interface ProfileSuccessAction {
  type: typeof PROFILE_SUCCESS;
  payload: Pick<UserState, 'user' | 'favoriteGarments' | 'favoriteFits' | 'height' | 'weight'>;
}
interface ProfileFailureAction {
  type: typeof PROFILE_FAILURE;
  payload: Pick<UserState, 'error'>;
}

interface FavoriteRequestAction {
  type: typeof FAVORITE_REQUEST;
}
interface FavoriteSuccessAction {
  type: typeof FAVORITE_SUCCESS;
  payload: Pick<UserState, 'favoriteGarments' | 'favoriteFits'>;
}
interface FavoriteFailureAction {
  type: typeof FAVORITE_FAILURE;
  payload: Pick<UserState, 'error'>;
}

interface FavoriteItemAction {
  type: typeof FAVORITE_ITEM;
  payload: UserState;
}
interface UnfavoriteItemAction {
  type: typeof UNFAVORITE_ITEM;
  payload: UserState;
}

export type UserActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | LoginClearErrorAction
  | ProfileRequestAction
  | ProfileSuccessAction
  | ProfileFailureAction
  | FavoriteRequestAction
  | FavoriteSuccessAction
  | FavoriteFailureAction
  | FavoriteItemAction
  | UnfavoriteItemAction;
