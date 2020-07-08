import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from './Navigation/SearchStack';
import { ProfileStackParamList } from './Navigation/ProfileStack';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './Redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AuthParamList } from './Navigation/AuthStack';

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
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_ISLOGGEDIN,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
} from './Redux/UserRedux';
import {
  FETCH_FAVORITE_GARMENTS_BEGIN,
  FETCH_FAVORITE_GARMENTS_SUCCESS,
  FETCH_FAVORITE_GARMENTS_FAILURE,
  FETCH_FAVORITE_FITS_BEGIN,
  FETCH_FAVORITE_FITS_SUCCESS,
  FETCH_FAVORITE_FITS_FAILURE,
} from './Redux/ProfilesRedux';
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
  CLEAR_CREATED_GARMENT,
} from './Redux/GarmentsRedux';
import { CreateDiscussionStackParamList } from './Navigation/CreateDiscussionStack';
import {
  SEARCH_GARMENTS_BEGIN,
  SEARCH_GARMENTS_FAILURE,
  SEARCH_GARMENTS_SUCCESS,
  SET_BRAND_FILTER,
  CLEAR_SEARCH_FILTERS,
} from './Redux/SearchRedux';
import {
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENT_BEGIN,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_REPLY_BEGIN,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAILURE,
  LOAD_REPLIES_BEGIN,
  LOAD_REPLIES_SUCCESS,
  LOAD_REPLIES_FAILURE,
  UPVOTE_COMMENT_BEGIN,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
  DOWNVOTE_COMMENT_BEGIN,
  DOWNVOTE_COMMENT_SUCCESS,
  DOWNVOTE_COMMENT_FAILURE,
  UPVOTE_REPLY_BEGIN,
  UPVOTE_REPLY_SUCCESS,
  UPVOTE_REPLY_FAILURE,
  DOWNVOTE_REPLY_BEGIN,
  DOWNVOTE_REPLY_SUCCESS,
  DOWNVOTE_REPLY_FAILURE,
} from './Redux/CommentsRedux';
import { RootParamList } from './Navigation/RootNav';
import { ActivityParamList } from './Navigation/ActivityStack';
import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,
} from './Redux/ActivityRedux';

export enum Sort {
  SELECT = 'SELECT',
  RECENT = 'MOST RECENT',
  POPULAR = 'MOST POPULAR',
}

export enum ContentType {
  GARMENT = 'garment',
  FIT = 'fit',
}

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

type RegisterRouteProp = RouteProp<AuthParamList, 'Register'>;
type RegisterNavigationProp = StackNavigationProp<AuthParamList, 'Register'>;

export type RegisterProps = {
  route: RegisterRouteProp;
  navigation: RegisterNavigationProp;
};

type RegisterMeasurementsRouteProp = RouteProp<AuthParamList, 'Register Measurements'>;
type RegisterMeasurementsNavigationProp = StackNavigationProp<
  AuthParamList,
  'Register Measurements'
>;

export type RegisterMeasurementsProps = {
  route: RegisterMeasurementsRouteProp;
  navigation: RegisterMeasurementsNavigationProp;
};

type CreateChoiceRouteProp = RouteProp<CreateDiscussionStackParamList, 'Create Choice'>;
type CreateChoiceNavigationProp = StackNavigationProp<
  CreateDiscussionStackParamList,
  'Create Choice'
>;

export type CreateChoiceProps = {
  route: CreateChoiceRouteProp;
  navigation: CreateChoiceNavigationProp;
};

type CreateDiscussionRouteProp = RouteProp<CreateDiscussionStackParamList, 'Create Discussion'>;
type CreateDiscussionNavigationProp = StackNavigationProp<
  CreateDiscussionStackParamList,
  'Create Discussion'
>;

export type CreateDiscussionProps = {
  route: CreateDiscussionRouteProp;
  navigation: CreateDiscussionNavigationProp;
};

