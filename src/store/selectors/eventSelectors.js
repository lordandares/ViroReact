import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { distanceInMilesBetweenEarthCoordinates } from '../../utils/locationUtils';
import categories from '../../enum/CategoriesEnum';

export const eventsWithComputedDataSelector = createSelector(
  state => state.event.events,
  state => state.event.eventsDynamicInfo,
  state => state.user.userDynamicInfo,
  state => state.location.currentPosition,
  state => state.venue.venues,
  (events, eventsDynamicInfo, userDynamicInfo, currentPosition, venues) => {
    if (events.size === 0 || venues.size === 0) {
      return Map({});
    }

    return events.map(event => {
      const venue = venues.get(event.venue);
      const venueLatitude = venue && venue.lat;
      const venueLongitude = venue && venue.lng;

      let newEvent = event;
      if (venueLatitude && venueLongitude && currentPosition) {
        newEvent = newEvent.setDistance(
          distanceInMilesBetweenEarthCoordinates(
            currentPosition.latitude,
            currentPosition.longitude,
            venueLatitude,
            venueLongitude
          )
        );
      } else {
        newEvent = newEvent.setDistance(null);
      }

      const eventDynamicInfo = eventsDynamicInfo.get(event.id);
      if (eventDynamicInfo) {
        newEvent = newEvent.setLikes(eventDynamicInfo.likes);
        newEvent = newEvent.setRate(eventDynamicInfo.rate);
      } else {
        newEvent = newEvent.setLikes(0);
        newEvent = newEvent.setRate(null);
      }

      const userEventDynamicInfo = userDynamicInfo.get(event.id);
      if (userEventDynamicInfo) {
        newEvent = newEvent.setIsFavorite(userEventDynamicInfo.isFavorite);
        newEvent = newEvent.setUserRate(userEventDynamicInfo.rate);
      } else {
        newEvent = newEvent.setIsFavorite(null);
        newEvent = newEvent.setUserRate(null);
      }

      return newEvent;
    });
  }
);

const likesRateNameComparator = (firstEvent, secondEvent) => {
  const likesDifference = secondEvent.likes - firstEvent.likes;
  if (likesDifference) {
    return likesDifference;
  }

  const rateDifference = secondEvent.rate - firstEvent.rate;
  if (rateDifference) {
    return rateDifference;
  }

  return secondEvent.name < firstEvent.name ? 1 : -1;
};

export const selectedEventSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.event.selectedEventId,
  (events, selectedEventId) => events.get(selectedEventId)
);

export const eventsByDistanceSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.location.currentPosition,
  (events, currentPosition) => {
    return currentPosition
      ? events
          .sort((firstEvent, secondEvent) => {
            const distanceDifference = firstEvent.distance - secondEvent.distance;
            if (distanceDifference !== 0) {
              return distanceDifference;
            }
            return likesRateNameComparator(firstEvent, secondEvent);
          })
          .slice(0, 10)
      : Map({});
  }
);

export const favoriteEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.user.userDynamicInfo,
  (events, userDynamicInfo) =>
    events.filter(event => {
      const userDynamicEventInfo = userDynamicInfo.get(event.id);
      return !!userDynamicEventInfo && !!userDynamicEventInfo.isFavorite;
    })
);

export const todayTopFestivitiesSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.app.currentDate,
  (events, currentDate) => {
    if (!currentDate) {
      return Map({});
    }

    return events
      .filter(event => event.times.findIndex(time => time.day === currentDate) > -1)
      .sort((firstEvent, secondEvent) => likesRateNameComparator(firstEvent, secondEvent))
      .slice(0, 10);
  }
);

const getEventsUnseenOrderedByMatches = (events, matchingTagsPerEvent) =>
  events
    .filter(event => !event.userRate && !event.isFavorite)
    .sort((firstEvent, secondEvent) => {
      const firstEventsMatch = matchingTagsPerEvent.get(firstEvent.id);
      const secondEventsMatch = matchingTagsPerEvent.get(secondEvent.id);
      if (firstEventsMatch !== secondEventsMatch) {
        return secondEventsMatch - firstEventsMatch;
      }
      return likesRateNameComparator(firstEvent, secondEvent);
    });

export const recommendedEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  state => state.user.userTags,
  (events, userTags) => {
    if (events.size === 0 || userTags.size === 0) {
      return Map({});
    }

    const matchingTagsPerEvent = events.map(event =>
      event.tags.reduce((acc, tag) => {
        return acc + (userTags.get(tag.id) ? 1 : 0);
      }, 0)
    );

    return getEventsUnseenOrderedByMatches(events, matchingTagsPerEvent).slice(0, 10);
  }
);

export const similarActivitiesSelector = createSelector(
  eventsWithComputedDataSelector,
  selectedEventSelector,
  (events, selectedEvent) => {
    if (events.size === 0 || !selectedEvent) {
      return Map({});
    }

    const matchingTagsPerEvent = events.map(event =>
      event.tags.reduce((acc, tag) => {
        return acc + (selectedEvent.tags.get(tag.id) ? 1 : 0);
      }, 0)
    );

    return getEventsUnseenOrderedByMatches(
      events.filter(event => event.id !== selectedEvent.id),
      matchingTagsPerEvent
    ).slice(0, 10);
  }
);

export const liveShowsEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.LIVE_SHOWS.id)
);

export const festivalsEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.FESTIVALS.id)
);

export const gamingEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.GAMING.id)
);

export const showsAndPerformanceEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.SHOWS_AND_PERFORMANCE.id)
);

export const entertainmentActivitiesEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.ENTERTAINMENT_ACTIVITIES.id)
);

export const exhibitionsAndBusinessEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.EXHIBITIONS_AND_BUSINESS.id)
);

export const restaurantsEventsSelector = createSelector(
  eventsWithComputedDataSelector,
  events => events.filter(event => event.category === categories.RESTAURANTS.id)
);

export const favoriteLiveShowsEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.LIVE_SHOWS.id)
);

export const favoriteFestivalsEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.FESTIVALS.id)
);

export const favoriteGamingEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.GAMING.id)
);

export const favoriteShowsAndPerformanceEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.SHOWS_AND_PERFORMANCE.id)
);

export const favoriteEntertainmentActivitiesEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.ENTERTAINMENT_ACTIVITIES.id)
);

export const favoriteExhibitionsAndBusinessEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.EXHIBITIONS_AND_BUSINESS.id)
);

export const favoriteRestaurantsEventsSelector = createSelector(
  favoriteEventsSelector,
  events => events.filter(event => event.category === categories.RESTAURANTS.id)
);
