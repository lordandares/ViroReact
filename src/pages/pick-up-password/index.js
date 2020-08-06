import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PickUpPassword } from './PickUpPassword';
import { signUp } from '../../store/actions/asyncActionCreators';
import { resetSignUpFailure } from '../../store/actions/userActionCreators';

const mapStateToProps = state => ({
  signUpData: state.user.signUpData,
  isSigningUp: state.user.isSigningUp,
  locale: state.app.language,
  signUpFailedBecauseOfCredentials: state.user.signUpFailedBecauseOfCredentials,
  signUpFailedForUnknownError: state.user.signUpFailedForUnknownError,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUp,
      resetSignUpFailure,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickUpPassword);
