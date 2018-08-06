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

export const INITIAL_STATE = {
  loading: false,
  error: null,
  token: null,
  profile_id: null,
  favorites: []
};

// Reducer
export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        profile_id: action.payload.profile_id,
        favorites: action.payload.favorites
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null,
        profile_id: null,
        favorites: []
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
        favorites: action.payload.favorites
      };

    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        favorites: []
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

export const profileSuccess = ({ favorites }) => ({
  type: PROFILE_SUCCESS,
  payload: { favorites }
});

export const profileFailure = error => ({
  type: PROFILE_FAILURE,
  payload: { error }
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
    dispatch(loginFailure(error));
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

// Selectors
// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null;
