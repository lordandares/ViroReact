import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Favorites from './Favorites';
import { loadingEntitiesSelector } from '../../store/selectors/loadingSelector';
import {
  favoriteEventsSelector,
  favoriteLiveShowsEventsSelector,
  favoriteFestivalsEventsSelector,
  favoriteGamingEventsSelector,
  favoriteShowsAndPerformanceEventsSelector,
  favoriteEntertainmentActivitiesEventsSelector,
  favoriteExhibitionsAndBusinessEventsSelector,
  favoriteRestaurantsEventsSelector,
} from '../../store/selectors/eventSelectors';
import { setCurrentComponentId } from '../../store/actions/app';
import { setSelectedEventId } from '../../store/actions/eventActionCreators';

function mapStateToProps(state) {
  return {
    favoriteEvents: favoriteEventsSelector(state),
    loadingEntities: loadingEntitiesSelector(state),
    categories: state.category.categories,
    live: favoriteLiveShowsEventsSelector(state),
    festivals: favoriteFestivalsEventsSelector(state),
    gaming: favoriteGamingEventsSelector(state),
    showsAndPerformance: favoriteShowsAndPerformanceEventsSelector(state),
    entertainment: favoriteEntertainmentActivitiesEventsSelector(state),
    exhibitionsAndBusiness: favoriteExhibitionsAndBusinessEventsSelector(state),
    restaurants: favoriteRestaurantsEventsSelector(state),
    venues: state.venue.venues,
    currentComponentId: state.app.currentComponentId,
    accessToken: state.user.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCurrentComponentId,
      setSelectedEventId,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
