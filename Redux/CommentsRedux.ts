import axios from 'axios';
import { baseURL } from '../Config';
// import { createSelector } from 'reselect';
import { CommentState, CommentActionTypes, AppThunk } from '../types';

// Actions
export const FETCH_COMMENTS_BEGIN = 'FETCH_COMMENTS_BEGIN';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const UPVOTE_COMMENT_BEGIN = 'UPVOTE_COMMENT_BEGIN';
export const UPVOTE_COMMENT_SUCCESS = 'UPVOTE_COMMENT_SUCCESS';
export const UPVOTE_COMMENT_FAILURE = 'UPVOTE_COMMENT_FAILURE';
export const DOWNVOTE_COMMENT_BEGIN = 'DOWNVOTE_COMMENT_BEGIN';
export const DOWNVOTE_COMMENT_SUCCESS = 'DOWNVOTE_COMMENT_SUCCESS';
export const DOWNVOTE_COMMENT_FAILURE = 'DOWNVOTE_COMMENT_FAILURE';

export const UPVOTE_REPLY_BEGIN = 'UPVOTE_REPLY_BEGIN';
export const UPVOTE_REPLY_SUCCESS = 'UPVOTE_REPLY_SUCCESS';
export const UPVOTE_REPLY_FAILURE = 'UPVOTE_REPLY_FAILURE';
export const DOWNVOTE_REPLY_BEGIN = 'DOWNVOTE_REPLY_BEGIN';
export const DOWNVOTE_REPLY_SUCCESS = 'DOWNVOTE_REPLY_SUCCESS';
export const DOWNVOTE_REPLY_FAILURE = 'DOWNVOTE_REPLY_FAILURE';

export const POST_COMMENT_BEGIN = 'POST_COMMENT_BEGIN';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

export const POST_REPLY_BEGIN = 'POST_REPLY_BEGIN';
export const POST_REPLY_SUCCESS = 'POST_REPLY_SUCCESS';
export const POST_REPLY_FAILURE = 'POST_REPLY_FAILURE';

export const LOAD_REPLIES_BEGIN = 'LOAD_REPLIES_BEGIN';
export const LOAD_REPLIES_SUCCESS = 'LOAD_REPLIES_SUCCESS';
export const LOAD_REPLIES_FAILURE = 'LOAD_REPLIES_FAILURE';

export const INITIAL_STATE: CommentState = {
  items: [],
  loading: false,
  error: null,
  content: '',
  // replies: {},
};

