import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const CREATE_FIT_BEGIN = 'CREATE_FIT_BEGIN';
const CREATE_FIT_SUCCESS = 'CREATE_FIT_SUCCESS';
const CREATE_FIT_FAILURE = 'CREATE_FIT_FAILURE';
const TAG_GARMENT_TO_FIT = 'TAG_GARMENT_TO_FIT';
const REMOVE_GARMENT_FROM_FIT = 'REMOVE_GARMENT_FROM_FIT';

export const INITIAL_STATE = {
  taggedGarments: [],
  loading: false,
  error: null
};

// Reducer
export default function fits(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CREATE_FIT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_FIT_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case CREATE_FIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case TAG_GARMENT_TO_FIT:
      return {
        ...state,
        taggedGarments: [...state.taggedGarments, action.payload.garmentId]
      };

    case REMOVE_GARMENT_FROM_FIT:
      return {
        ...state,
        taggedGarments: state.taggedGarments.filter(
          taggedGarment => taggedGarment.id !== action.payload.garmentId
        )
      };

    default:
      return state;
  }
}

// Action Creators
export const createFitBegin = () => ({
  type: CREATE_FIT_BEGIN
});

export const createFitSuccess = fits => ({
  type: CREATE_FIT_SUCCESS,
  payload: { fits }
});

export const createFitFailure = error => ({
  type: CREATE_FIT_FAILURE,
  payload: { error }
});

export const tagGarmentToFit = garmentId => ({
  type: TAG_GARMENT_TO_FIT,
  payload: { garmentId }
});

export const removeGarmentFromFit = garmentId => ({
  type: REMOVE_GARMENT_FROM_FIT,
  payload: { garmentId }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function fetchFits(page) {
//   return dispatch => {
//     dispatch(fetchFitsBegin());
//     return axios
//       .get(`${baseURL}/fits/?page=${page}`)
//       .then(response => dispatch(fetchFitsSuccess(response.data.results)))
//       .catch(error => dispatch(fetchFitsFailure(error)));
//   };
// }

export function createFit(fit) {
  return dispatch => {
    dispatch(createFitBegin());
    return axios
      .post(`${baseURL}/fits/`, fit)
      .then(response => {
        dispatch(createFitSuccess(response.data));
      })
      .catch(error => dispatch(createFitFailure(error)));
  };
}
