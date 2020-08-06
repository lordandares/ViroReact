import { createRequestActions } from './actionUtils';

export const RETRIEVE_EVENTS = 'RETRIEVE_EVENTS';
export const retrieveEventsActions = createRequestActions(RETRIEVE_EVENTS);

export const RETRIEVE_EVENTS_DYNAMIC_INFO = 'RETRIEVE_EVENTS_DYNAMIC_INFO';
export const retrieveEventsDynamicInfoActions = createRequestActions(RETRIEVE_EVENTS_DYNAMIC_INFO);

export const RETRIEVE_USER_DYNAMIC_INFO = 'RETRIEVE_USER_DYNAMIC_INFO';
export const retrieveUsersDynamicInfoActions = createRequestActions(RETRIEVE_USER_DYNAMIC_INFO);

export const RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO = 'RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO';
export const retrieveEventsAndUsersDynamicInfoActions = createRequestActions(
  RETRIEVE_EVENTS_AND_USER_DYNAMIC_INFO
);

export const RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO = 'RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO';
export const rateEventAndRetrieveDynamicInfoActions = createRequestActions(
  RATE_EVENT_AND_RETRIEVE_DYNAMIC_INFO
);

export const SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO =
  'SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO';
export const setFavoriteEventAndRetrieveDynamicInfoActions = createRequestActions(
  SET_FAVORITE_EVENT_AND_RETRIEVE_DYNAMIC_INFO
);

export const RETRIEVE_TAGS = 'RETRIEVE_TAGS';
export const retrieveTagsActions = createRequestActions(RETRIEVE_TAGS);

export const SET_FAVORITE_EVENT = 'SET_FAVORITE_EVENT';
export const setFavoriteEventActions = createRequestActions(SET_FAVORITE_EVENT);

export const RATE_EVENT = 'RATE_EVENT';
export const rateEventActions = createRequestActions(RATE_EVENT);

export const RETRIEVE_KIOSKS = 'RETRIEVE_KIOSKS';
export const retrieveKiosksActions = createRequestActions(RETRIEVE_KIOSKS);

export const RETRIEVE_ZONES = 'RETRIEVE_ZONES';
export const retrieveZonesActions = createRequestActions(RETRIEVE_ZONES);

export const RETRIEVE_VENUES = 'RETRIEVE_VENUES';
export const retrieveVenuesActions = createRequestActions(RETRIEVE_VENUES);

export const RETRIEVE_CURRENT_POSITION = 'RETRIEVE_CURRENT_POSITION';
export const retrieveCurrentPositionActions = createRequestActions(RETRIEVE_CURRENT_POSITION);

export const RETRIEVE_CATEGORIES = 'RETRIEVE_CATEGORIES';
export const retrieveCategoriesActions = createRequestActions(RETRIEVE_CATEGORIES);

export const SIGN_IN = 'SIGN_IN';
export const signInActions = createRequestActions(SIGN_IN);

export const GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN';
export const googleSignInActions = createRequestActions(GOOGLE_SIGN_IN);

export const SIGN_UP = 'SIGN_UP';
export const signUpActions = createRequestActions(SIGN_UP);
