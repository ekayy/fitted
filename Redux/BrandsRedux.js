import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const FETCH_BRANDS_BEGIN = 'FETCH_BRANDS_BEGIN';
const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null
};

// Reducer
export default function brands(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_BRANDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.brands
      };

    case FETCH_BRANDS_FAILURE:
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
export const fetchBrandsBegin = () => ({
  type: FETCH_BRANDS_BEGIN
});

export const fetchBrandsSuccess = brands => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: { brands }
});

export const fetchBrandsFailure = error => ({
  type: FETCH_BRANDS_FAILURE,
  payload: { error }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchBrands = () => async dispatch => {
  dispatch(fetchBrandsBegin());

  try {
    const res = await axios.get(`${baseURL}/brands/`);
    dispatch(fetchBrandsSuccess(res.data.results));
  } catch (error) {
    dispatch(fetchBrandsFailure(error));
  }
};
