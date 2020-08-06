import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoriesResults } from './CategoriesResults';
import { searchResultsSelector } from '../../store/selectors/searchSelectors';
import { setCurrentComponentId } from '../../store/actions/app';
import { setSelectedEventId } from '../../store/actions/eventActionCreators';

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  searchResults: searchResultsSelector(state),
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
)(CategoriesResults);
