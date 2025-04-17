import { ActionType } from './action';

function votesReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.TOGGLE_UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            likes: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default votesReducer;