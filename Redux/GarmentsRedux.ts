import axios from 'axios';
import { baseURL } from '../Config';
import { GarmentActionTypes, AppThunk, GarmentState, Garment } from '../types';
import { createSelector } from 'reselect';

// Actions
export const FETCH_GARMENTS_BEGIN = 'FETCH_GARMENTS_BEGIN';
export const FETCH_GARMENTS_SUCCESS = 'FETCH_GARMENTS_SUCCESS';
export const FETCH_GARMENTS_FAILURE = 'FETCH_GARMENTS_FAILURE';

export const CREATE_GARMENT_BEGIN = 'CREATE_GARMENT_BEGIN';
export const CREATE_GARMENT_SUCCESS = 'CREATE_GARMENT_SUCCESS';
export const CREATE_GARMENT_FAILURE = 'CREATE_GARMENT_FAILURE';

export const FETCH_FIT_GARMENTS_BEGIN = 'FETCH_FIT_GARMENTS_BEGIN';
export const FETCH_FIT_GARMENTS_SUCCESS = 'FETCH_FIT_GARMENTS_SUCCESS';
export const FETCH_FIT_GARMENTS_FAILURE = 'FETCH_FIT_GARMENTS_FAILURE';

export const CLEAR_CREATED_GARMENT = 'CLEAR_CREATED_GARMENT';

export const SYNC_GARMENT_COMMENTS = 'SYNC_GARMENT_COMMENTS';
export const SYNC_GARMENT_COMMENT_REPLIES = 'SYNC_GARMENT_COMMENT_REPLIES';

export const INITIAL_STATE: GarmentState = {
  items: [],
  loading: false,
  error: null,
  fitGarments: [],
  createdGarment: null,
};

// Reducer
export default function garments(state = INITIAL_STATE, action: GarmentActionTypes): GarmentState {
  switch (action.type) {
    case FETCH_GARMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GARMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case FETCH_GARMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_FIT_GARMENTS_BEGIN:
      return {
        ...state,
        fitGarments: [],
        loading: true,
        error: null,
      };
    case FETCH_FIT_GARMENTS_SUCCESS:
      return {
        ...state,
        fitGarments: action.payload,
        error: null,
        loading: false,
      };
    case FETCH_FIT_GARMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CREATE_GARMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        createdGarment: null,
      };
    case CREATE_GARMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        createdGarment: action.payload,
      };
    case CREATE_GARMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_CREATED_GARMENT:
      return {
        ...state,
        loading: false,
        createdGarment: null,
      };

    // case SYNC_GARMENT_COMMENTS: {
    //   const { comment } = action.payload;
    //   const items = state.items.map((garment) => {
    //     if (garment.id === comment.object_id) {
    //       return { ...garment, comments: [...garment.comments, comment] };
    //     } else {
    //       return garment;
    //     }
    //   });

    //   return {
    //     ...state,
    //     items,
    //   };
    // }

    // case SYNC_GARMENT_COMMENT_REPLIES: {
    //   const { reply, objectId } = action.payload;
    //   const items = state.items.map((garment) => {
    //     if (garment.id === objectId) {
    //       const comments = garment.comments.map((comment) => {
    //         if (comment.id === reply.comment) {
    //           return { ...comment, replies: [...comment.replies, reply] };
    //         } else {
    //           return comment;
    //         }
    //       });

    //       return { ...garment, comments };
    //     } else {
    //       return garment;
    //     }
    //   });

    //   return {
    //     ...state,
    //     items,
    //   };
    // }

    default:
      return state;
  }
}

// Action Creators
export const fetchGarmentsBegin = (): GarmentActionTypes => ({
  type: FETCH_GARMENTS_BEGIN,
});

export const fetchGarmentsSuccess = (items: Garment[]): GarmentActionTypes => ({
  type: FETCH_GARMENTS_SUCCESS,
  payload: items,
});
export const fetchGarmentsFailure = ({
  error,
}: Pick<GarmentState, 'error'>): GarmentActionTypes => ({
  type: FETCH_GARMENTS_FAILURE,
  payload: { error },
});