type TagGarmentsRouteProp = RouteProp<CreateDiscussionStackParamList, 'Tag Garments'>;
type TagGarmentsNavigationProp = StackNavigationProp<
  CreateDiscussionStackParamList,
  'Tag Garments'
>;

export type TagGarmentsProps = {
  route: TagGarmentsRouteProp;
  navigation: TagGarmentsNavigationProp;
};

type SearchGarmentsRouteProp = RouteProp<CreateDiscussionStackParamList, 'Search Garments'>;
type SearchGarmentsNavigationProp = StackNavigationProp<
  CreateDiscussionStackParamList,
  'Search Garments'
>;

export type SearchGarmentsProps = {
  route: SearchGarmentsRouteProp;
  navigation: SearchGarmentsNavigationProp;
};

type CommentsRouteProp = RouteProp<RootParamList, 'Comments'>;
type CommentsNavigationProp = StackNavigationProp<RootParamList, 'Comments'>;

export type CommentsProps = {
  route: CommentsRouteProp;
  navigation: CommentsNavigationProp;
};

type ActivityRouteProp = RouteProp<ActivityParamList, 'Activity'>;
type ActivityNavigationProp = StackNavigationProp<ActivityParamList, 'Activity'>;

export type ActivityProps = {
  route: ActivityRouteProp;
  navigation: ActivityNavigationProp;
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
  created_date: string;
  color: string;
  sku: string;
  brand: number;
  brand_name: string;
  model: string;
  photo: string;
  purchase_page: string;
  comments: Comment[];
  favorited_by: number[];
}

export interface GarmentState {
  items: Garment[];
  loading: boolean;
  error: string | null;
  fitGarments: Garment[];
  createdGarment: Garment | null;
}

export interface Fit {
  id: number;
  created_date: string;
  profile: number;
  description: string;
  style?: string;
  photo: string;
  likes?: number[];
  garments: number[];
  height: number;
  weight: number;
}

export interface FitState {
  createdFit: Fit | null;
  error: string | null;
  garmentId: number | null;
  items: Fit[];
  loading: boolean;
  taggedGarments: Garment[];
}

export interface SearchState {
  items: Garment[];
  loading: boolean;
  error: string | null;
  brandIds: number[];
}

