import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const PROFILE_REQUEST = 'PROFILE_REQUEST';
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAILURE = 'PROFILE_FAILURE';

const FAVORITE_REQUEST = 'FAVORITE_REQUEST';
const FAVORITE_SUCCESS = 'FAVORITE_SUCCESS';
const FAVORITE_FAILURE = 'FAVORITE_FAILURE';

// const FETCH_MY_FITS_BEGIN = 'FETCH_MY_FITS_BEGIN';
// const FETCH_MY_FITS_SUCCESS = 'FETCH_MY_FITS_SUCCESS';
// const FETCH_MY_FITS_FAILURE = 'FETCH_MY_FITS_FAILURE';

// const FETCH_FAVORITE_GARMENTS_BEGIN = 'FETCH_FAVORITE_GARMENTS_BEGIN';
// const FETCH_FAVORITE_GARMENTS_SUCCESS = 'FETCH_FAVORITE_GARMENTS_SUCCESS';
// const FETCH_FAVORITE_GARMENTS_FAILURE = 'FETCH_FAVORITE_GARMENTS_FAILURE';

// const FETCH_FAVORITE_FITS_BEGIN = 'FETCH_FAVORITE_FITS_BEGIN';
// const FETCH_FAVORITE_FITS_SUCCESS = 'FETCH_FAVORITE_FITS_SUCCESS';
// const FETCH_FAVORITE_FITS_FAILURE = 'FETCH_FAVORITE_FITS_FAILURE';

export const INITIAL_STATE = {
  loading: false,
  error: null,
  token: null,
  profileId: null,
  profile: null,
  favoriteGarments: [],
  favoriteFits: [],
  // myFits: [],
  // myFavoriteGarments: [],
  // myFavoriteFits: [],
  height: null,
  weight: null,
  isLoggedIn: false
};

// Reducer
export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        profileId: action.payload.profile_id,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null,
        profileId: null
      };

    case LOGOUT:
      return INITIAL_STATE;

    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload.user,
        favoriteGarments: action.payload.favorite_garments,
        favoriteFits: action.payload.favorite_fits,
        height: action.payload.height,
        weight: action.payload.weight
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        profile: null,
        favoriteGarments: [],
        favoriteFits: [],
        height: null,
        weight: null
      };

    case FAVORITE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        favoriteGarments: [...action.payload.favorite_garments],
        favoriteFits: [...action.payload.favorite_fits]
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    // case FETCH_MY_FITS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_MY_FITS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFits: action.payload.myFits
    //   };
    // case FETCH_MY_FITS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     items
    //   };

    // case FETCH_FAVORITE_GARMENTS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_FAVORITE_GARMENTS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFavoriteGarments: action.payload.myFavoriteGarments
    //   };
    // case FETCH_FAVORITE_GARMENTS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     myFavoriteGarments
    //   };

    // case FETCH_FAVORITE_FITS_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null
    //   };
    // case FETCH_FAVORITE_FITS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myFavoriteFits: action.payload.myFavoriteFits
    //   };
    // case FETCH_FAVORITE_FITS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //     myFavoriteFits
    //   };

    default:
      return state;
  }
}

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});
export const loginSuccess = ({ token, profile_id }) => ({
  type: LOGIN_SUCCESS,
  payload: { token, profile_id }
});
export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});
export const logout = () => ({
  type: LOGOUT
});

export const profileRequest = () => ({
  type: PROFILE_REQUEST
});
export const profileSuccess = ({
  user,
  favorite_garments,
  favorite_fits,
  height,
  weight
}) => ({
  type: PROFILE_SUCCESS,
  payload: { user, favorite_garments, favorite_fits, height, weight }
});
export const profileFailure = error => ({
  type: PROFILE_FAILURE,
  payload: { error }
});

export const favoriteFailure = error => ({
  type: FAVORITE_FAILURE,
  payload: { error }
});
export const favoriteRequest = () => ({
  type: FAVORITE_REQUEST
});
export const favoriteSuccess = ({ favorite_garments, favorite_fits }) => ({
  type: FAVORITE_SUCCESS,
  payload: { favorite_garments, favorite_fits }
});

