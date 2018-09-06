import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const PROFILE_REQUEST = 'PROFILE_REQUEST';
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAILURE = 'PROFILE_FAILURE';

const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
const FAVORITE_FAILURE = 'FAVORITE_FAILURE';

export const INITIAL_STATE = {
  loading: false,
  error: null,
  token: null,
  profile_id: null,
  profile: null,
  favorite_garments: [],
  favorite_fits: []
};

// Reducer
export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        profile_id: action.payload.profile_id
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null,
        profile_id: null
      };

    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload.user,
        favorite_garments: action.payload.favorite_garments,
        favorite_fits: action.payload.favorite_fits
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        profile: null,
        favorite_garments: [],
        favorite_fits: []
      };

    case FAVORITE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        favorite_garments: [...action.payload.favorite_garments],
        favorite_fits: [...action.payload.favorite_fits]
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = ({ token, profile_id }) => ({
  type: LOGIN_SUCCESS,
  payload: { token, profile_id }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

export const profileRequest = () => ({
  type: PROFILE_REQUEST
});

export const profileSuccess = ({ user, favorite_garments, favorite_fits }) => ({
  type: PROFILE_SUCCESS,
  payload: { user, favorite_garments, favorite_fits }
});

export const profileFailure = error => ({
  type: PROFILE_FAILURE,
  payload: { error }
});

export const favoriteFailure = error => ({
  type: FAVORITE_FAILURE,
  payload: { error }
});

export const favoriteRequest = () => ({
  type: FAVORITE_REQUEST
});

export const favoriteSuccess = ({ favorite_garments, favorite_fits }) => ({
  type: FAVORITE_SUCCESS,
  payload: { favorite_garments, favorite_fits }
});

// login to app
export const login = (username, password) => async dispatch => {
  dispatch(loginRequest());

  try {
    const res = await axios.post(`${baseURL}/user/get_auth_token/`, {
      username,
      password
    });

    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));

    throw new Error(400);
  }
};

// fetch current profile
export const fetchProfile = profileId => async dispatch => {
  dispatch(profileRequest());

  try {
    const res = await axios.get(`${baseURL}/profiles/${profileId}/`);

    dispatch(profileSuccess(res.data));
  } catch (error) {
    dispatch(profileFailure(error));
  }
};

// favorite or unfavorite
export const favoriteGarment = (id, userParams) => async dispatch => {
  const { token, profile_id, favorite_garments } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favorite_garments.includes(id)) {
    // Unfavoriting
    let filteredGarments = favorite_garments.filter(
      garmentId => garmentId !== id
    );

    favorites = [...filteredGarments];
  } else {
    // Favoriting, so add id
    favorites = [...favorite_garments, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profile_id}/`,
      {
        favorite_garments: favorites
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

export const favoriteFit = (id, userParams) => async dispatch => {
  const { token, profile_id, favorite_fits } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favorite_fits.includes(id)) {
    // Unfavoriting
    let filteredFits = favorite_fits.filter(fitId => fitId !== id);

    favorites = [...filteredFits];
  } else {
    // Favoriting, so add id
    favorites = [...favorite_fits, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profile_id}/`,
      {
        favorite_fits: favorites
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

// Selectors
// Is the current user logged in?
export const token = state => state.user.token;
