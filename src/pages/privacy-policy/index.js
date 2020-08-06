import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrivacyPolicy from './PrivacyPolicy';
import { setCurrentComponentId } from '../../store/actions/app';

function mapStateToProps(state) {
  return {
    language: state.app.language,
    currentComponentId: state.app.currentComponentId,
  };
}

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
)(PrivacyPolicy);
