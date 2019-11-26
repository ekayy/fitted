import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const FETCH_GARMENTS_BEGIN = 'FETCH_GARMENTS_BEGIN';
const FETCH_GARMENTS_SUCCESS = 'FETCH_GARMENTS_SUCCESS';
const FETCH_GARMENTS_FAILURE = 'FETCH_GARMENTS_FAILURE';

const CREATE_GARMENT_BEGIN = 'CREATE_GARMENT_BEGIN';
const CREATE_GARMENT_SUCCESS = 'CREATE_GARMENT_SUCCESS';
const CREATE_GARMENT_FAILURE = 'CREATE_GARMENT_FAILURE';

// const FETCH_GARMENT_FITS_BEGIN = 'FETCH_GARMENT_FITS_BEGIN';
// const FETCH_GARMENT_FITS_SUCCESS = 'FETCH_GARMENT_FITS_SUCCESS';
// const FETCH_GARMENT_FITS_FAILURE = 'FETCH_GARMENT_FITS_FAILURE';

export const INITIAL_STATE = {
  items: [],
  // garmentFits: [],
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
        // items: [...state.items, ...action.payload.garments]
        items: [...action.payload.garments]
      };
    case FETCH_GARMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items
      };

    case CREATE_GARMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_GARMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case CREATE_GARMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    // case FETCH_GARMENT_FITS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_GARMENT_FITS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false
    //     // garmentFits: action.payload.garmentFits
    //   };
    // case FETCH_GARMENT_FITS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error
    //     // garmentFits
    //   };

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
  payload: {
    garments
  }
});
export const fetchGarmentsFailure = error => ({
  type: FETCH_GARMENTS_FAILURE,
  payload: {
    error
  }
});

export const createGarmentBegin = () => ({
  type: CREATE_GARMENT_BEGIN
});
export const createGarmentSuccess = () => ({
  type: CREATE_GARMENT_SUCCESS
});
export const createGarmentFailure = error => ({
  type: CREATE_GARMENT_FAILURE,
  payload: {
    error
  }
});

// export const fetchGarmentFitsBegin = () => ({
//   type: FETCH_GARMENT_FITS_BEGIN
// });
// export const fetchGarmentFitsSuccess = garmentFits => ({
//   type: FETCH_GARMENT_FITS_SUCCESS,
//   payload: {
//     garmentFits
//   }
// });
// export const fetchGarmentFitsFailure = error => ({
//   type: FETCH_GARMENT_FITS_FAILURE,
//   payload: {
//     error
//   }
// });

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchGarments = () => async dispatch => {
  dispatch(fetchGarmentsBegin());

  try {
    const res = await axios.get(`${baseURL}/garments/?limit=5000`);

    dispatch(fetchGarmentsSuccess(res.data.results));
  } catch (error) {
    dispatch(fetchGarmentsFailure(error));
  }
};

export const createGarment = ({ brand, color, model }) => async dispatch => {
  dispatch(createGarmentBegin());

  try {
    const res = await axios.post(`${baseURL}/garments/`, {
      sku: Math.floor(Math.random() * 1000000000),
      brand_id: brand,
      color,
      model,
      photo: 'https://x',
      purchase_page: 'https://x'
    });
    dispatch(createGarmentSuccess());
    return res.data;
  } catch (error) {
    dispatch(createGarmentFailure(error));
  }
};

// export const fetchGarmentFits = id => async dispatch => {
//   dispatch(fetchGarmentFitsBegin());

//   try {
//     const res = await axios.get(`${baseURL}/fits/?garment=${id}&limit=100/`);

//     dispatch(fetchGarmentFitsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchGarmentFitsFailure(error));
//   }
// };
