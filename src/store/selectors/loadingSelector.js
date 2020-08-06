import { createSelector } from 'reselect';

export const loadingEntitiesSelector = createSelector(
  state => state.event.loadingEventsAndUserDynamicInfo,
  state => state.category.loadingCategories,
  state => state.event.loadingEvents,
  state => state.event.loadingEventsDynamicInfo,
  state => state.user.loadingUserDynamicInfo,
  state => state.kiosk.loadingKiosks,
  state => state.tag.loadingTags,
  state => state.zone.loadingZones,
  state => state.venue.loadingVenues,
  (
    loadingEventsAndUserDynamicInfo,
    loadingCategories,
    loadingEvents,
    loadingEventsDynamicInfo,
    loadingUserDynamicInfo,
    loadingKiosks,
    loadingTags,
    loadingZones,
    loadingVenues
  ) =>
    loadingEventsAndUserDynamicInfo ||
    loadingCategories ||
    loadingEvents ||
    loadingEventsDynamicInfo ||
    loadingUserDynamicInfo ||
    loadingKiosks ||
    loadingTags ||
    loadingZones ||
    loadingVenues
);
