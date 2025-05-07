import { ActionType } from './action';
import { ActionType as ActionTypeVote } from '../votes/action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.GET_THREADS:
    return action.payload.threads;
  case ActionType.CREATE_THREAD:
    return [action.payload.thread, ...threads];
  case ActionTypeVote.TOGGLE_UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.includes(action.payload.authUserId)
            ? thread.upVotesBy.filter((id) => id !== action.payload.authUserId)
            : [...thread.upVotesBy, action.payload.authUserId],
          downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.authUserId)
        };
      }
      return thread;
    });
  case ActionTypeVote.TOGGLE_DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.authUserId),
          downVotesBy: thread.downVotesBy.includes(action.payload.authUserId)
            ? thread.downVotesBy.filter((id) => id !== action.payload.authUserId)
            : [...thread.downVotesBy, action.payload.authUserId],
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;