export interface UserState {
  error: string | null;
  registerError: string[] | null;
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

export interface ProfileState {
  error?: string | null;
  loading?: boolean;
  favoriteGarments: number[];
  favoriteFits: number[];
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
  object_id: number;
  origin: ContentType;
  replies: Reply[];
}

export interface CommentState {
  error: string | null;
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
  total_votes: number;
}

export interface Activity {
  id: number;
  created_date: string;
  origin: ContentType;
  content_type: number;
  object_id: number;
  profile: number;
  username: string;
  content: string;
  upvotes: number;
  downvotes: number;
  total_votes: number;
  replies: Reply[];
}

export interface ActivityState {
  error: string | null;
  loading: boolean;
  items: Activity[];
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
  payload: Garment;
}

interface RemoveGarmentFromFitAction {
  type: typeof REMOVE_GARMENT_FROM_FIT;
  payload: Pick<FitState, 'garmentId'>;
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
  payload: Garment;
}
interface CreateGarmentFailureAction {
  type: typeof CREATE_GARMENT_FAILURE;
  payload: Pick<GarmentState, 'error'>;
}

interface ClearCreatedGarmentAction {
  type: typeof CLEAR_CREATED_GARMENT;
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
  | CreateGarmentFailureAction
  | ClearCreatedGarmentAction;

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
interface SetIsLoggedInAction {
  type: typeof SET_ISLOGGEDIN;
}
interface LogoutAction {
  type: typeof LOGOUT;
}
interface LoginClearErrorAction {
  type: typeof LOGIN_CLEAR_ERROR;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}
interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}
interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: Pick<UserState, 'registerError'>;
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

interface ProfileUpdateRequestAction {
  type: typeof PROFILE_UPDATE_REQUEST;
}

interface ProfileUpdateSuccessAction {
  type: typeof PROFILE_UPDATE_SUCCESS;
  payload: Pick<UserState, 'user' | 'favoriteGarments' | 'favoriteFits' | 'height' | 'weight'>;
}

interface ProfileUpdateFailureAction {
  type: typeof PROFILE_UPDATE_FAILURE;
  payload: Pick<UserState, 'error'>;
}

export type UserActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SetIsLoggedInAction
  | LogoutAction
  | LoginClearErrorAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | ProfileRequestAction
  | ProfileSuccessAction
  | ProfileFailureAction
  | FavoriteRequestAction
  | FavoriteSuccessAction
  | FavoriteFailureAction
  | FavoriteItemAction
  | UnfavoriteItemAction
  | ProfileUpdateRequestAction
  | ProfileUpdateSuccessAction
  | ProfileUpdateFailureAction;

interface FetchFavoriteGarmentsBeginAction {
  type: typeof FETCH_FAVORITE_GARMENTS_BEGIN;
}
interface FetchFavoriteGarmentsSuccessAction {
  type: typeof FETCH_FAVORITE_GARMENTS_SUCCESS;
  payload: Pick<ProfileState, 'favoriteGarments'>;
}
interface FetchFavoriteGarmentsFailureAction {
  type: typeof FETCH_FAVORITE_GARMENTS_FAILURE;
  payload: Pick<ProfileState, 'error'>;
}
interface FetchFavoriteFitsBeginAction {
  type: typeof FETCH_FAVORITE_FITS_BEGIN;
}
interface FetchFavoriteFitsSuccessAction {
  type: typeof FETCH_FAVORITE_FITS_SUCCESS;
  payload: Pick<ProfileState, 'favoriteFits'>;
}
interface FetchFavoriteFitsFailureAction {
  type: typeof FETCH_FAVORITE_FITS_FAILURE;
  payload: Pick<ProfileState, 'error'>;
}

export type ProfileActionTypes =
  | FetchFavoriteGarmentsBeginAction
  | FetchFavoriteGarmentsSuccessAction
  | FetchFavoriteGarmentsFailureAction
  | FetchFavoriteFitsBeginAction
  | FetchFavoriteFitsSuccessAction
  | FetchFavoriteFitsFailureAction;

interface SearchGarmentsBeginAction {
  type: typeof SEARCH_GARMENTS_BEGIN;
}
interface SearchGarmentsSuccessAction {
  type: typeof SEARCH_GARMENTS_SUCCESS;
  payload: Pick<SearchState, 'items'>;
}
interface SearchGarmentsFailureAction {
  type: typeof SEARCH_GARMENTS_FAILURE;
  payload: Pick<SearchState, 'error'>;
}

interface SetBrandFilterAction {
  type: typeof SET_BRAND_FILTER;
  payload: number;
}

interface ClearSearchFilterAction {
  type: typeof CLEAR_SEARCH_FILTERS;
}

export type SearchActionTypes =
  | SearchGarmentsBeginAction
  | SearchGarmentsSuccessAction
  | SearchGarmentsFailureAction
  | SetBrandFilterAction
  | ClearSearchFilterAction;

interface FetchCommentsBeginAction {
  type: typeof FETCH_COMMENTS_BEGIN;
}
interface FetchCommentsSuccessAction {
  type: typeof FETCH_COMMENTS_SUCCESS;
  payload: { comments: Comment[] };
}
interface FetchCommentsFailureAction {
  type: typeof FETCH_COMMENTS_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

interface PostCommentBeginAction {
  type: typeof POST_COMMENT_BEGIN;
}
interface PostCommentSuccessAction {
  type: typeof POST_COMMENT_SUCCESS;
  payload: { comment: Comment };
}
interface PostCommentFailureAction {
  type: typeof POST_COMMENT_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

interface PostReplyBeginAction {
  type: typeof POST_REPLY_BEGIN;
}
interface PostReplySuccessAction {
  type: typeof POST_REPLY_SUCCESS;
  payload: { reply: Reply };
}
interface PostReplyFailureAction {
  type: typeof POST_REPLY_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

interface LoadRepliesBeginAction {
  type: typeof LOAD_REPLIES_BEGIN;
}
interface LoadRepliesSuccessAction {
  type: typeof LOAD_REPLIES_SUCCESS;
  payload: { replies: Reply[] };
}
interface LoadRepliesFailureAction {
  type: typeof LOAD_REPLIES_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

interface UpvoteCommentBeginAction {
  type: typeof UPVOTE_COMMENT_BEGIN;
}
interface UpvoteCommentSuccessAction {
  type: typeof UPVOTE_COMMENT_SUCCESS;
  payload: { comment: Comment };
}
interface UpvoteCommentFailureAction {
  type: typeof UPVOTE_COMMENT_FAILURE;
  payload: Pick<CommentState, 'error'>;
}
interface DownvoteCommentBeginAction {
  type: typeof DOWNVOTE_COMMENT_BEGIN;
}
interface DownvoteCommentSuccessAction {
  type: typeof DOWNVOTE_COMMENT_SUCCESS;
  payload: { comment: Comment };
}
interface DownvoteCommentFailureAction {
  type: typeof DOWNVOTE_COMMENT_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

interface UpvoteReplyBeginAction {
  type: typeof UPVOTE_REPLY_BEGIN;
}
interface UpvoteReplySuccessAction {
  type: typeof UPVOTE_REPLY_SUCCESS;
  payload: { replyResponse: { [key: string]: any } };
}
interface UpvoteReplyFailureAction {
  type: typeof UPVOTE_REPLY_FAILURE;
  payload: Pick<CommentState, 'error'>;
}
interface DownvoteReplyBeginAction {
  type: typeof DOWNVOTE_REPLY_BEGIN;
}
interface DownvoteReplySuccessAction {
  type: typeof DOWNVOTE_REPLY_SUCCESS;
  payload: { replyResponse: { [key: string]: any } };
}
interface DownvoteReplyFailureAction {
  type: typeof DOWNVOTE_REPLY_FAILURE;
  payload: Pick<CommentState, 'error'>;
}

export type CommentActionTypes =
  | FetchCommentsBeginAction
  | FetchCommentsSuccessAction
  | FetchCommentsFailureAction
  | PostCommentBeginAction
  | PostCommentSuccessAction
  | PostCommentFailureAction
  | PostReplyBeginAction
  | PostReplySuccessAction
  | PostReplyFailureAction
  | LoadRepliesBeginAction
  | LoadRepliesSuccessAction
  | LoadRepliesFailureAction
  | UpvoteCommentBeginAction
  | UpvoteCommentSuccessAction
  | UpvoteCommentFailureAction
  | DownvoteCommentBeginAction
  | DownvoteCommentSuccessAction
  | DownvoteCommentFailureAction
  | UpvoteReplyBeginAction
  | UpvoteReplySuccessAction
  | UpvoteReplyFailureAction
  | DownvoteReplyBeginAction
  | DownvoteReplySuccessAction
  | DownvoteReplyFailureAction;

interface FetchActivityBeginAction {
  type: typeof FETCH_ACTIVITY_BEGIN;
}
interface FetchActivitySuccessAction {
  type: typeof FETCH_ACTIVITY_SUCCESS;
  payload: Activity[];
}
interface FetchActivityFailureAction {
  type: typeof FETCH_ACTIVITY_FAILURE;
  payload: Pick<ActivityState, 'error'>;
}

export type ActivityActionTypes =
  | FetchActivityBeginAction
  | FetchActivitySuccessAction
  | FetchActivityFailureAction;
