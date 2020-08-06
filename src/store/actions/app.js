import actionTypes from './types';

export const changeLanguage = lang => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    payload: lang,
  };
};

export const setLanguage = language => ({ type: actionTypes.SET_LANGUAGE, payload: language });

export const updateCurrentDate = currentDate => ({
  type: actionTypes.UPDATE_CURRENT_DATE,
  currentDate,
});

export const onboardingHasBeenSeen = () => ({
  type: actionTypes.ONBOARDING_HAS_BEEN_SEEN,
});

export const setCurrentComponentId = currentComponentId => ({
  type: actionTypes.SET_CURRENT_COMPONENT_ID,
  currentComponentId,
});
