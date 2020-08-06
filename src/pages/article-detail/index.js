import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ArticleDetail } from './ArticleDetail';
import {
  rateEventAndRetrieveDynamicInfo,
  setFavoriteEventAndRetrieveDynamicInfo,
} from '../../store/actions/asyncActionCreators';
import {
  selectedEventSelector,
  similarActivitiesSelector,
} from '../../store/selectors/eventSelectors';
import {
  resetFavoringAndUpdateFailure,
  resetRatingAndUpdateFailure,
} from '../../store/actions/eventActionCreators';
import { setCurrentComponentId } from '../../store/actions/app';

const mapStateToProps = state => ({
  categories: state.category.categories,
  venues: state.venue.venues,
  ratingAndUpdateInProgress: state.event.ratingAndUpdateInProgress,
  settingFavoriteAndUpdateInProgress: state.event.settingFavoriteAndUpdateInProgress,
  locale: state.app.language,
  event: selectedEventSelector(state),
  token: state.user.accessToken,
  settingFavoriteAndUpdateFailed: state.event.settingFavoriteAndUpdateFailed,
  ratingAndUpdateFailed: state.event.ratingAndUpdateFailed,
  currentComponentId: state.app.currentComponentId,
  similarActivities: similarActivitiesSelector(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      rateEventAndRetrieveDynamicInfo,
      setFavoriteEventAndRetrieveDynamicInfo,
      resetFavoringAndUpdateFailure,
      resetRatingAndUpdateFailure,
      setCurrentComponentId,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail);
