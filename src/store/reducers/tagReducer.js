import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RETRIEVE_TAGS } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import { createEntityMap } from '../../utils/entityUtils';
import TagModel from '../models/TagModel';

const initialState = {
  tags: Map({}),
  loadingTags: false,
  retrieveTagsFailed: false,
};

export default handleActions(
  {
    [`${RETRIEVE_TAGS}_${REQUEST}`]: state => ({
      ...state,
      loadingTags: true,
      retrieveTagsFailed: false,
    }),
    [`${RETRIEVE_TAGS}_${SUCCESS}`]: (state, action) => ({
      ...state,
      tags: createEntityMap(action.data, TagModel),
      loadingTags: false,
    }),
    [`${RETRIEVE_TAGS}_${FAILURE}`]: state => ({
      ...state,
      loadingTags: false,
      retrieveTagsFailed: true,
    }),
  },
  initialState
);
