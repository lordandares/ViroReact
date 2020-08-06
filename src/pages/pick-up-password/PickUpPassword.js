import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { main } from './style';
import Images from '../../theme/images';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import GeneralButton from '../../components/general-button/';
import colors from '../../theme/colors';
import FormTextInput from '../../components/form-text-input/';
import { BackButton } from '../../components/back-button/BackButton';
import { mainMenuNavigation } from '../../navigation/navigator';
import ErrorModal from '../../components/error-modal/';
import Parallelogram from '../../components/parallelogram';
import { metrics, layoutStyles } from '../../theme/styleguide';
import { background } from '../sign-up/style';

const getValidationSchema = () =>
  yup.object().shape({
    password: yup
      .string()
      .min(7, translate(TranslationEnum.INVALID_PASSWORD))
      .required(translate(TranslationEnum.PASSWORD_REQUIRED)),
    repeatedPassword: yup
      .string()
      .required(translate(TranslationEnum.REPEAT_PASSWORD_REQUIRED))
      .when('password', {
        is: val => !!(val && val.length > 0),
        then: yup
          .string()
          .oneOf([yup.ref('password')], translate(TranslationEnum.INVALID_REPEAT_PASSWORD)),
      }),
  });

export class PickUpPassword extends PureComponent {
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
    signUpData: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
    resetSignUpFailure: PropTypes.func.isRequired,
    isSigningUp: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    signUpFailedBecauseOfCredentials: PropTypes.bool.isRequired,
    signUpFailedForUnknownError: PropTypes.bool.isRequired,
    initialFlow: PropTypes.bool,
  };

  static defaultProps = {
    initialFlow: true,
  };

  signUserUp = password => {
    const { signUp, signUpData, locale, initialFlow } = this.props;
    signUp({ ...signUpData, password, locale }).then(response => {
      if (response && response.data && response.data.accessToken) {
        if (initialFlow) {
          return mainMenuNavigation();
        }
        return Navigation.dismissAllModals();
      }
    });
  };

  _closeErrorModal = () => {
    const { resetSignUpFailure } = this.props;
    resetSignUpFailure();
  };

  render() {
    const {
      componentId,
      isSigningUp,
      signUpFailedBecauseOfCredentials,
      signUpFailedForUnknownError,
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
          height={metrics.deviceHeight * 0.1}
          style={background.bottomShape}
        />
        <KeyboardAwareScrollView
          style={layoutStyles.container}
          contentContainerStyle={main.contentContainer}
        >
          <View style={main.backButtonContainer}>
            <BackButton disabled={isSigningUp} onPress={() => Navigation.pop(componentId)} />
          </View>
          <Image style={main.logo} source={Images.LOGO} />

          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={getValidationSchema()}
            initialValues={{ password: '', repeatedPassword: '' }}
            onSubmit={({ password }) => this.signUserUp(password)}
            render={({ handleSubmit, handleChange, values, errors }) => (
              <View style={main.form}>
                <FormTextInput
                  autoCapitalize="none"
                  error={errors.password}
                  handleChange={handleChange('password')}
                  placeholder={translate(TranslationEnum.PASSWORD_PLACEHOLDER)}
                  value={values.password}
                  secureTextEntry
                  textContentType="password"
                  autoCompleteType="password"
                  editable={!isSigningUp}
                />

                <FormTextInput
                  autoCapitalize="none"
                  error={errors.repeatedPassword}
                  handleChange={handleChange('repeatedPassword')}
                  placeholder={translate(TranslationEnum.REPEAT_PASSWORD_PLACEHOLDER)}
                  value={values.repeatedPassword}
                  secureTextEntry
                  textContentType="password"
                  autoCompleteType="password"
                  editable={!isSigningUp}
                />

                <GeneralButton
                  onPress={handleSubmit}
                  style={main.button}
                  text={translate(TranslationEnum.NEXT)}
                  disabled={isSigningUp}
                  loading={isSigningUp}
                  activityIndicatorColor={colors.FANTASY_DARK}
                />
              </View>
            )}
          />
        </KeyboardAwareScrollView>

        <ErrorModal
          isVisible={signUpFailedBecauseOfCredentials || signUpFailedForUnknownError}
          title={
            (signUpFailedBecauseOfCredentials && translate(TranslationEnum.ACCOUNT_ERROR)) ||
            (signUpFailedForUnknownError && translate(TranslationEnum.ERROR))
          }
          body={
            (signUpFailedBecauseOfCredentials &&
              translate(TranslationEnum.ACCOUNT_ALREADY_CREATED)) ||
            (signUpFailedForUnknownError &&
              translate(TranslationEnum.UNEXPECTED_ERROR_OCCURRED_TRY_AGAIN))
          }
          closeHandler={this._closeErrorModal}
        />
      </View>
    );
  }
}
