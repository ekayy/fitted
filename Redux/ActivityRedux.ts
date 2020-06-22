import axios from 'axios';
import { baseURL } from '../Config';
import { ActivityState, ActivityActionTypes, AppThunk, Activity } from '../types';

// Actions
export const FETCH_ACTIVITY_BEGIN = 'FETCH_ACTIVITY_BEGIN';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_FAILURE = 'FETCH_ACTIVITY_FAILURE';

export const INITIAL_STATE: ActivityState = {
  comments: [],
  loading: false,
  error: null,
};

// Reducer
export default function activity(
  state = INITIAL_STATE,
  action: ActivityActionTypes,
): ActivityState {
  switch (action.type) {
    case FETCH_ACTIVITY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    case FETCH_ACTIVITY_FAILURE:
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
export const fetchActivityBegin = (): ActivityActionTypes => ({
  type: FETCH_ACTIVITY_BEGIN,
});

export const fetchActivitySuccess = (items: Activity[]): ActivityActionTypes => ({
  type: FETCH_ACTIVITY_SUCCESS,
  payload: items,
});

export const fetchActivityFailure = ({ error }: ActivityState): ActivityActionTypes => ({
  type: FETCH_ACTIVITY_FAILURE,
  payload: { error },
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchActivity = (profile): AppThunk => async (dispatch) => {
  dispatch(fetchActivityBegin());

  try {
    const res = await axios.get(`${baseURL}/comments/`, {
      params: {
        profile,
        ordering: '-created_date',
      },
    });

    dispatch(fetchActivitySuccess(res.data.results));
  } catch (error) {
    dispatch(fetchActivityFailure(error));
  }
};
