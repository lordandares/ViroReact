import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { RETRIEVE_KIOSKS } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import { createEntityMap } from '../../utils/entityUtils';
import KioskModel from '../models/KioskModel';

const initialState = {
  kiosks: Map({}),
  loadingKiosks: false,
  retrieveKiosksFailed: false,
};

export default handleActions(
  {
    [`${RETRIEVE_KIOSKS}_${REQUEST}`]: state => ({
      ...state,
      loadingKiosks: true,
      retrieveKiosksFailed: false,
    }),
    [`${RETRIEVE_KIOSKS}_${SUCCESS}`]: (state, action) => ({
      ...state,
      kiosks: createEntityMap(action.data, KioskModel),
      loadingKiosks: false,
    }),
    [`${RETRIEVE_KIOSKS}_${FAILURE}`]: state => ({
      ...state,
      loadingKiosks: false,
      retrieveKiosksFailed: true,
    }),
  },
  initialState
);
