import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TurnNotifications } from './TurnNotifications';
import { onboardingHasBeenSeen } from '../../../store/actions/app';

const mapStateToProps = state => ({
  language: state.app.language,
});

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
)(TurnNotifications);
