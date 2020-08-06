import actionTypes from './types';

export const storeSignUpData = signUpData => ({
  type: actionTypes.STORE_SIGN_UP_DATA,
  signUpData,
});

export const resetSignInFailure = () => ({
  type: actionTypes.RESET_SIGN_IN_FAILURE,
});

export const resetSignUpFailure = () => ({
  type: actionTypes.RESET_SIGN_UP_FAILURE,
});

export const setHasSkippedTagSelection = () => ({
  type: actionTypes.HAS_SKIPPED_TAG_SELECTION,
});

export const saveUserTags = userTags => ({
  type: actionTypes.SAVE_USER_TAGS,
  userTags,
});

export const logUserOut = () => ({
  type: actionTypes.LOG_USER_OUT,
});
