import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Search } from './Search';
import { setSearchCategory, setSearchQuery } from '../../store/actions/searchActionCreators';
import { searchResultsSelector } from '../../store/selectors/searchSelectors';
import { loadingEntitiesSelector } from '../../store/selectors/loadingSelector';
import { setCurrentComponentId } from '../../store/actions/app';

const mapStateToProps = state => ({
  searchResults: searchResultsSelector(state),
  categories: state.category.categories,
  loadingEntities: loadingEntitiesSelector(state),
  searchQuery: state.search.searchQuery,
  currentComponentId: state.app.currentComponentId,
  language: state.app.language,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSearchQuery,
      setSearchCategory,
      setCurrentComponentId,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
