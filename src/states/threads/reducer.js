import { ActionType } from './action';
import { ActionType as ActionTypeVote } from '../votes/action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREADS:
      return [action.payload.thread, ...threads];
    case ActionType.SHOW_THREADS:
      return threads.find((thread) =>
        thread.id === action.payload.threadId
      );
    case ActionType.SHOW_THREADS_BY_CATEGORY:
      return action.payload.searchTerm;
    case ActionTypeVote.TOGGLE_UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.authUserId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.authUserId)
              : [...thread.upVotesBy, action.payload.authUserId],
          };
        }
        return thread;
      });
    case ActionTypeVote.TOGGLE_DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
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