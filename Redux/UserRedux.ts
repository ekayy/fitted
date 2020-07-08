import axios from 'axios';
import { baseURL } from '../Config';
import { UserActionTypes, UserState, AppThunk, Profile } from '../types';

// Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_ISLOGGEDIN = 'SET_ISLOGGEDIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CLEAR_ERROR = 'LOGIN_CLEAR_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
export const FAVORITE_FAILURE = 'FAVORITE_FAILURE';

export const FAVORITE_ITEM = 'FAVORITE_ITEM';
export const UNFAVORITE_ITEM = 'UNFAVORITE_ITEM';

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';

export const INITIAL_STATE: UserState = {
  error: null,
  registerError: null,
  favoriteFits: [],
  favoriteGarments: [],
  height: null,
  isFavorite: false,
  isLoggedIn: false,
  loading: false,
  profileId: null,
  token: null,
  user: null /* user's profile */,
  weight: null,
};

// Reducer
export default function (state = INITIAL_STATE, action: UserActionTypes): UserState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        profileId: action.payload.profileId,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null,
        profileId: null,
        isLoggedIn: false,
      };
    case SET_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return INITIAL_STATE;
    case LOGIN_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        registerError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerError: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        registerError: action.payload.registerError,
      };

    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        favoriteGarments: action.payload.favoriteGarments,
        favoriteFits: action.payload.favoriteFits,
        height: action.payload.height,
        weight: action.payload.weight,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
        favoriteGarments: [],
        favoriteFits: [],
        height: null,
        weight: null,
      };

    case FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        favoriteGarments: action.payload.favoriteGarments,
        favoriteFits: action.payload.favoriteFits,
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FAVORITE_ITEM:
      return {
        ...state,
        isFavorite: true,
      };
    case UNFAVORITE_ITEM:
      return {
        ...state,
        isFavorite: false,
      };

    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        favoriteGarments: action.payload.favoriteGarments,
        favoriteFits: action.payload.favoriteFits,
        height: action.payload.height,
        weight: action.payload.weight,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
        favoriteGarments: [],
        favoriteFits: [],
        height: null,
        weight: null,
      };

    default:
      return state;
  }
}

// Action Creators
export const loginRequest = (): UserActionTypes => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = ({
  token,
  profileId,
}: Pick<UserState, 'token' | 'profileId'>): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { token, profileId },
});
export const loginFailure = ({ error }: Pick<UserState, 'error'>): UserActionTypes => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
export const setIsLoggedIn = (): UserActionTypes => ({
  type: SET_ISLOGGEDIN,
});
export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});
export const loginClearError = (): UserActionTypes => ({
  type: LOGIN_CLEAR_ERROR,
});

export const registerRequest = (): UserActionTypes => ({
  type: REGISTER_REQUEST,
});
export const registerSuccess = (): UserActionTypes => ({
  type: REGISTER_SUCCESS,
});
export const registerFailure = ({ registerError }): UserActionTypes => ({
  type: REGISTER_FAILURE,
  payload: { registerError },
});

export const profileRequest = (): UserActionTypes => ({
  type: PROFILE_REQUEST,
});
export const profileSuccess = ({
  user,
  favoriteGarments,
  favoriteFits,
  height,
  weight,
}: Pick<
  UserState,
  'user' | 'favoriteGarments' | 'favoriteFits' | 'height' | 'weight'
>): UserActionTypes => ({
  type: PROFILE_SUCCESS,
  payload: { user, favoriteGarments, favoriteFits, height, weight },
});
export const profileFailure = ({ error }: Pick<UserState, 'error'>): UserActionTypes => ({
  type: PROFILE_FAILURE,
  payload: { error },
});

export const favoriteRequest = (): UserActionTypes => ({
  type: FAVORITE_REQUEST,
});
export const favoriteSuccess = ({
  favoriteGarments,
  favoriteFits,
}: Pick<UserState, 'favoriteGarments' | 'favoriteFits'>): UserActionTypes => ({
  type: FAVORITE_SUCCESS,
  payload: { favoriteGarments, favoriteFits },
});
export const favoriteFailure = ({ error }: Pick<UserState, 'error'>): UserActionTypes => ({
  type: FAVORITE_FAILURE,
  payload: { error },
});

export const favoriteItem = () => ({
  type: FAVORITE_ITEM,
});
export const unfavoriteItem = () => ({
  type: UNFAVORITE_ITEM,
});

