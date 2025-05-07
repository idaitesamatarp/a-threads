import { ActionType } from './action';
import { ActionType as ActionTypeVote } from '../votes/action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.GET_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.authUserId)
        ? threadDetail.upVotesBy.filter((id) => id !== action.payload.authUserId)
        : [...threadDetail.upVotesBy, action.payload.authUserId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.authUserId)
    };
  case ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.authUserId),
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.authUserId)
        ? threadDetail.downVotesBy.filter((id) => id !== action.payload.authUserId)
        : [...threadDetail.downVotesBy, action.payload.authUserId],
    };
  case ActionTypeVote.TOGGLE_UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.authUserId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.authUserId)
              : [...comment.upVotesBy, action.payload.authUserId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.authUserId)
          };
        }
        return comment;
      })
    };
  case ActionTypeVote.TOGGLE_DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.authUserId),
            downVotesBy: comment.downVotesBy.includes(action.payload.authUserId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.authUserId)
              : [...comment.downVotesBy, action.payload.authUserId]
          };
        }
        return comment;
      })
    };
  case ActionType.CREATE_COMMENT_THREAD_DETAIL:
    if (threadDetail.id === action.payload.threadId) {
      return {
        ...threadDetail,
        comments: [action.payload.content, ...threadDetail.comments]
      };
    }
    break;
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;