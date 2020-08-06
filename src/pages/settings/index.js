import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from './Settings';
import { changeLanguage, setCurrentComponentId } from '../../store/actions/app';
import { retrieveEventsAndUserDynamicInfo } from '../../store/actions/asyncActionCreators';
import { logUserOut } from '../../store/actions/userActionCreators';

const mapStateToProps = state => ({
  language: state.app.language,
  user: {
    accessToken: state.user.accessToken,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
  },
  loadingEventsAndUserDynamicInfo: state.event.loadingEventsAndUserDynamicInfo,
  currentComponentId: state.app.currentComponentId,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeLanguage,
      retrieveEventsAndUserDynamicInfo,
      logUserOut,
      setCurrentComponentId,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
