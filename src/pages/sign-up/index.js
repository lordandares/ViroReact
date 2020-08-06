import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SignUp } from './SignUp';
import { storeSignUpData } from '../../store/actions/userActionCreators';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      storeSignUpData,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
