import axios from 'axios';
import { baseURL } from '../Config';
import { ProfileState, ProfileActionTypes, AppThunk } from '../types';

// Actions
export const FETCH_PROFILES_BEGIN = 'FETCH_PROFILES_BEGIN';
export const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
export const FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE';

export const FETCH_FAVORITE_GARMENTS_BEGIN = 'FETCH_FAVORITE_GARMENTS_BEGIN';
export const FETCH_FAVORITE_GARMENTS_SUCCESS = 'FETCH_FAVORITE_GARMENTS_SUCCESS';
export const FETCH_FAVORITE_GARMENTS_FAILURE = 'FETCH_FAVORITE_GARMENTS_FAILURE';

export const FETCH_FAVORITE_FITS_BEGIN = 'FETCH_FAVORITE_FITS_BEGIN';
export const FETCH_FAVORITE_FITS_SUCCESS = 'FETCH_FAVORITE_FITS_SUCCESS';
export const FETCH_FAVORITE_FITS_FAILURE = 'FETCH_FAVORITE_FITS_FAILURE';

export const INITIAL_STATE: ProfileState = {
  // items: [],
  loading: false,
  error: null,
  favoriteGarments: [],
  favoriteFits: [],
};

// Reducer
export default function profiles(state = INITIAL_STATE, action: ProfileActionTypes): ProfileState {
  switch (action.type) {
    // case FETCH_PROFILES_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_PROFILES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     items: [...state.items, ...action.payload.profiles]
    //   };

    // case FETCH_PROFILES_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     items
    //   };

    case FETCH_FAVORITE_GARMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FAVORITE_GARMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        favoriteGarments: [...state.favoriteGarments, ...action.payload.favoriteGarments],
      };
    case FETCH_FAVORITE_GARMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_FAVORITE_FITS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FAVORITE_FITS_SUCCESS:
      return {
        ...state,
        loading: false,
        favoriteFits: [...state.favoriteFits, ...action.payload.favoriteFits],
      };
    case FETCH_FAVORITE_FITS_FAILURE:
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
export const fetchProfilesBegin = () => ({
  type: FETCH_PROFILES_BEGIN,
});

export const fetchProfilesSuccess = (profiles) => ({
  type: FETCH_PROFILES_SUCCESS,
  payload: { profiles },
});

export const fetchProfilesFailure = (error) => ({
  type: FETCH_PROFILES_FAILURE,
  payload: { error },
});

export const fetchFavoriteGarmentsBegin = (): ProfileActionTypes => ({
  type: FETCH_FAVORITE_GARMENTS_BEGIN,
});

export const fetchFavoriteGarmentsSuccess = (favoriteGarments): ProfileActionTypes => ({
  type: FETCH_FAVORITE_GARMENTS_SUCCESS,
  payload: { favoriteGarments },
});

export const fetchFavoriteGarmentsFailure = (error): ProfileActionTypes => ({
  type: FETCH_FAVORITE_GARMENTS_FAILURE,
  payload: { error },
});

export const fetchFavoriteFitsBegin = (): ProfileActionTypes => ({
  type: FETCH_FAVORITE_FITS_BEGIN,
});

export const fetchFavoriteFitsSuccess = ({ favoriteFits }: ProfileState): ProfileActionTypes => ({
  type: FETCH_FAVORITE_FITS_SUCCESS,
  payload: { favoriteFits },
});

export const fetchFavoriteFitsFailure = ({ error }: ProfileState): ProfileActionTypes => ({
  type: FETCH_FAVORITE_FITS_FAILURE,
  payload: { error },
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchFavoriteGarments = (garmentId): AppThunk => async (dispatch) => {
  dispatch(fetchFavoriteGarmentsBegin());

  try {
    const res = await axios.get(`${baseURL}/garments/${garmentId}/`);
    dispatch(fetchFavoriteGarmentsSuccess(res.data));
  } catch (error) {
    dispatch(fetchFavoriteGarmentsFailure(error));
  }
};

export const fetchFavoriteFits = (favoriteFitIds): AppThunk => async (dispatch) => {
  dispatch(fetchFavoriteFitsBegin());

  try {
    const res = await axios.get(`${baseURL}/fits/?ids=${favoriteFitIds.toString()}/`);
    dispatch(fetchFavoriteFitsSuccess(res.data));
  } catch (error) {
    dispatch(fetchFavoriteFitsFailure(error));
  }
};
