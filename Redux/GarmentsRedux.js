import axios from 'axios';

// Actions
const FETCH_GARMENTS_BEGIN = 'FETCH_GARMENTS_BEGIN';
const FETCH_GARMENTS_SUCCESS = 'FETCH_GARMENTS_SUCCESS';
const FETCH_GARMENTS_FAILURE = 'FETCH_GARMENTS_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null
};

// Reducer
export default function garments(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_GARMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_GARMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.garments]
      };

    case FETCH_GARMENTS_FAILURE:
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
export const fetchGarmentsBegin = () => ({
  type: FETCH_GARMENTS_BEGIN
});

export const fetchGarmentsSuccess = garments => ({
  type: FETCH_GARMENTS_SUCCESS,
  payload: { garments }
});

export const fetchGarmentsFailure = error => ({
  type: FETCH_GARMENTS_FAILURE,
  payload: { error }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchGarments(brandId) {
  return dispatch => {
    dispatch(fetchGarmentsBegin());
    return axios
      .get(`http://localhost:8000/garments/?brand=${brandId}`)
      .then(response => dispatch(fetchGarmentsSuccess(response.data.results)))
      .catch(error => dispatch(fetchGarmentsFailure(error)));
  };
}
