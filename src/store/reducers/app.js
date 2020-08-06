import moment from 'moment';
import actionTypes from '../actions/types';
import { changeLocale } from '../../utils/Translator';

const initialState = {
  language: '',
  isFirstStart: true,
  currentDate: null,
  currentComponentId: '',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE: {
      const language = action.payload;
      changeLocale(language);
      return {
        ...state,
        language,
      };
    }

    case actionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };

    case actionTypes.UPDATE_CURRENT_DATE:
      return { ...state, currentDate: moment().isoWeekday() % 7 };

    case actionTypes.ONBOARDING_HAS_BEEN_SEEN:
      return { ...state, isFirstStart: false };

    case actionTypes.SET_CURRENT_COMPONENT_ID:
      return { ...state, currentComponentId: action.currentComponentId };

    default:
      return state;
  }
};

export default appReducer;
