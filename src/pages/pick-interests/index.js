import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PickInterests from './PickInterests';
import { setHasSkippedTagSelection, saveUserTags } from '../../store/actions/userActionCreators';

function mapStateToProps(state) {
  return {
    tags: state.tag.tags,
    userTags: state.user.userTags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setHasSkippedTagSelection,
      saveUserTags,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickInterests);
