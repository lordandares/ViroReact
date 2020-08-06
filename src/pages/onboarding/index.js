import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Onboarding } from './Onboarding';
import { onboardingHasBeenSeen } from '../../store/actions/app';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onboardingHasBeenSeen,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
