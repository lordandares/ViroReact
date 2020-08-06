import { handleActions } from 'redux-actions';
import { RETRIEVE_CURRENT_POSITION } from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';

const initialState = {
  currentPosition: null,
  retrievingCurrentPosition: false,
};

export default handleActions(
  {
    [`${RETRIEVE_CURRENT_POSITION}_${REQUEST}`]: state => ({
      ...state,
      retrievingCurrentPosition: true,
    }),
    [`${RETRIEVE_CURRENT_POSITION}_${SUCCESS}`]: (state, action) => ({
      ...state,
      currentPosition: { longitude: action.longitude, latitude: action.latitude },
      retrievingCurrentPosition: false,
    }),
    [`${RETRIEVE_CURRENT_POSITION}_${FAILURE}`]: state => ({
      ...state,
      currentPosition: null,
      retrievingCurrentPosition: false,
    }),
  },
  initialState
);
