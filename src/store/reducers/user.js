import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  RETRIEVE_USER_DYNAMIC_INFO,
  SIGN_IN,
  SIGN_UP,
  GOOGLE_SIGN_IN,
} from '../actions/asyncActions';
import { FAILURE, REQUEST, SUCCESS } from '../actions/actionUtils';
import userActionTypes from '../actions/types';
import { createEntityMap } from '../../utils/entityUtils';
import UserDynamicInfoModel from '../models/UserDynamicInfoModel';

const SIGN_IN_FAILURE_MESSAGES = ['Username could not be found.', 'Invalid credentials.'];
const SIGN_UP_FAILURE_CODES = ['error.saudi_exist'];

const initialState = {
  isSigningIn: false,
  signInFailedBecauseOfCredentials: false,
  signInFailedForUnknownError: false,
  signUpData: null,
  isSigningUp: false,
  signUpFailedBecauseOfCredentials: false,
  signUpFailedForUnknownError: false,

  loadingUserDynamicInfo: false,
  userDynamicInfo: Map({}),
  retrieveUserDynamicInfoFailed: false,
  userTags: Map({}),
  hasSkippedTagSelection: false,

  accessToken: null,
  email: null,
  firstName: null,
  lastName: null,
  locale: null,
};

export default handleActions(
  {
    [`${SIGN_IN}_${REQUEST}`]: state => ({
      ...state,
      isSigningIn: true,
    }),
    [`${SIGN_IN}_${SUCCESS}`]: (state, action) => ({
      ...state,
      isSigningIn: false,
      accessToken: action.data.accessToken,
      signInFailedBecauseOfCredentials: false,
      signInFailedForUnknownError: false,

      email: action.data.user.email,
      firstName: action.data.user.firstName,
      lastName: action.data.user.lastName,
      locale: action.data.user.locale,
    }),
    [`${SIGN_IN}_${FAILURE}`]: (state, action) => {
      return {
        ...state,
        isSigningIn: false,
        signInFailedBecauseOfCredentials: !!(
          action.data && SIGN_IN_FAILURE_MESSAGES.includes(action.data.message)
        ),
        signInFailedForUnknownError: !(
          action.data && SIGN_IN_FAILURE_MESSAGES.includes(action.data.message)
        ),
      };
    },

    [`${GOOGLE_SIGN_IN}_${REQUEST}`]: state => ({
      ...state,
      isSigningIn: true,
    }),
    [`${GOOGLE_SIGN_IN}_${SUCCESS}`]: (state, action) => ({
      ...state,
      isSigningIn: false,
      accessToken: action.data.accessToken,
      signInFailedBecauseOfCredentials: false,
      signInFailedForUnknownError: false,

      email: action.data.user.email,
      firstName: action.data.user.firstName,
      lastName: action.data.user.lastName,
      locale: action.data.user.locale,
    }),
    [`${GOOGLE_SIGN_IN}_${FAILURE}`]: (state, action) => {
      return {
        ...state,
        isSigningIn: false,
        signInFailedBecauseOfCredentials: !!(
          action.data && SIGN_IN_FAILURE_MESSAGES.includes(action.data.message)
        ),
        signInFailedForUnknownError: !(
          action.data && SIGN_IN_FAILURE_MESSAGES.includes(action.data.message)
        ),
      };
    },

    [`${SIGN_UP}_${REQUEST}`]: state => ({
      ...state,
      isSigningUp: true,
    }),
    [`${SIGN_UP}_${SUCCESS}`]: (state, action) => ({
      ...state,
      isSigningUp: false,
      accessToken: action.data.accessToken,

      email: action.data.user.email,
      firstName: action.data.user.firstName,
      lastName: action.data.user.lastName,
      locale: action.data.user.locale,
    }),
    [`${SIGN_UP}_${FAILURE}`]: (state, action) => ({
      ...state,
      isSigningUp: false,
      signUpFailedBecauseOfCredentials: !!(
        action.error && SIGN_UP_FAILURE_CODES.includes(action.error.code)
      ),
      signUpFailedForUnknownError: !(
        action.error && SIGN_UP_FAILURE_CODES.includes(action.error.code)
      ),
    }),

    [userActionTypes.STORE_SIGN_UP_DATA]: (state, action) => ({
      ...state,
      signUpData: action.signUpData,
    }),

    [userActionTypes.RESET_SIGN_IN_FAILURE]: state => ({
      ...state,
      signInFailedBecauseOfCredentials: false,
      signInFailedForUnknownError: false,
    }),

    [userActionTypes.RESET_SIGN_UP_FAILURE]: state => ({
      ...state,
      signUpFailedBecauseOfCredentials: false,
      signUpFailedForUnknownError: false,
    }),

    [userActionTypes.HAS_SKIPPED_TAG_SELECTION]: state => ({
      ...state,
      hasSkippedTagSelection: true,
    }),

    [userActionTypes.SAVE_USER_TAGS]: (state, action) => ({
      ...state,
      userTags: Map(action.userTags),
    }),

    [userActionTypes.LOG_USER_OUT]: state => ({
      ...state,

      accessToken: null,
      email: null,
      firstName: null,
      lastName: null,
      locale: null,

      userDynamicInfo: Map({}),
      userTags: Map({}),
      hasSkippedTagSelection: false,
    }),

    [`${RETRIEVE_USER_DYNAMIC_INFO}_${REQUEST}`]: state => ({
      ...state,
      loadingUserDynamicInfo: true,
      retrieveUserDynamicInfoFailed: false,
    }),
    [`${RETRIEVE_USER_DYNAMIC_INFO}_${SUCCESS}`]: (state, action) => ({
      ...state,
      userDynamicInfo: createEntityMap(action.data, UserDynamicInfoModel),
      loadingUserDynamicInfo: false,
    }),
    [`${RETRIEVE_USER_DYNAMIC_INFO}_${FAILURE}`]: state => ({
      ...state,
      loadingUserDynamicInfo: false,
      retrieveUserDynamicInfoFailed: true,
    }),
  },
  initialState
);
