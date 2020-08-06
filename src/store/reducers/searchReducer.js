import { handleActions } from 'redux-actions';
import searchActionTypes from '../actions/searchActionTypes';

const initialState = {
  searchQuery: null,
  searchCategory: null,
};

export default handleActions(
  {
    [searchActionTypes.SET_SEARCH_QUERY]: (state, action) => ({
      ...state,
      searchQuery: action.searchQuery,
      searchCategory: null,
    }),

    [searchActionTypes.SET_SEARCH_CATEGORY]: (state, action) => ({
      ...state,
      searchQuery: null,
      searchCategory: action.searchCategory,
    }),
  },
  initialState
);
