import { createSelector } from 'reselect';
import { isString } from 'lodash';
import {
  eventsWithComputedDataSelector,
  festivalsEventsSelector,
  gamingEventsSelector,
  liveShowsEventsSelector,
  showsAndPerformanceEventsSelector,
  entertainmentActivitiesEventsSelector,
  exhibitionsAndBusinessEventsSelector,
  restaurantsEventsSelector,
} from './eventSelectors';
import categories from '../../enum/CategoriesEnum';

export const ALL_CATEGORIES_ID = 'all';

export const searchResultsSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.search.searchQuery,
  state => state.search.searchCategory,
  liveShowsEventsSelector,
  festivalsEventsSelector,
  gamingEventsSelector,
  showsAndPerformanceEventsSelector,
  entertainmentActivitiesEventsSelector,
  exhibitionsAndBusinessEventsSelector,
  restaurantsEventsSelector,
  (
    events,
    searchQuery,
    searchCategory,
    liveShowsEvents,
    festivalsEvents,
    gamingEvents,
    showsAndPerformanceEvents,
    entertainmentActivitiesEvents,
    exhibitionsAndBusinessEvents,
    restaurantsEvents
  ) => {
    if (!searchQuery && !searchCategory) {
      return null;
    }

    if (searchCategory) {
      const showAllCategories = searchCategory.id === ALL_CATEGORIES_ID;
      return {
        [`${categories.LIVE_SHOWS.id}`]:
          searchCategory.id === categories.LIVE_SHOWS.id || showAllCategories
            ? liveShowsEvents
            : {},
        [`${categories.FESTIVALS.id}`]:
          searchCategory.id === categories.FESTIVALS.id || showAllCategories ? festivalsEvents : {},
        [`${categories.GAMING.id}`]:
          searchCategory.id === categories.GAMING.id || showAllCategories ? gamingEvents : {},
        [`${categories.SHOWS_AND_PERFORMANCE.id}`]:
          searchCategory.id === categories.SHOWS_AND_PERFORMANCE.id || showAllCategories
            ? showsAndPerformanceEvents
            : {},
        [`${categories.ENTERTAINMENT_ACTIVITIES.id}`]:
          searchCategory.id === categories.ENTERTAINMENT_ACTIVITIES.id || showAllCategories
            ? entertainmentActivitiesEvents
            : {},
        [`${categories.EXHIBITIONS_AND_BUSINESS.id}`]:
          searchCategory.id === categories.EXHIBITIONS_AND_BUSINESS.id || showAllCategories
            ? exhibitionsAndBusinessEvents
            : {},
        [`${categories.RESTAURANTS.id}`]:
          searchCategory.id === categories.RESTAURANTS.id || showAllCategories
            ? restaurantsEvents
            : {},
      };
    }

    return {
      [`${categories.LIVE_SHOWS.id}`]: liveShowsEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.FESTIVALS.id}`]: festivalsEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.GAMING.id}`]: gamingEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.SHOWS_AND_PERFORMANCE.id}`]: showsAndPerformanceEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.ENTERTAINMENT_ACTIVITIES.id}`]: entertainmentActivitiesEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.EXHIBITIONS_AND_BUSINESS.id}`]: exhibitionsAndBusinessEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
      [`${categories.RESTAURANTS.id}`]: restaurantsEvents.filter(event =>
        textSearchFilter(event, searchQuery)
      ),
    };
  }
);

const textSearchFilter = (event, searchQuery) => {
  const lowerCaseSearchQueryWords = searchQuery.toLowerCase().split(' ');
  const eventNameLowerCaseWords = event.name.toLowerCase().split(' ');

  const firstTest = !!lowerCaseSearchQueryWords.find(
    firstWord => !!eventNameLowerCaseWords.find(secondWord => secondWord.includes(firstWord))
  );
  if (firstTest) {
    return true;
  }

  let secondTest = false;
  if (isString(event.searchKeywords)) {
    const lowerCaseKeywords = event.searchKeywords.split(',');
    secondTest = !!lowerCaseSearchQueryWords.find(
      firstWord => !!lowerCaseKeywords.find(secondWord => secondWord.includes(firstWord))
    );
  }

  return secondTest;
};
