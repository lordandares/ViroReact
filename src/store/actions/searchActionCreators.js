import searchActionTypes from './searchActionTypes';

export const setSearchQuery = searchQuery => {
  return {
    type: searchActionTypes.SET_SEARCH_QUERY,
    searchQuery,
  };
};

export const setSearchCategory = searchCategory => {
  return {
    type: searchActionTypes.SET_SEARCH_CATEGORY,
    searchCategory,
  };
};
