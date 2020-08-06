import { connect } from 'react-redux';
import AboutSaudi from './AboutSaudi';
import { changeLanguage } from '../../store/actions/app';

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: lang => dispatch(changeLanguage(lang)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutSaudi);
