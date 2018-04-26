import axios from 'axios';

// Actions
const FETCH_FITS_BEGIN = 'FETCH_FITS_BEGIN';
const FETCH_FITS_SUCCESS = 'FETCH_FITS_SUCCESS';
const FETCH_FITS_FAILURE = 'FETCH_FITS_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null
};

// Reducer
export default function fits(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_FITS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_FITS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.fits]
      };

    case FETCH_FITS_FAILURE:
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
export const fetchFitsBegin = () => ({
  type: FETCH_FITS_BEGIN
});

export const fetchFitsSuccess = fits => ({
  type: FETCH_FITS_SUCCESS,
  payload: { fits }
});

export const fetchFitsFailure = error => ({
  type: FETCH_FITS_FAILURE,
  payload: { error }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchFits(page) {
  return dispatch => {
    dispatch(fetchFitsBegin());
    return axios
      .get(`http://localhost:8000/fits/?page=${page}`)
      .then(response => dispatch(fetchFitsSuccess(response.data.results)))
      .catch(error => dispatch(fetchFitsFailure(error)));
  };
}
