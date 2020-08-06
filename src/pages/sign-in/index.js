import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SignIn } from './SignIn';
import { signIn, googleSignIn } from '../../store/actions/asyncActionCreators';
import { resetSignInFailure } from '../../store/actions/userActionCreators';

const mapStateToProps = state => ({
  isSigningIn: state.user.isSigningIn,
  accessToken: state.user.accessToken,
  signInFailedBecauseOfCredentials: state.user.signInFailedBecauseOfCredentials,
  signInFailedForUnknownError: state.user.signInFailedForUnknownError,
  language: state.app.language,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signIn,
      resetSignInFailure,
      googleSignIn,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
