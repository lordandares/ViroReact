import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapFestivities } from './MapFestivities';
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
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCurrentComponentId,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapFestivities);
