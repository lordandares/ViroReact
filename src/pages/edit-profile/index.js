import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
// import { changeLanguage } from '../../store/actions/app';

function mapStateToProps(state) {
  return {
    language: state.app.language,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // changeLanguage,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