export const fetchFitGarmentsBegin = (): GarmentActionTypes => ({
  type: FETCH_FIT_GARMENTS_BEGIN,
});

export const fetchFitGarmentsSuccess = (garments: Garment[]): GarmentActionTypes => ({
  type: FETCH_FIT_GARMENTS_SUCCESS,
  payload: garments,
});
export const fetchFitGarmentsFailure = ({
  error,
}: Pick<GarmentState, 'error'>): GarmentActionTypes => ({
  type: FETCH_FIT_GARMENTS_FAILURE,
  payload: { error },
});

export const createGarmentBegin = (): GarmentActionTypes => ({
  type: CREATE_GARMENT_BEGIN,
});
export const createGarmentSuccess = (createdGarment: Garment): GarmentActionTypes => ({
  type: CREATE_GARMENT_SUCCESS,
  payload: createdGarment,
});
export const createGarmentFailure = ({ error }: GarmentState): GarmentActionTypes => ({
  type: CREATE_GARMENT_FAILURE,
  payload: { error },
});

export const clearCreatedGarment = (): GarmentActionTypes => ({
  type: CLEAR_CREATED_GARMENT,
});

// export const syncGarmentComments = (comment) => ({
//   type: SYNC_GARMENT_COMMENTS,
//   payload: {
//     comment,
//   },
// });
// export const syncGarmentCommentReplies = (reply, objectId) => ({
//   type: SYNC_GARMENT_COMMENT_REPLIES,
//   payload: {
//     reply,
//     objectId,
//   },
// });

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchGarments = ({ brand }): AppThunk => async (dispatch) => {
  dispatch(fetchGarmentsBegin());
  try {
    const res = await axios.get(`${baseURL}/garments/?limit=1500`, {
      params: {
        brand,
      },
    });
    dispatch(fetchGarmentsSuccess(res.data.results));
  } catch (error) {
    dispatch(fetchGarmentsFailure(error));
  }
};

export const fetchFitGarments = (garments: number[]): AppThunk => async (dispatch) => {
  dispatch(fetchFitGarmentsBegin());

  try {
    const response = await Promise.all(
      garments.map(async (garmentId) => {
        const response = await axios.get(`${baseURL}/garments/${garmentId}`);
        return response.data;
      }),
    );
    dispatch(fetchFitGarmentsSuccess(response));
  } catch (error) {
    dispatch(fetchFitGarmentsFailure(error));
  }
};

export const createGarment = ({ brand, color, model }): AppThunk => async (dispatch) => {
  dispatch(createGarmentBegin());

  try {
    const res = await axios.post(`${baseURL}/garments/`, {
      sku: Math.floor(Math.random() * 1000000000),
      brand_id: brand,
      color,
      model,
      photo: 'https://x',
      purchase_page: 'https://x',
    });
    dispatch(createGarmentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(createGarmentFailure(error));
  }
};

// Selectors
const garmentsSelector = (state) => state.garments.items;

export const garmentsByMostRecentSelector = createSelector(garmentsSelector, (items) =>
  items.sort((a, b) => (b.created_date - a.created_date ? 1 : -1)),
);

export const garmentsByMostFavoritedSelector = createSelector(garmentsSelector, (items) =>
  items.sort((a, b) => (b.favorited_by.length > a.favorited_by.length ? 1 : -1)),
);

// API call
export const fetchGarment = async (id: number) => {
  try {
    const res = await axios.get(`${baseURL}/garments/${id}`);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchGarmentFits = async (garmentId: number) => {
  try {
    const res = await axios.get(`${baseURL}/fits/`, {
      params: {
        garments: garmentId,
      },
    });

    return res.data.results;
  } catch (err) {
    return err;
  }
};
