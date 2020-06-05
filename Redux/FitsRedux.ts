import axios from 'axios';
import { baseURL } from '../Config';
import { Fit, FitState, FitActionTypes, AppThunk } from './types';

// Actions
export const CREATE_FIT_BEGIN = 'CREATE_FIT_BEGIN';
export const CREATE_FIT_SUCCESS = 'CREATE_FIT_SUCCESS';
export const CREATE_FIT_FAILURE = 'CREATE_FIT_FAILURE';
export const CLEAR_CREATED_FIT = 'CLEAR_CREATED_FIT';
export const TAG_GARMENT_TO_FIT = 'TAG_GARMENT_TO_FIT';
export const REMOVE_GARMENT_FROM_FIT = 'REMOVE_GARMENT_FROM_FIT';
export const FETCH_FITS_BEGIN = 'FETCH_FITS_BEGIN';
export const FETCH_FITS_SUCCESS = 'FETCH_FITS_SUCCESS';
export const FETCH_FITS_FAILURE = 'FETCH_FITS_FAILURE';

export const INITIAL_STATE = {
  createdFit: null,
  garmentId: null,
  taggedGarments: [],
  loading: false,
  error: null,
  items: [],
};

// Reducer
export default function fits(state = INITIAL_STATE, action: FitActionTypes) {
  switch (action.type) {
    case FETCH_FITS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FITS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case FETCH_FITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_FIT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_FIT_SUCCESS:
      return {
        ...state,
        loading: false,
        createdFit: action.payload.createdFit,
      };

    case CLEAR_CREATED_FIT:
      return {
        ...state,
        loading: false,
        createdFit: null,
        taggedGarments: [],
      };

    case CREATE_FIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case TAG_GARMENT_TO_FIT:
      return {
        ...state,
        taggedGarments: [...state.taggedGarments, action.payload.garmentId],
      };

    case REMOVE_GARMENT_FROM_FIT:
      return {
        ...state,
        taggedGarments: state.taggedGarments.filter(
          (taggedGarment) => taggedGarment['id'] !== action.payload.garmentId,
        ),
      };

    default:
      return state;
  }
}

// Action Creators
export const fetchFitsBegin = (): FitActionTypes => ({
  type: FETCH_FITS_BEGIN,
});

export const fetchFitsSuccess = (fits: FitState): FitActionTypes => ({
  type: FETCH_FITS_SUCCESS,
  payload: fits,
});

export const fetchFitsFailure = (error: FitState): FitActionTypes => ({
  type: FETCH_FITS_FAILURE,
  payload: error,
});

export const createFitBegin = (): FitActionTypes => ({
  type: CREATE_FIT_BEGIN,
});

export const createFitSuccess = (createdFit: FitState): FitActionTypes => ({
  type: CREATE_FIT_SUCCESS,
  payload: createdFit,
});

export const createFitFailure = (error: FitState): FitActionTypes => ({
  type: CREATE_FIT_FAILURE,
  payload: error,
});

export const clearCreatedFit = (): FitActionTypes => ({
  type: CLEAR_CREATED_FIT,
});

export const tagGarmentToFit = (garmentId: FitState): FitActionTypes => ({
  type: TAG_GARMENT_TO_FIT,
  payload: garmentId,
});

export const removeGarmentFromFit = (garmentId: FitState): FitActionTypes => ({
  type: REMOVE_GARMENT_FROM_FIT,
  payload: garmentId,
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchFits = (garmentId: number): AppThunk => {
  return (dispatch) => {
    dispatch(fetchFitsBegin());
    return axios
      .get(`${baseURL}/fits/`, {
        params: {
          garments: garmentId,
        },
      })
      .then((response) => dispatch(fetchFitsSuccess(response.data.results)))
      .catch((error) => dispatch(fetchFitsFailure(error)));
  };
};

export const createFit = (fit: Fit): AppThunk => {
  return (dispatch) => {
    dispatch(createFitBegin());
    return axios
      .post(`${baseURL}/fits/`, fit)
      .then((response) => {
        dispatch(createFitSuccess(response.data));
      })
      .catch((error) => dispatch(createFitFailure(error)));
  };
};
