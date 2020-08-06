import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { main, background } from './style';
import { metrics } from '../../theme/styleguide';
import Images from '../../theme/images';
import Parallelogram from '../../components/parallelogram';
import BackButton from '../../components/back-button';
import AnimatedGeneralButton from '../../components/animated-general-button';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import { colors } from '../../theme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const getEmailSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email(translate(TranslationEnum.INVALID_EMAIL))
      .required(translate(TranslationEnum.EMAIL_REQUIRED)),
  });

const getCodePasswordSchema = () =>
  yup.object().shape({
    code: yup
      .string()
      .max(6)
      .required(),
    password: yup
      .string()
      .min(7, translate(TranslationEnum.MUST_CONTAIN_PASSWORD))
      .required(translate(TranslationEnum.MUST_CONTAIN_PASSWORD)),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], translate(TranslationEnum.INVALID_REPEAT_PASSWORD))
      .required(translate(TranslationEnum.REPEAT_PASSWORD_REQUIRED)),
  });

export default class ForgotPassword extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }
  static propTypes = {
    componentId: PropTypes.string.isRequired,
  };
  static defaultProps = {};
  static displayName = 'ForgotPassword';

  constructor(props) {
    super(props);
    this.state = {
      isInEmailStep: true,
      isLoadingEmail: false,
      isLoadingPassword: false,
      passwordSuccess: false,
    };
  }

  onBackPressed = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  };

  // eslint-disable-next-line
  handleSubmitEmail = email => {
    // TODO: handle request to send email address to service
    // When the request succeeds, call:
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.setState({ isLoadingEmail: false, isInEmailStep: false });

    // MOCKED ASYNC STUFF - DELETE WHEN REQUEST IS IMPLEMENTED
    this.setState({ isLoadingEmail: true });
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ isLoadingEmail: false, isInEmailStep: false });
    }, 3500);
  };

  // eslint-disable-next-line
  handleSubmitPassword = ({ code, password, confirmPassword }) => {
    // TODO: handle request to send new passwords and code
    // When the request succeeds, call:
    // this.setState({ isLoadingPassword: false, passwordSuccess: true });

    // MOCKED ASYNC STUFF - DELETE WHEN REQUEST IS IMPLEMENTED
    this.setState({ isLoadingPassword: true });
    setTimeout(() => {
      this.setState({ isLoadingPassword: false, passwordSuccess: true });
    }, 3500);
  };

  handleSubmit = values => {
    const { isInEmailStep, passwordSuccess } = this.state;
    if (passwordSuccess) return;
    if (isInEmailStep) {
      this.handleSubmitEmail(values.email);
      return;
    }
    this.handleSubmitPassword(values);
  };

  renderFormContent = formikProps => {
    const { isInEmailStep } = this.state;
    if (isInEmailStep) {
      return <EmailForm {...formikProps} />;
    }
    return <PasswordForm {...formikProps} />;
  };

  render() {
    const { isInEmailStep, isLoadingEmail, isLoadingPassword, passwordSuccess } = this.state;
    return (
      <View style={main.container}>
        <Parallelogram
          color={colors.FANTASY_DARK}
          width={metrics.deviceWidth * 0.5}
          borderHeight={metrics.deviceHeight * 0.15}
          style={background.topShape}
        />
        <Parallelogram
          color={colors.INSPIRE}
          height={metrics.deviceHeight * 0.07}
          style={background.bottomShape}
        />
        <BackButton onPress={this.onBackPressed} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={main.contentContainer}
        >
          <Image style={[main.logo, !isInEmailStep && main.lowerLogo]} source={Images.LOGO} />
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={isInEmailStep ? getEmailSchema() : getCodePasswordSchema()}
            initialValues={{
              email: '',
              code: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => {
              this.handleSubmit(values);
            }}
            render={formikProps => (
              <View style={main.formContainer}>
                {this.renderFormContent(formikProps)}
                <AnimatedGeneralButton
                  onPress={formikProps.handleSubmit}
                  textStyle={main.buttonText}
                  text={isInEmailStep ? 'Reset Password' : 'Save'}
                  loading={isInEmailStep ? isLoadingEmail : isLoadingPassword}
                  success={!isInEmailStep && passwordSuccess}
                />
              </View>
            )}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
