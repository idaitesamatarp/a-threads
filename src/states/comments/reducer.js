import { ActionType } from './action';

function commentsReducer(comment = {}, action = {}) {
  if (action.type === ActionType.CREATE_COMMENTS) {
    return action.payload.comment
  }
  return comment
}

export default commentsReducer;