export const profileUpdateRequest = (): UserActionTypes => ({
  type: PROFILE_UPDATE_REQUEST,
});
export const profileUpdateSuccess = ({
  user,
  favoriteGarments,
  favoriteFits,
  height,
  weight,
}: Pick<
  UserState,
  'user' | 'favoriteGarments' | 'favoriteFits' | 'height' | 'weight'
>): UserActionTypes => ({
  type: PROFILE_UPDATE_SUCCESS,
  payload: { user, favoriteGarments, favoriteFits, height, weight },
});
export const profileUpdateFailure = ({ error }: Pick<UserState, 'error'>): UserActionTypes => ({
  type: PROFILE_UPDATE_FAILURE,
  payload: { error },
});

// Asynchronous actions
// login to app
export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${baseURL}/user/get_auth_token/`, {
      username,
      password,
    });
    // resolve python and js naming differences
    const { token, profile_id: profileId } = response.data;
    dispatch(loginSuccess({ token, profileId }));
  } catch (error) {
    console.log('error', error);

    dispatch(loginFailure({ error: error.response.data['non_field_errors'][0] }));
  }
};

export const register = ({ username, password, firstName, email }): AppThunk => async (
  dispatch,
) => {
  dispatch(registerRequest());

  try {
    await axios.post(`${baseURL}/profiles/`, {
      user: {
        username,
        password,
        first_name: firstName,
        email,
      },
    });
    dispatch(registerSuccess());
  } catch (error) {
    const errorArray = Object.entries(error.response.data['user']);
    dispatch(registerFailure({ registerError: errorArray[0] }));
  }
};

// fetch current profile
export const fetchProfile = (profileId: number): AppThunk => async (dispatch) => {
  dispatch(profileRequest());

  try {
    const response = await axios.get(`${baseURL}/profiles/${profileId}/`);

    // resolve python and js naming differences
    const {
      user,
      favorite_garments: favoriteGarments,
      favorite_fits: favoriteFits,
      height,
      weight,
    } = response.data;

    dispatch(profileSuccess({ user, favoriteGarments, favoriteFits, height, weight }));
    return true;
  } catch (error) {
    dispatch(profileFailure({ error: null }));
    return false;
  }
};

// favorite or unfavorite
export const favoriteGarment = (
  id: number,
  userParams: Pick<UserState, 'token' | 'profileId' | 'favoriteGarments'>,
): AppThunk => async (dispatch) => {
  const { token, profileId, favoriteGarments } = userParams;
  let favorites: number[] = [];

  dispatch(favoriteRequest());

  if (favoriteGarments.includes(id)) {
    // Unfavoriting
    favorites = favoriteGarments.filter((garmentId) => garmentId !== id);
    dispatch(unfavoriteItem());
  } else {
    // Favoriting, so add id
    favorites = [...favoriteGarments, id];
    dispatch(favoriteItem());
  }

  try {
    const response = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      { favorite_garments: favorites },
      { headers: { Authorization: `Token ${token}` } },
    );

    // resolve python and js naming
    const { favorite_garments: favoriteGarments, favorite_fits: favoriteFits } = response.data;

    dispatch(favoriteSuccess({ favoriteGarments, favoriteFits }));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

export const favoriteFit = (
  id: number,
  userParams: Pick<UserState, 'token' | 'profileId' | 'favoriteFits'>,
): AppThunk => async (dispatch) => {
  const { token, profileId, favoriteFits } = userParams;
  let favorites: number[] = [];

  dispatch(favoriteRequest());

  if (favoriteFits.includes(id)) {
    // Unfavoriting
    favorites = favoriteFits.filter((garmentId) => garmentId !== id);
    dispatch(unfavoriteItem());
  } else {
    // Favoriting, so add id
    favorites = [...favoriteFits, id];
    dispatch(favoriteItem());
  }

  try {
    const response = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      { favorite_fits: favorites },
      { headers: { Authorization: `Token ${token}` } },
    );

    // resolve python and js naming
    const { favorite_garments: favoriteGarments, favorite_fits: favoriteFits } = response.data;

    dispatch(favoriteSuccess({ favoriteGarments, favoriteFits }));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

export const updateProfile = (profileId: number, req: Partial<Profile>): AppThunk => async (
  dispatch,
) => {
  dispatch(profileUpdateRequest());

  try {
    const response = await axios.patch(`${baseURL}/profiles/${profileId}/`, {
      user: req,
    });

    // resolve python and js naming differences
    const {
      user,
      favorite_garments: favoriteGarments,
      favorite_fits: favoriteFits,
      height,
      weight,
    } = response.data;

    dispatch(profileUpdateSuccess({ user, favoriteGarments, favoriteFits, height, weight }));
  } catch (error) {
    dispatch(profileUpdateFailure({ error: null }));
  }
};

// Selectors
// Is the current user logged in?
// export const isLoggedIn = (loginState) => loginState.username !== null;