// Reducer
export default function comments(state = INITIAL_STATE, action: CommentActionTypes): CommentState {
  switch (action.type) {
    case FETCH_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...action.payload.comments],
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPVOTE_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case UPVOTE_COMMENT_SUCCESS: {
      const { id, upvotes } = action.payload.comment;

      const items = state.items.map((item) => {
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
        items,
      };
    }

    case UPVOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DOWNVOTE_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case DOWNVOTE_COMMENT_SUCCESS: {
      const { id, downvotes } = action.payload.comment;

      const items = state.items.map((item) => {
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
        items,
      };
    }

    case DOWNVOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPVOTE_REPLY_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case UPVOTE_REPLY_SUCCESS: {
      const { replyResponse } = action.payload;

      const items = state.items.map((comment) => {
        if (comment.id === replyResponse.comment) {
          const replies = comment.replies.map((reply) => {
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
        items,
      };
    }

    case UPVOTE_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DOWNVOTE_REPLY_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case DOWNVOTE_REPLY_SUCCESS: {
      const { replyResponse } = action.payload;

      const items = state.items.map((comment) => {
        if (comment.id === replyResponse.comment) {
          const replies = comment.replies.map((reply) => {
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
        items,
      };
    }

    case DOWNVOTE_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case POST_COMMENT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case POST_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, { ...action.payload.comment, replies: [] }],
      };
    }
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case POST_REPLY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case POST_REPLY_SUCCESS: {
      const { reply } = action.payload;

      const items = state.items.map((item) => {
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
        items,
      };
    }
    case POST_REPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case LOAD_REPLIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOAD_REPLIES_SUCCESS: {
      const { replies } = action.payload;
      if (!replies.length) {
        return { ...state, loading: false, error: null };
      }
      const commentId = replies[0]['comment'];

      const items = state.items.map((item) => {
        if (item.id === commentId) {
          return { ...item, replies: [...item.replies, ...replies] };
        } else {
          return item;
        }
      });
      return {
        ...state,
        loading: false,
        error: null,
        items,
      };
    }
    case LOAD_REPLIES_FAILURE:
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
export const fetchCommentsBegin = (): CommentActionTypes => ({
  type: FETCH_COMMENTS_BEGIN,
});
export const fetchCommentsSuccess = ({ comments }): CommentActionTypes => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comments },
});
export const fetchCommentsFailure = (error): CommentActionTypes => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error },
});

export const upvoteCommentBegin = (): CommentActionTypes => ({
  type: UPVOTE_COMMENT_BEGIN,
});
export const upvoteCommentSuccess = (comment): CommentActionTypes => ({
  type: UPVOTE_COMMENT_SUCCESS,
  payload: { comment },
});
export const upvoteCommentFailure = (error): CommentActionTypes => ({
  type: UPVOTE_COMMENT_FAILURE,
  payload: { error },
});

export const downvoteCommentBegin = (): CommentActionTypes => ({
  type: DOWNVOTE_COMMENT_BEGIN,
});
export const downvoteCommentSuccess = (comment): CommentActionTypes => ({
  type: DOWNVOTE_COMMENT_SUCCESS,
  payload: { comment },
});
export const downvoteCommentFailure = (error): CommentActionTypes => ({
  type: DOWNVOTE_COMMENT_FAILURE,
  payload: { error },
});

export const upvoteReplyBegin = (): CommentActionTypes => ({
  type: UPVOTE_REPLY_BEGIN,
});
export const upvoteReplySuccess = (replyResponse): CommentActionTypes => ({
  type: UPVOTE_REPLY_SUCCESS,
  payload: { replyResponse },
});
export const upvoteReplyFailure = (error) => ({
  type: UPVOTE_REPLY_FAILURE,
  payload: {
    error,
  },
});

export const downvoteReplyBegin = (): CommentActionTypes => ({
  type: DOWNVOTE_REPLY_BEGIN,
});
export const downvoteReplySuccess = (replyResponse): CommentActionTypes => ({
  type: DOWNVOTE_REPLY_SUCCESS,
  payload: { replyResponse },
});
export const downvoteReplyFailure = (error): CommentActionTypes => ({
  type: DOWNVOTE_REPLY_FAILURE,
  payload: {
    error,
  },
});

export const postCommentBegin = (): CommentActionTypes => ({
  type: POST_COMMENT_BEGIN,
});
export const postCommentSuccess = (comment): CommentActionTypes => ({
  type: POST_COMMENT_SUCCESS,
  payload: { comment },
});
export const postCommentFailure = (error): CommentActionTypes => ({
  type: POST_COMMENT_FAILURE,
  payload: { error },
});

export const postReplyBegin = (): CommentActionTypes => ({
  type: POST_REPLY_BEGIN,
});
export const postReplySuccess = (reply): CommentActionTypes => ({
  type: POST_REPLY_SUCCESS,
  payload: { reply },
});
export const postReplyFailure = (error): CommentActionTypes => ({
  type: POST_REPLY_FAILURE,
  payload: { error },
});

export const loadRepliesBegin = (): CommentActionTypes => ({
  type: LOAD_REPLIES_BEGIN,
});
export const loadRepliesSuccess = (replies): CommentActionTypes => ({
  type: LOAD_REPLIES_SUCCESS,
  payload: { replies },
});
export const loadRepliesFailure = (error): CommentActionTypes => ({
  type: LOAD_REPLIES_FAILURE,
  payload: { error },
});

// side effects, only as applicable
// e.g. thunks, epics, etc
export const fetchComments = (objectId, origin): AppThunk => async (dispatch) => {
  dispatch(fetchCommentsBegin());

  try {
    const res = await axios.get(`${baseURL}/comments/`, {
      params: {
        origin,
        object_id: objectId,
      },
    });

    // sort by newest comments
    const sortedComments = res.data.results.sort(
      (a, b) => (new Date(b.created_date) as any) - (new Date(a.created_date) as any),
    );

    dispatch(fetchCommentsSuccess(sortedComments));
  } catch (error) {
    dispatch(fetchCommentsFailure(error));
  }
};

export const upvoteComment = (id, profileId): AppThunk => async (dispatch) => {
  dispatch(upvoteCommentBegin());

  try {
    const res = await axios.put(`${baseURL}/comments/${id}/upvote/profile/${profileId}/`);
    dispatch(upvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(upvoteCommentFailure(error));
  }
};

export const downvoteComment = (id, profileId): AppThunk => async (dispatch) => {
  dispatch(downvoteCommentBegin());

  try {
    const res = await axios.put(`${baseURL}/comments/${id}/downvote/profile/${profileId}/`);
    dispatch(downvoteCommentSuccess(res.data));
  } catch (error) {
    dispatch(downvoteCommentFailure(error));
  }
};

export const upvoteReply = (id, profileId): AppThunk => async (dispatch) => {
  dispatch(upvoteReplyBegin());

  try {
    const res = await axios.put(`${baseURL}/replies/${id}/upvote/profile/${profileId}/`);
    dispatch(upvoteReplySuccess(res.data));
  } catch (error) {
    dispatch(upvoteReplyFailure(error));
  }
};

export const downvoteReply = (id, profileId): AppThunk => async (dispatch) => {
  dispatch(downvoteReplyBegin());

  try {
    const res = await axios.put(`${baseURL}/replies/${id}/downvote/profile/${profileId}/`);
    dispatch(downvoteReplySuccess(res.data));
  } catch (error) {
    dispatch(downvoteReplyFailure(error));
  }
};

export const postComment = ({ contentType, objectId, profileId, content }): AppThunk => async (
  dispatch,
) => {
  dispatch(postCommentBegin());

  try {
    const res = await axios.post(`${baseURL}/comments/`, {
      content_type: contentType,
      object_id: objectId,
      profile: profileId,
      content,
    });

    dispatch(postCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(postCommentFailure(error));
  }
};

export const postReply = ({ commentId, profileId, content }): AppThunk => async (dispatch) => {
  dispatch(postReplyBegin());

  try {
    const res = await axios.post(`${baseURL}/replies/`, {
      comment: commentId,
      profile: profileId,
      content,
    });

    dispatch(postReplySuccess(res.data));
  } catch (error) {
    dispatch(postReplyFailure(error));
  }
};

export const loadReplies = ({ commentId, offset = 2 }): AppThunk => async (dispatch) => {
  dispatch(loadRepliesBegin());

  try {
    const res = await axios.get(`${baseURL}/replies/`, {
      params: {
        comment: commentId,
        offset,
      },
    });

    dispatch(loadRepliesSuccess(res.data.results));
  } catch (error) {
    dispatch(loadRepliesFailure(error));
  }
};

/* Selectors */
// export const selectRecentComments = createSelector(
//   (state) => state.comments.items,
//   (comments) => comments.sort((a, b) => (new Date(b.created_date) as any) - new Date(a.created_date)),
// );

// export const selectPopularComments = createSelector(
//   (state) => state.comments.items,
//   (comments) => comments.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)),
// );
