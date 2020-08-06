import eventActionTypes from './eventActionTypes';

export const setSelectedEventId = id => ({
  type: eventActionTypes.SET_SELECTED_EVENT_ID,
  id,
});

export const resetFavoringAndUpdateFailure = () => ({
  type: eventActionTypes.RESET_FAVORING_AND_UPDATE_FAILURE,
});

export const resetRatingAndUpdateFailure = () => ({
  type: eventActionTypes.RESET_RATING_AND_UPDATE_FAILURE,
});
