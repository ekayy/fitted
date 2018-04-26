import axios from 'axios';

// Actions
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

export const INITIAL_STATE = {
  loading: false,
  error: null,
  token: null,
  id: null
};

// Reducer
export default function brands(state = INITIAL_STATE, action = {}) {
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
        id: action.payload.id
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null
      };
    default:
      return state;
  }
}

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (token, id) => ({
  type: LOGIN_SUCCESS,
  payload: { token, id }
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    return axios
      .post('http://localhost:8000/user/get_auth_token/', {
        username,
        password
      })
      .then(response =>
        dispatch(loginSuccess(response.data.token, response.data.id))
      )
      .catch(error => dispatch(loginFailure(error)));
  };
}

// Selectors

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null;
