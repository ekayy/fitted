import axios from 'axios';
import { baseURL } from '../Config';

// Actions
const FETCH_COMMENTS_BEGIN = 'FETCH_COMMENTS_BEGIN';
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
const UPVOTE_COMMENT_BEGIN = 'UPVOTE_COMMENT_BEGIN';
const UPVOTE_COMMENT_SUCCESS = 'UPVOTE_COMMENT_SUCCESS';
const UPVOTE_COMMENT_FAILURE = 'UPVOTE_COMMENT_FAILURE';
const DOWNVOTE_COMMENT_BEGIN = 'DOWNVOTE_COMMENT_BEGIN';
const DOWNVOTE_COMMENT_SUCCESS = 'DOWNVOTE_COMMENT_SUCCESS';
const DOWNVOTE_COMMENT_FAILURE = 'DOWNVOTE_COMMENT_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null
};

// Reducer
export default function comments(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        // items: [...state.items, ...action.payload.garments]
        items: [...action.payload.comments]
      };

    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items
      };

    case DOWNVOTE_COMMENT_BEGIN:
      return {
        ...state,
        loading: true
      };

    case UPVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    case UPVOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case DOWNVOTE_COMMENT_BEGIN:
      return {
        ...state,
        loading: true
      };

    case DOWNVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    case DOWNVOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

// Action Creators
export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});

export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: {
    comments
  }
});

export const fetchCommentsFailure = error => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: {
    error
  }
});

export const upvoteCommentBegin = () => ({
  type: UPVOTE_COMMENT_BEGIN
});

export const upvoteCommentSuccess = () => ({
  type: UPVOTE_COMMENT_SUCCESS
});

export const upvoteCommentFailure = error => ({
  type: UPVOTE_COMMENT_FAILURE,
  payload: {
    error
  }
});

export const downvoteCommentBegin = () => ({
  type: DOWNVOTE_COMMENT_BEGIN
});

export const downvoteCommentSuccess = () => ({
  type: DOWNVOTE_COMMENT_SUCCESS
});

export const downvoteCommentFailure = error => ({
  type: DOWNVOTE_COMMENT_FAILURE,
  payload: {
    error
  }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchComments(id) {
  return dispatch => {
    dispatch(fetchCommentsBegin());
    return axios
      .get(`${baseURL}/comments/${id}/`)
      .then(response => dispatch(fetchCommentsSuccess(response.data.results)))
      .catch(error => dispatch(fetchCommentsFailure(error)));
  };
}

export const upvoteComment = (id, profileId) => async dispatch => {
  dispatch(upvoteBegin());

  try {
    const res = await axios.put(
      `${baseURL}/comments/${id}/upvote/profile/${profileId}/`
    );
    dispatch(upvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(upvoteCommentFailure(error));
  }
};

export const downvoteComment = (id, profileId) => async dispatch => {
  dispatch(downvoteBegin());

  try {
    const res = await axios.put(
      `${baseURL}/comments/${id}/downvote/profile/${profileId}/`
    );
    dispatch(downvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(downvoteCommentFailure(error));
  }
};
