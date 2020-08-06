import React, { PureComponent } from 'react';
import { Image, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'; //  GoogleSigninButton to ad when google sign in button is enabled
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { main, text, background } from './style';
import Images from '../../theme/images';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import GeneralButton from '../../components/general-button/';
import colors from '../../theme/colors';
import { mainMenuNavigation } from '../../navigation/navigator';
import Pages from '../../enum/Pages';
import FormTextInput from '../../components/form-text-input/';
import config from './config';
import Parallelogram from '../../components/parallelogram';
import { metrics, layoutStyles } from '../../theme/styleguide';
import ErrorModal from '../../components/error-modal/';
import { CloseButton } from '../../components/close-button/CloseButton';

GoogleSignin.configure(config);

const getValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email(translate(TranslationEnum.INVALID_EMAIL))
      .required(translate(TranslationEnum.EMAIL_REQUIRED)),
    password: yup.string().required(translate(TranslationEnum.PASSWORD_REQUIRED)),
  });

export class SignIn extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  static propTypes = {
    isSigningIn: PropTypes.bool,
    accessToken: PropTypes.any,
    signIn: PropTypes.func.isRequired,
    googleSignIn: PropTypes.func.isRequired,
    resetSignInFailure: PropTypes.func.isRequired,
    signInFailedBecauseOfCredentials: PropTypes.bool.isRequired,
    signInFailedForUnknownError: PropTypes.bool.isRequired,
    initialFlow: PropTypes.bool,
    componentId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  };

  static defaultProps = {
    isSigningIn: false,
    accessToken: null,
    initialFlow: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      googleErrorData: {},
      googleError: false,
    };
  }

  signUserIn = ({ email, password }) =>
    this.props.signIn({ email, password }).then(response => {
      if (response && response.data && response.data.accessToken) {
        if (this.props.initialFlow) {
          return mainMenuNavigation();
        }
        return Navigation.dismissAllModals();
      }
    });

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        this.props
          .googleSignIn({ google_token: userInfo.idToken, locale: this.props.language })
          .then(response => {
            if (response.data.accessToken) {
              return mainMenuNavigation();
            }
          });
      }
    } catch (error) {
      this.setState({
        googleErrorData: error,
        googleError: true,
      });
    }
  };

  showSignUpPage = () =>
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Pages.SIGN_UP,
            },
            passProps: {
              initialFlow: this.props.initialFlow,
            },
          },
        ],
      },
    });

  showForgotPasswordPage = () =>
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Pages.FORGOT_PASSWORD,
            },
          },
        ],
      },
    });

  handleEnterAsGuest = () => {
    const { isSigningIn } = this.props;
    if (!isSigningIn) {
      return mainMenuNavigation();
    }
  };

  _closeErrorModal = () => {
    const { resetSignInFailure } = this.props;
    this.setState({
      googleError: false,
    });
    resetSignInFailure();
  };

  _showForgotPasswordModal = () => {
    const { isSigningIn } = this.props;
    if (!isSigningIn) {
      return this.showForgotPasswordPage();
    }
  };

  render() {
    const {
      isSigningIn,
      signInFailedBecauseOfCredentials,
      signInFailedForUnknownError,
      initialFlow,
      componentId,
    } = this.props;
    return (
      <View style={main.container}>
        <Parallelogram
          color={colors.FANTASY}
          width={metrics.deviceWidth * 0.5}
          borderHeight={metrics.deviceHeight * 0.15}
          style={background.topShape}
        />
        <Parallelogram
          color={colors.TASTE}
          height={metrics.deviceHeight * 0.2}
          style={background.bottomShape}
        />

        <KeyboardAwareScrollView
          style={layoutStyles.container}
          contentContainerStyle={main.contentContainer}
        >
          {initialFlow ? (
            <Text onPress={this.handleEnterAsGuest} style={text.guest}>
              {translate(TranslationEnum.ENTER_AS_GUEST)} >
            </Text>
          ) : (
            <View style={main.closeButton}>
              <CloseButton onPress={() => Navigation.dismissModal(componentId)} />
            </View>
          )}

          <Image style={main.logo} source={Images.LOGO} />

          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={getValidationSchema()}
            initialValues={{ email: '', password: '' }}
            onSubmit={({ email, password }) => this.signUserIn({ email, password })}
            render={({ handleSubmit, handleChange, values, errors }) => (
              <View style={main.form}>
                <FormTextInput
                  autoCapitalize="none"
                  error={errors.email}
                  handleChange={handleChange('email')}
                  placeholder={translate(TranslationEnum.EMAIL_PLACEHOLDER)}
                  value={values.email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  editable={!isSigningIn}
                />

                <FormTextInput
                  autoCapitalize="none"
                  error={errors.password}
                  handleChange={handleChange('password')}
                  placeholder={translate(TranslationEnum.PASSWORD_PLACEHOLDER)}
                  value={values.password}
                  secureTextEntry
                  textContentType="password"
                  autoCompleteType="password"
                  editable={!isSigningIn}
                />

                <GeneralButton
                  onPress={handleSubmit}
                  style={main.button}
                  text={translate(TranslationEnum.DISCOVER)}
                  disabled={isSigningIn}
                  loading={isSigningIn}
                  activityIndicatorColor={colors.FANTASY_DARK}
                />
              </View>
            )}
          />

          {/* <Text onPress={this._showForgotPasswordModal} style={text.forgotPassword}>
            {translate(TranslationEnum.FORGOT_PASSWORD)}
          </Text>  */}
          <GoogleSigninButton
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 300, height: 50, borderRadius: 35 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this.googleSignIn}
            disabled={isSigningIn}
          />
          <View style={main.footerRow}>
            <View style={[layoutStyles.container, layoutStyles.alignStart]}>
              <Text style={text.dontHaveAccount}>
                {translate(TranslationEnum.DONT_HAVE_ACCOUNT)}
              </Text>
            </View>
            <Text
              onPress={() => {
                if (!isSigningIn) {
                  return this.showSignUpPage();
                }
              }}
              style={text.signUp}
            >
              {translate(TranslationEnum.SIGN_UP)} >
            </Text>
          </View>
        </KeyboardAwareScrollView>

        <ErrorModal
          isVisible={
            signInFailedBecauseOfCredentials ||
            signInFailedForUnknownError ||
            this.state.googleError
          }
          title={
            (signInFailedBecauseOfCredentials && translate(TranslationEnum.ACCOUNT_ERROR)) ||
            (signInFailedForUnknownError && translate(TranslationEnum.ERROR))
          }
          body={
            (signInFailedBecauseOfCredentials &&
              translate(TranslationEnum.SIGN_IN_ERROR_BECAUSE_OF_CREDENTIALS)) ||
            (signInFailedForUnknownError &&
              translate(TranslationEnum.UNEXPECTED_ERROR_OCCURRED_TRY_AGAIN)) ||
            (this.state.googleError &&
              `${translate(TranslationEnum.UNEXPECTED_ERROR_OCCURRED_TRY_AGAIN)} (${
                this.state.googleErrorData
              })`)
          }
          closeHandler={this._closeErrorModal}
        />
      </View>
    );
  }
}
