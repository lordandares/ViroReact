import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Today } from './Today';
import {
  retrieveCategories,
  retrieveCurrentPosition,
  retrieveEventsAndUserDynamicInfo,
  retrieveKiosks,
  retrieveTags,
  retrieveVenues,
  retrieveZones,
} from '../../store/actions/asyncActionCreators';
import {
  eventsByDistanceSelector,
  eventsWithComputedDataSelector,
  favoriteEventsSelector,
  recommendedEventsSelector,
  todayTopFestivitiesSelector,
} from '../../store/selectors/eventSelectors';
import { updateCurrentDate, changeLanguage, setCurrentComponentId } from '../../store/actions/app';
import { loadingEntitiesSelector } from '../../store/selectors/loadingSelector';
import { setSelectedEventId } from '../../store/actions/eventActionCreators';

const mapStateToProps = state => ({
  events: eventsWithComputedDataSelector(state),
  eventsByDistance: eventsByDistanceSelector(state),
  favoriteEvents: favoriteEventsSelector(state),
  loadingEntities: loadingEntitiesSelector(state),
  todayTopFestivities: todayTopFestivitiesSelector(state),
  recommendedEvents: recommendedEventsSelector(state),
  language: state.app.language,
  token: state.user.accessToken,
  tags: state.tag.tags,
  userTags: state.user.userTags,
  hasSkippedTagSelection: state.user.hasSkippedTagSelection,
  retrieveEventsAndUserDynamicInfoFailed: state.event.retrieveEventsAndUserDynamicInfoFailed,
  venues: state.venue.venues,
  currentComponentId: state.app.currentComponentId,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      retrieveTags,
      retrieveKiosks,
      retrieveZones,
      retrieveVenues,
      retrieveCurrentPosition,
      retrieveCategories,
      updateCurrentDate,
      changeLanguage,
      retrieveEventsAndUserDynamicInfo,
      setSelectedEventId,
      setCurrentComponentId,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today);
