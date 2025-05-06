const ActionType = {
  SEARCH_BY_CATEGORY: 'SEARCH_BY_CATEGORY'
};

const setSearchTerm = (searchTerm) => {
  return {
    type: ActionType.SEARCH_BY_CATEGORY,
    payload: {
      searchTerm
    }
  };
};

export {
  ActionType,
  setSearchTerm,
};
