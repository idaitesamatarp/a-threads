import { ActionType } from './action';

const filterReducer = (searchTerm = '', action = {}) => {
  switch (action.type) {
  case ActionType.SEARCH_BY_CATEGORY:
    return action.payload.searchTerm;
  default:
    return searchTerm;
  }
};

export default filterReducer;