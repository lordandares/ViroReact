import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  RETRIEVE_EVENTS,
  RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO,
  RETRIEVE_EVENTS_DYNAMIC_INFO,
  RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO,
  SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO,
} from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import EventModel from '../models/EventModel';
import { createEntityMap } from '../../utils/entityUtils';
import EventDynamicInfoModel from '../models/EventDynamicInfoModel';
import eventActionTypes from '../actions/eventActionTypes';

const initialState = {
  events: Map({}),
  loadingEvents: false,
  retrieveEventsFailed: false,

  eventsDynamicInfo: Map({}),
  loadingEventsDynamicInfo: false,
  retrieveEventsDynamicInfoFailed: false,

  loadingEventsAndUserDynamicInfo: false,
  retrieveEventsAndUserDynamicInfoFailed: false,

  ratingAndUpdateInProgress: false,
  ratingAndUpdateFailed: false,

  settingFavoriteAndUpdateInProgress: false,
  settingFavoriteAndUpdateFailed: false,

  selectedEventId: null,
};

export default handleActions(
  {
    [`${RETRIEVE_EVENTS}_${REQUEST}`]: state => ({
      ...state,
      loadingEvents: true,
      retrieveEventsFailed: false,
    }),
    [`${RETRIEVE_EVENTS}_${SUCCESS}`]: (state, action) => ({
      ...state,
      events: createEntityMap(action.data, EventModel),
      loadingEvents: false,
    }),
    [`${RETRIEVE_EVENTS}_${FAILURE}`]: state => ({
      ...state,
      loadingEvents: false,
      retrieveEventsFailed: true,
    }),

    [`${RETRIEVE_EVENTS_DYNAMIC_INFO}_${REQUEST}`]: state => ({
      ...state,
      loadingEventsDynamicInfo: true,
      retrieveEventsDynamicInfoFailed: false,
    }),
    [`${RETRIEVE_EVENTS_DYNAMIC_INFO}_${SUCCESS}`]: (state, action) => ({
      ...state,
      eventsDynamicInfo: createEntityMap(action.data, EventDynamicInfoModel),
      loadingEventsDynamicInfo: false,
    }),
    [`${RETRIEVE_EVENTS_DYNAMIC_INFO}_${FAILURE}`]: state => ({
      ...state,
      loadingEventsDynamicInfo: false,
      retrieveEventsDynamicInfoFailed: true,
    }),

    [`${RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO}_${REQUEST}`]: state => ({
      ...state,
      loadingEventsAndUserDynamicInfo: true,
      retrieveEventsAndUserDynamicInfoFailed: false,
    }),
    [`${RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO}_${SUCCESS}`]: state => ({
      ...state,
      loadingEventsAndUserDynamicInfo: false,
    }),
    [`${RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO}_${FAILURE}`]: state => ({
      ...state,
      loadingEventsAndUserDynamicInfo: false,
      retrieveEventsAndUserDynamicInfoFailed: true,
    }),

    [`${RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${REQUEST}`]: state => ({
      ...state,
      ratingAndUpdateInProgress: true,
      ratingAndUpdateFailed: false,
    }),
    [`${RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${SUCCESS}`]: state => ({
      ...state,
      ratingAndUpdateInProgress: false,
    }),
    [`${RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${FAILURE}`]: state => ({
      ...state,
      ratingAndUpdateInProgress: false,
      ratingAndUpdateFailed: true,
    }),

    [`${SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${REQUEST}`]: state => ({
      ...state,
      settingFavoriteAndUpdateInProgress: true,
      settingFavoriteAndUpdateFailed: false,
    }),
    [`${SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${SUCCESS}`]: state => ({
      ...state,
      settingFavoriteAndUpdateInProgress: false,
    }),
    [`${SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO}_${FAILURE}`]: state => ({
      ...state,
      settingFavoriteAndUpdateInProgress: false,
      settingFavoriteAndUpdateFailed: true,
    }),

    [eventActionTypes.SET_SELECTED_EVENT_ID]: (state, action) => ({
      ...state,
      selectedEventId: action.id,
    }),

    [eventActionTypes.RESET_FAVORING_AND_UPDATE_FAILURE]: state => ({
      ...state,
      settingFavoriteAndUpdateFailed: false,
    }),

    [eventActionTypes.RESET_RATING_AND_UPDATE_FAILURE]: state => ({
      ...state,
      ratingAndUpdateFailed: false,
    }),
  },
  initialState
);
