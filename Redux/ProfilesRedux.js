import axios from 'axios';

// Actions
const FETCH_PROFILES_BEGIN = 'FETCH_PROFILES_BEGIN';
const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
const FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null
};

// Reducer
export default function profiles(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_PROFILES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.profiles]
      };

    case FETCH_PROFILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items
      };
    default:
      return state;
  }
}

// Action Creators
export const fetchProfilesBegin = () => ({
  type: FETCH_PROFILES_BEGIN
});

export const fetchProfilesSuccess = profiles => ({
  type: FETCH_PROFILES_SUCCESS,
  payload: { profiles }
});

export const fetchProfilesFailure = error => ({
  type: FETCH_PROFILES_FAILURE,
  payload: { error }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchProfiles(page) {
  return dispatch => {
    dispatch(fetchProfilesBegin());
    console.log(page);
    return axios
      .get(`http://localhost:8000/profiles/?page=${page}`)
      .then(response => dispatch(fetchProfilesSuccess(response.data.results)))
      .catch(error => dispatch(fetchProfilesFailure(error)));
  };
}