// export const fetchMyFitsBegin = () => ({
//   type: FETCH_MY_FITS_BEGIN
// });
// export const fetchMyFitsSuccess = myFits => ({
//   type: FETCH_MY_FITS_SUCCESS,
//   payload: { myFits }
// });
// export const fetchMyFitsFailure = error => ({
//   type: FETCH_MY_FITS_FAILURE,
//   payload: { error }
// });

// export const fetchFavoriteGarmentsBegin = () => ({
//   type: FETCH_FAVORITE_GARMENTS_BEGIN
// });
// export const fetchFavoriteGarmentsSuccess = myFavoriteGarments => ({
//   type: FETCH_FAVORITE_GARMENTS_SUCCESS,
//   payload: { myFavoriteGarments }
// });
// export const fetchFavoriteGarmentsFailure = error => ({
//   type: FETCH_FAVORITE_GARMENTS_FAILURE,
//   payload: { error }
// });

// export const fetchFavoriteFitsBegin = () => ({
//   type: FETCH_FAVORITE_FITS_BEGIN
// });
// export const fetchFavoriteFitsSuccess = myFavoriteFits => ({
//   type: FETCH_FAVORITE_FITS_SUCCESS,
//   payload: { myFavoriteFits }
// });
// export const fetchFavoriteFitsFailure = error => ({
//   type: FETCH_FAVORITE_FITS_FAILURE,
//   payload: { error }
// });

// Asynchronous actions
// login to app
export const login = (username, password) => async dispatch => {
  dispatch(loginRequest());

  try {
    const res = await axios.post(`${baseURL}/user/get_auth_token/`, {
      username,
      password
    });

    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));

    throw new Error(400);
  }
};

// fetch current profile
export const fetchProfile = profileId => async dispatch => {
  dispatch(profileRequest());

  try {
    const res = await axios.get(`${baseURL}/profiles/${profileId}/`);

    dispatch(profileSuccess(res.data));
  } catch (error) {
    dispatch(profileFailure(error));
  }
};

// favorite or unfavorite
export const favoriteGarment = (id, userParams) => async dispatch => {
  const { token, profileId, favoriteGarments } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favoriteGarments.includes(id)) {
    // Unfavoriting
    let filteredGarments = favoriteGarments.filter(
      garmentId => garmentId !== id
    );

    favorites = [...filteredGarments];
  } else {
    // Favoriting, so add id
    favorites = [...favoriteGarments, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      {
        favorite_garments: favorites
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

export const favoriteFit = (id, userParams) => async dispatch => {
  const { token, profileId, favoriteFits } = userParams;
  let favorites = [];

  dispatch(favoriteRequest());

  if (favoriteFits.includes(id)) {
    // Unfavoriting
    let filteredFits = favoriteFits.filter(fitId => fitId !== id);

    favorites = [...filteredFits];
  } else {
    // Favoriting, so add id
    favorites = [...favoriteFits, id];
  }

  try {
    const res = await axios.patch(
      `${baseURL}/profiles/${profileId}/`,
      {
        favorite_fits: favorites
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    dispatch(favoriteSuccess(res.data));
  } catch (error) {
    dispatch(favoriteFailure(error));
  }
};

// export const fetchMyFits = profileId => async dispatch => {
//   dispatch(fetchMyFitsBegin());

//   try {
//     const res = await axios.get(`${baseURL}/profiles/${profileId}/fits/`);
//     dispatch(fetchMyFitsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchMyFitsFailure(error));
//   }
// };

// export const fetchFavoriteGarments = garmentId => async dispatch => {
//   dispatch(fetchFavoriteGarmentsBegin());

//   try {
//     const res = await axios.get(`${baseURL}/garments/${garmentId}/`);
//     dispatch(fetchFavoriteGarmentsSuccess(res.data));
//   } catch (error) {
//     dispatch(fetchFavoriteGarmentsFailure(error));
//   }
// };

// export const fetchFavoriteFits = favoriteFitIds => async dispatch => {
//   dispatch(fetchFavoriteFitsBegin());

//   try {
//     const res = await axios.get(
//       `${baseURL}/fits/?ids=${favoriteFitIds.toString()}`
//     );

//     dispatch(fetchFavoriteFitsSuccess(res.data.results));
//   } catch (error) {
//     dispatch(fetchFavoriteFitsFailure(error));
//   }
// };

// Selectors
// Is the current user logged in?
// export const isLoggedIn = loginState => loginState.username !== null;
