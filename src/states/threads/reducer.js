import { ActionType } from './action';

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
    default:
      return threads;
  }
}

export default threadsReducer;