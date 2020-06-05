import axios from 'axios';
import { baseURL } from '../Config';
import { UserActionTypes, UserState, AppThunk } from '../types';

// Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CLEAR_ERROR = 'LOGIN_CLEAR_ERROR';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
export const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
export const FAVORITE_FAILURE = 'FAVORITE_FAILURE';

export const INITIAL_STATE = {
  error: null,
  favoriteFits: [],
  favoriteGarments: [],
  height: null,
  isLoggedIn: false,
  loading: false,
  profileId: null,
  token: null,
  user: null /* user's profile */,
  weight: null,
};

// Reducer
export default function (state = INITIAL_STATE, action: UserActionTypes) {
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
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
        profileId: null,
      };
    case LOGOUT:
      return INITIAL_STATE;
    case LOGIN_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
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
        username: null,
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
        favoriteGarments: [...action.payload.favorite_garments],
        favoriteFits: [...action.payload.favorite_fits],
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // case FETCH_MY_FITS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_MY_FITS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFits: action.payload.myFits
    //   };
    // case FETCH_MY_FITS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     items
    //   };

    // case FETCH_FAVORITE_GARMENTS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_FAVORITE_GARMENTS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFavoriteGarments: action.payload.myFavoriteGarments
    //   };
    // case FETCH_FAVORITE_GARMENTS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     myFavoriteGarments
    //   };

    // case FETCH_FAVORITE_FITS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_FAVORITE_FITS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFavoriteFits: action.payload.myFavoriteFits
    //   };
    // case FETCH_FAVORITE_FITS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     myFavoriteFits
    //   };

    default:
      return state;
  }
}

// Action Creators
export const loginRequest = (): UserActionTypes => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = ({ token, profileId }: UserState): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { token, profileId },
});
export const loginFailure = (error: UserState): UserActionTypes => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});
export const loginClearError = (): UserActionTypes => ({
  type: LOGIN_CLEAR_ERROR,
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
}: UserState): UserActionTypes => ({
  type: PROFILE_SUCCESS,
  payload: { user, favoriteGarments, favoriteFits, height, weight },
});
export const profileFailure = ({ error }: UserState): UserActionTypes => ({
  type: PROFILE_FAILURE,
  payload: { error },
});

export const favoriteFailure = ({ error }: UserState): UserActionTypes => ({
  type: FAVORITE_FAILURE,
  payload: { error },
});
export const favoriteRequest = (): UserActionTypes => ({
  type: FAVORITE_REQUEST,
});
export const favoriteSuccess = ({
  favoriteGarments,
  favoriteFits,
}: UserState): UserActionTypes => ({
  type: FAVORITE_SUCCESS,
  payload: { favoriteGarments, favoriteFits },
});

// export const fetchMyFitsBegin = () => ({
//   type: FETCH_MY_FITS_BEGIN
// });
// export const fetchMyFitsSuccess = myFits => ({
//   type: FETCH_MY_FITS_SUCCESS,
//   payload: { myFits }
// });
// export const fetchMyFitsFailure = error => ({
//   type: FETCH_MY_FITS_FAILURE,
//   payload: { error }
// });

// export const fetchFavoriteGarmentsBegin = () => ({
//   type: FETCH_FAVORITE_GARMENTS_BEGIN
// });
// export const fetchFavoriteGarmentsSuccess = myFavoriteGarments => ({
//   type: FETCH_FAVORITE_GARMENTS_SUCCESS,
//   payload: { myFavoriteGarments }
// });
// export const fetchFavoriteGarmentsFailure = error => ({
//   type: FETCH_FAVORITE_GARMENTS_FAILURE,
//   payload: { error }
// });

// export const fetchFavoriteFitsBegin = () => ({
//   type: FETCH_FAVORITE_FITS_BEGIN
// });
// export const fetchFavoriteFitsSuccess = myFavoriteFits => ({
//   type: FETCH_FAVORITE_FITS_SUCCESS,
//   payload: { myFavoriteFits }
// });
// export const fetchFavoriteFitsFailure = error => ({
//   type: FETCH_FAVORITE_FITS_FAILURE,
//   payload: { error }
// });

// Asynchronous actions
// login to app
export const login = (username, password): AppThunk => async (dispatch) => {
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
    dispatch(loginFailure(error.response.data['non_field_errors'][0]));
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
  } catch (error) {
    dispatch(profileFailure(error));
  }
};

// favorite or unfavorite
export const favoriteGarment = (id, userParams): AppThunk => async (dispatch) => {
  const { token, profileId, favoriteGarments } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favoriteGarments.includes(id)) {
    // Unfavoriting
    let filteredGarments = favoriteGarments.filter((garmentId) => garmentId !== id);

    favorites = [...filteredGarments];
  } else {
    // Favoriting, so add id
    favorites = [...favoriteGarments, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      {
        favorite_garments: favorites,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

export const favoriteFit = (id, userParams): AppThunk => async (dispatch) => {
  const { token, profileId, favoriteFits } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favoriteFits.includes(id)) {
    // Unfavoriting
    let filteredFits = favoriteFits.filter((fitId) => fitId !== id);

    favorites = [...filteredFits];
  } else {
    // Favoriting, so add id
    favorites = [...favoriteFits, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      {
        favorite_fits: favorites,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

// export const fetchMyFits = profileId => async dispatch => {
//   dispatch(fetchMyFitsBegin());

//   try {
//     const res = await axios.get(`${baseURL}/profiles/${profileId}/fits/`);
//     dispatch(fetchMyFitsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchMyFitsFailure(error));
//   }
// };

// export const fetchFavoriteGarments = garmentId => async dispatch => {
//   dispatch(fetchFavoriteGarmentsBegin());

//   try {
//     const res = await axios.get(`${baseURL}/garments/${garmentId}/`);
//     dispatch(fetchFavoriteGarmentsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchFavoriteGarmentsFailure(error));
//   }
// };

// export const fetchFavoriteFits = favoriteFitIds => async dispatch => {
//   dispatch(fetchFavoriteFitsBegin());

//   try {
//     const res = await axios.get(
//       `${baseURL}/fits/?ids=${favoriteFitIds.toString()}`
//     );

//     dispatch(fetchFavoriteFitsSuccess(res.data.results));
//   } catch (error) {
//     dispatch(fetchFavoriteFitsFailure(error));
//   }
// };

// Selectors
// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null;
