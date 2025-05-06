const ActionType = {
  SEARCH_BY_CATEGORY: 'category/SEARCH'
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
