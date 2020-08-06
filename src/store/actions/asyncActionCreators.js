import moment from 'moment';
import { isString } from 'lodash';
import {
  rateEventActions,
  retrieveEventsActions,
  retrieveKiosksActions,
  retrieveTagsActions,
  retrieveZonesActions,
  setFavoriteEventActions,
  retrieveCurrentPositionActions,
  retrieveCategoriesActions,
  signInActions,
  signUpActions,
  retrieveVenuesActions,
  retrieveEventsDynamicInfoActions,
  retrieveUsersDynamicInfoActions,
  retrieveEventsAndUsersDynamicInfoActions,
  rateEventAndRetrieveDynamicInfoActions,
  setFavoriteEventAndRetrieveDynamicInfoActions,
  googleSignInActions,
  RETRIEVE_EVENTS,
  RETRIEVE_EVENTS_DYNAMIC_INFO,
  RETRIEVE_USER_DYNAMIC_INFO,
  RATE_EVENT,
  SET_FAVORITE_EVENT,
} from './asyncActions';
import { getEntity, postEntity, SUCCESS } from './actionUtils';
import {
  eventsEndpoint,
  rateEventEndpoint,
  retrieveCategoriesEndpoint,
  signUpEndpoint,
  signInEndpoint,
  googleSignInEndpoint,
  retrieveKiosksEndpoint,
  retrieveZonesEndpoint,
  setFavoriteEventEndpoint,
  tagsEndpoint,
  retrieveVenuesEndpoint,
  eventsDynamicEndpoint,
  userDynamicEndpoint,
} from '../../services/config';
import { getCurrentPosition } from '../../utils/locationUtils';

export const retrieveEvents = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveEventsActions,
      endpoint: eventsEndpoint,
      params: { locale, timestamp: moment().valueOf() },
    })
  );

export const retrieveEventsDynamicInfo = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveEventsDynamicInfoActions,
      endpoint: eventsDynamicEndpoint,
      params: { locale, timestamp: moment().valueOf() },
    })
  );

export const retrieveUserDynamicInfo = ({ token, locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveUsersDynamicInfoActions,
      endpoint: userDynamicEndpoint,
      params: { locale, timestamp: moment().valueOf() },
      headers: !!token && { token },
    })
  );

const retrieveDynamicInfo = (token, locale, dispatch, actions) => {
  return dispatch(retrieveEventsDynamicInfo({ locale })).then(eventsDynamicInfoResponse => {
    if (eventsDynamicInfoResponse.type === `${RETRIEVE_EVENTS_DYNAMIC_INFO}_${SUCCESS}`) {
      if (isString(token) && token.length > 0) {
        return dispatch(retrieveUserDynamicInfo({ token, locale })).then(
          userDynamicInfoResponse => {
            if (userDynamicInfoResponse.type === `${RETRIEVE_USER_DYNAMIC_INFO}_${SUCCESS}`) {
              return dispatch(actions.success());
            }
            return dispatch(actions.failure());
          }
        );
      }
      return dispatch(actions.success());
    }
    return dispatch(actions.failure());
  });
};

export const retrieveEventsAndUserDynamicInfo = ({ token, locale }) => dispatch => {
  dispatch(retrieveEventsAndUsersDynamicInfoActions.request());
  return dispatch(retrieveEvents({ locale })).then(eventsResponse => {
    if (eventsResponse.type === `${RETRIEVE_EVENTS}_${SUCCESS}`) {
      return retrieveDynamicInfo(token, locale, dispatch, retrieveEventsAndUsersDynamicInfoActions);
    }
    return dispatch(retrieveEventsAndUsersDynamicInfoActions.failure());
  });
};

export const rateEventAndRetrieveDynamicInfo = ({ eventId, rate, token, locale }) => dispatch => {
  dispatch(rateEventAndRetrieveDynamicInfoActions.request());
  return dispatch(rateEvent({ eventId, rate, token, locale })).then(eventsResponse => {
    if (eventsResponse.type === `${RATE_EVENT}_${SUCCESS}`) {
      return retrieveDynamicInfo(token, locale, dispatch, rateEventAndRetrieveDynamicInfoActions);
    }
    return dispatch(rateEventAndRetrieveDynamicInfoActions.failure());
  });
};

export const setFavoriteEventAndRetrieveDynamicInfo = ({
  eventId,
  status,
  token,
  locale,
}) => dispatch => {
  dispatch(setFavoriteEventAndRetrieveDynamicInfoActions.request());
  return dispatch(setFavoriteEvent({ eventId, status, token, locale })).then(eventsResponse => {
    if (eventsResponse.type === `${SET_FAVORITE_EVENT}_${SUCCESS}`) {
      return retrieveDynamicInfo(
        token,
        locale,
        dispatch,
        setFavoriteEventAndRetrieveDynamicInfoActions
      );
    }
    return dispatch(setFavoriteEventAndRetrieveDynamicInfoActions.failure());
  });
};

export const retrieveTags = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveTagsActions,
      endpoint: tagsEndpoint,
      params: { locale },
    })
  );

const setFavoriteEvent = ({ eventId, status, token }) => dispatch =>
  dispatch(
    postEntity({
      requestActions: setFavoriteEventActions,
      endpoint: setFavoriteEventEndpoint,
      body: { eventId: parseInt(eventId, 10), status },
      headers: !!token && { token },
    })
  );

const rateEvent = ({ eventId, rate, token }) => dispatch =>
  dispatch(
    postEntity({
      requestActions: rateEventActions,
      endpoint: rateEventEndpoint,
      body: { eventId: parseInt(eventId, 10), rate },
      headers: !!token && { token },
    })
  );

export const retrieveKiosks = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveKiosksActions,
      endpoint: retrieveKiosksEndpoint,
      params: { locale },
    })
  );

export const retrieveZones = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveZonesActions,
      endpoint: retrieveZonesEndpoint,
      params: { locale },
    })
  );

export const retrieveVenues = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveVenuesActions,
      endpoint: retrieveVenuesEndpoint,
      params: { locale },
    })
  );

export const retrieveCurrentPosition = () => dispatch => {
  dispatch(retrieveCurrentPositionActions.request());
  getCurrentPosition().then(
    position => dispatch(retrieveCurrentPositionActions.success(position)),
    err => dispatch(retrieveCurrentPositionActions.failure(err))
  );
};

export const retrieveCategories = ({ locale }) => dispatch =>
  dispatch(
    getEntity({
      requestActions: retrieveCategoriesActions,
      endpoint: retrieveCategoriesEndpoint,
      params: { locale },
    })
  );

export const signIn = ({ email, password }) => dispatch =>
  dispatch(
    postEntity({
      requestActions: signInActions,
      endpoint: signInEndpoint,
      body: { email, password },
    })
  );

// eslint-disable-next-line camelcase
export const googleSignIn = ({ google_token, locale }) => dispatch =>
  dispatch(
    postEntity({
      requestActions: googleSignInActions,
      endpoint: googleSignInEndpoint,
      body: { google_token, locale },
    })
  );

export const signUp = ({
  email,
  password,
  firstName,
  lastName,
  gender,
  ageRange,
  locale,
}) => dispatch =>
  dispatch(
    postEntity({
      requestActions: signUpActions,
      endpoint: signUpEndpoint,
      body: {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        gender,
        age: ageRange,
        locale,
      },
    })
  );
