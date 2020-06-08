import axios from 'axios';
import { baseURL } from '../Config';
import { BrandState, BrandActionTypes, AppThunk, Brand } from '../types';

// Actions
export const FETCH_BRANDS_BEGIN = 'FETCH_BRANDS_BEGIN';
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';

export const INITIAL_STATE: BrandState = {
  items: [],
  loading: false,
  error: null,
};

// Reducer
export default function brands(state = INITIAL_STATE, action: BrandActionTypes): BrandState {
  switch (action.type) {
    case FETCH_BRANDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case FETCH_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

// Action Creators
export const fetchBrandsBegin = (): BrandActionTypes => ({
  type: FETCH_BRANDS_BEGIN,
});

export const fetchBrandsSuccess = (items: Brand[]): BrandActionTypes => ({
  type: FETCH_BRANDS_SUCCESS,
  payload: items,
});

export const fetchBrandsFailure = ({ error }: BrandState): BrandActionTypes => ({
  type: FETCH_BRANDS_FAILURE,
  payload: { error },
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchBrands = (): AppThunk => async (dispatch) => {
  dispatch(fetchBrandsBegin());

  try {
    const res = await axios.get(`${baseURL}/brands/`);

    dispatch(fetchBrandsSuccess(res.data.results));
  } catch (error) {
    dispatch(fetchBrandsFailure(error));
  }
};
