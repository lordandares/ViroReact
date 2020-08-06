import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RETRIEVE_ZONES } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import { createEntityMap } from '../../utils/entityUtils';
import ZoneModel from '../models/ZoneModel';

const initialState = {
  zones: Map({}),
  loadingZones: false,
  retrieveZonesFailed: false,
};

export default handleActions(
  {
    [`${RETRIEVE_ZONES}_${REQUEST}`]: state => ({
      ...state,
      loadingZones: true,
      retrieveZonesFailed: false,
    }),
    [`${RETRIEVE_ZONES}_${SUCCESS}`]: (state, action) => ({
      ...state,
      zones: createEntityMap(action.data, ZoneModel),
      loadingZones: false,
    }),
    [`${RETRIEVE_ZONES}_${FAILURE}`]: state => ({
      ...state,
      loadingZones: false,
      retrieveZonesFailed: true,
    }),
  },
  initialState
);
