import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RETRIEVE_CATEGORIES } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import { createEntityMap } from '../../utils/entityUtils';
import CategoryModel from '../models/CategoryModel';

const initialState = {
  categories: Map({}),
  loadingCategories: false,
  retrieveCategoriesFailed: false,
};

export default handleActions(
  {
    [`${RETRIEVE_CATEGORIES}_${REQUEST}`]: state => ({
      ...state,
      loadingCategories: true,
      retrieveCategoriesFailed: false,
    }),
    [`${RETRIEVE_CATEGORIES}_${SUCCESS}`]: (state, action) => ({
      ...state,
      categories: createEntityMap(action.data, CategoryModel),
      loadingCategories: false,
    }),
    [`${RETRIEVE_CATEGORIES}_${FAILURE}`]: state => ({
      ...state,
      loadingCategories: false,
      retrieveCategoriesFailed: true,
    }),
  },
  initialState
);
