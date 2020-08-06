import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Festivities } from './Festivities';
import { loadingEntitiesSelector } from '../../store/selectors/loadingSelector';
import {
  festivalsEventsSelector,
  gamingEventsSelector,
  liveShowsEventsSelector,
  showsAndPerformanceEventsSelector,
  entertainmentActivitiesEventsSelector,
  exhibitionsAndBusinessEventsSelector,
  restaurantsEventsSelector,
} from '../../store/selectors/eventSelectors';
import { setCurrentComponentId } from '../../store/actions/app';
import { setSelectedEventId } from '../../store/actions/eventActionCreators';

const mapStateToProps = state => ({
  loadingEntities: loadingEntitiesSelector(state),
  live: liveShowsEventsSelector(state),
  festivals: festivalsEventsSelector(state),
  gaming: gamingEventsSelector(state),
  showsAndPerformance: showsAndPerformanceEventsSelector(state),
  entertainment: entertainmentActivitiesEventsSelector(state),
  exhibitionsAndBusiness: exhibitionsAndBusinessEventsSelector(state),
  restaurants: restaurantsEventsSelector(state),
  venues: state.venue.venues,
  currentComponentId: state.app.currentComponentId,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentComponentId,
      setSelectedEventId,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Festivities);
