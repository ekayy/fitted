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

const UPVOTE_REPLY_BEGIN = 'UPVOTE_REPLY_BEGIN';
const UPVOTE_REPLY_SUCCESS = 'UPVOTE_REPLY_SUCCESS';
const UPVOTE_REPLY_FAILURE = 'UPVOTE_REPLY_FAILURE';
const DOWNVOTE_REPLY_BEGIN = 'DOWNVOTE_REPLY_BEGIN';
const DOWNVOTE_REPLY_SUCCESS = 'DOWNVOTE_REPLY_SUCCESS';
const DOWNVOTE_REPLY_FAILURE = 'DOWNVOTE_REPLY_FAILURE';

const POST_COMMENT_BEGIN = 'POST_COMMENT_BEGIN';
const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

const POST_REPLY_BEGIN = 'POST_REPLY_BEGIN';
const POST_REPLY_SUCCESS = 'POST_REPLY_SUCCESS';
const POST_REPLY_FAILURE = 'POST_REPLY_FAILURE';

export const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
  content: null
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
        items: [...action.payload.comments]
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case UPVOTE_COMMENT_BEGIN:
      return {
        ...state,
        loading: true
      };

    case UPVOTE_COMMENT_SUCCESS: {
      const { id, upvotes } = action.payload.comment;

      const items = state.items.map(item => {
        if (item.id === id) {
          return { ...item, upvotes };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        error: null,
        items
      };
    }

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

    case DOWNVOTE_COMMENT_SUCCESS: {
      const { id, downvotes } = action.payload.comment;

      const items = state.items.map(item => {
        if (item.id === id) {
          return { ...item, downvotes };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        error: null,
        items
      };
    }

    case DOWNVOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case UPVOTE_REPLY_BEGIN:
      return {
        ...state,
        loading: true
      };

    case UPVOTE_REPLY_SUCCESS: {
      const { replyResponse } = action.payload;

      const items = state.items.map(comment => {
        if (comment.id === reply.comment) {
          const replies = comment.replies.map(reply => {
            if (reply.id === replyResponse.id) {
              return { ...reply };
            } else {
              return reply;
            }
          });

          return { ...comment, replies };
        } else {
          return comment;
        }
      });

      return {
        ...state,
        loading: false,
        error: null,
        items
      };
    }

    case UPVOTE_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case DOWNVOTE_REPLY_BEGIN:
      return {
        ...state,
        loading: true
      };

    case DOWNVOTE_REPLY_SUCCESS: {
      const { reply } = action.payload;

      const items = state.items.map(item => {
        if (item.id === reply.comment) {
          return { ...item, replies: [...item.replies, reply] };
        } else {
          return item;
        }
      });

      return {
        ...state,
        loading: false,
        error: null,
        items
      };
    }

    case DOWNVOTE_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case POST_COMMENT_BEGIN:
      return {
        ...state,
        loading: true
      };

    case POST_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, { ...action.payload.comment, replies: [] }]
      };
    }

    case POST_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case POST_REPLY_BEGIN:
      return {
        ...state,
        loading: true
      };

    case POST_REPLY_SUCCESS: {
      const { reply } = action.payload;

      const items = state.items.map(item => {
        if (item.id === reply.comment) {
          return { ...item, replies: [...item.replies, reply] };
        } else {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        error: null,
        items
      };
    }

    case POST_REPLY_FAILURE:
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
export const upvoteCommentSuccess = comment => ({
  type: UPVOTE_COMMENT_SUCCESS,
  payload: {
    comment
  }
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
export const downvoteCommentSuccess = comment => ({
  type: DOWNVOTE_COMMENT_SUCCESS,
  payload: {
    comment
  }
});
export const downvoteCommentFailure = error => ({
  type: DOWNVOTE_COMMENT_FAILURE,
  payload: {
    error
  }
});

export const upvoteReplyBegin = () => ({
  type: UPVOTE_REPLY_BEGIN
});
export const upvoteReplySuccess = replyResponse => ({
  type: UPVOTE_REPLY_SUCCESS,
  payload: {
    replyResponse
  }
});
export const upvoteReplyFailure = error => ({
  type: UPVOTE_REPLY_FAILURE,
  payload: {
    error
  }
});

export const downvoteReplyBegin = () => ({
  type: DOWNVOTE_REPLY_BEGIN
});
export const downvoteReplySuccess = replyResponse => ({
  type: DOWNVOTE_REPLY_SUCCESS,
  payload: {
    replyResponse
  }
});
export const downvoteReplyFailure = error => ({
  type: DOWNVOTE_REPLY_FAILURE,
  payload: {
    error
  }
});

export const postCommentBegin = () => ({
  type: POST_COMMENT_BEGIN
});
export const postCommentSuccess = comment => ({
  type: POST_COMMENT_SUCCESS,
  payload: {
    comment
  }
});
export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  payload: {
    error
  }
});

export const postReplyBegin = () => ({
  type: POST_REPLY_BEGIN
});
export const postReplySuccess = reply => ({
  type: POST_REPLY_SUCCESS,
  payload: {
    reply
  }
});
export const postReplyFailure = error => ({
  type: POST_REPLY_FAILURE,
  payload: {
    error
  }
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchComments = (id, contentType) => async dispatch => {
  dispatch(fetchCommentsBegin());

  try {
    const res = await axios.get(`${baseURL}/${contentType}/${id}/`);

    dispatch(fetchCommentsSuccess(res.data.comments));
  } catch (error) {
    dispatch(fetchCommentsFailure(error));
  }
};

export const upvoteComment = (id, profileId) => async dispatch => {
  dispatch(upvoteCommentBegin());

  try {
    const res = await axios.put(`${baseURL}/comments/${id}/upvote/profile/${profileId}/`);
    dispatch(upvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(upvoteCommentFailure(error));
  }
};

export const downvoteComment = (id, profileId) => async dispatch => {
  dispatch(downvoteCommentBegin());

  try {
    const res = await axios.put(`${baseURL}/comments/${id}/downvote/profile/${profileId}/`);
    dispatch(downvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(downvoteCommentFailure(error));
  }
};

export const upvoteReply = (id, profileId) => async dispatch => {
  dispatch(upvoteReplyBegin());

  try {
    const res = await axios.put(`${baseURL}/replies/${id}/upvote/profile/${profileId}/`);
    dispatch(upvoteReplySuccess(res.data));
  } catch (error) {
    dispatch(upvoteReplyFailure(error));
  }
};

export const downvoteReply = (id, profileId) => async dispatch => {
  dispatch(downvoteReplyBegin());

  try {
    const res = await axios.put(`${baseURL}/replies/${id}/downvote/profile/${profileId}/`);
    dispatch(downvoteReplySuccess(res.data));
  } catch (error) {
    dispatch(downvoteReplyFailure(error));
  }
};

export const postComment = ({ contentType, objectId, profileId, content }) => async dispatch => {
  dispatch(postCommentBegin());

  try {
    const res = await axios.post(`${baseURL}/comments/`, {
      content_type: contentType,
      object_id: objectId,
      profile: profileId,
      content
    });

    dispatch(postCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(postCommentFailure(error));
  }
};

export const postReply = ({ commentId, profileId, content }) => async dispatch => {
  dispatch(postReplyBegin());

  try {
    const res = await axios.post(`${baseURL}/replies/`, {
      comment: commentId,
      profile: profileId,
      content
    });
    dispatch(postReplySuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(postReplyFailure(error));
  }
};
