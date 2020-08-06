import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RETRIEVE_VENUES } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import { createEntityMap } from '../../utils/entityUtils';
import VenueModel from '../models/VenueModel';

const initialState = {
  venues: Map({}),
  loadingVenues: false,
  retrieveVenuesFailed: false,
};

export default handleActions(
  {
    [`${RETRIEVE_VENUES}_${REQUEST}`]: state => ({
      ...state,
      loadingVenues: true,
      retrieveVenuesFailed: false,
    }),
    [`${RETRIEVE_VENUES}_${SUCCESS}`]: (state, action) => ({
      ...state,
      venues: createEntityMap(action.data, VenueModel),
      loadingVenues: false,
    }),
    [`${RETRIEVE_VENUES}_${FAILURE}`]: state => ({
      ...state,
      loadingVenues: false,
      retrieveVenuesFailed: true,
    }),
  },
  initialState
);
