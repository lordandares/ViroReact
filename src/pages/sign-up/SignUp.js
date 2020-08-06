import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { main, background } from './style';
import Images from '../../theme/images';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import GeneralButton from '../../components/general-button/';
import colors from '../../theme/colors';
import { CloseButton } from '../../components/close-button/CloseButton';
import PickerInput from '../../components/picker-input/';
import FormTextInput from '../../components/form-text-input/';
import Pages from '../../enum/Pages';
import ItemsPicker from '../../components/items-picker/';
import { layoutStyles, metrics } from '../../theme/styleguide';
import Parallelogram from '../../components/parallelogram';

const getValidationSchema = () =>
  yup.object().shape({
    firstName: yup.string().required(translate(TranslationEnum.FIRST_NAME_REQUIRED)),

    lastName: yup.string().required(translate(TranslationEnum.LAST_NAME_REQUIRED)),

    gender: yup.string().required(translate(TranslationEnum.GENDER_REQUIRED)),

    ageRange: yup.string().required(translate(TranslationEnum.AGE_RANGE_REQUIRED)),

    email: yup
      .string()
      .email(translate(TranslationEnum.INVALID_EMAIL))
      .required(translate(TranslationEnum.EMAIL_REQUIRED)),

    phoneNumber: yup.string().required(translate(TranslationEnum.PHONE_REQUIRED)),
  });

export class SignUp extends PureComponent {
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
    storeSignUpData: PropTypes.func.isRequired,
    initialFlow: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showGenderModal: false,
      showAgeRangeModal: false,
    };
  }

  static defaultProps = {
    initialFlow: true,
  };

  dismiss = () => Navigation.dismissModal(this.props.componentId);

  navigateToPasswordPicking = signInData => {
    const { storeSignUpData, componentId, initialFlow } = this.props;
    storeSignUpData(signInData);
    return Navigation.push(componentId, {
      component: {
        name: Pages.PICK_UP_PASSWORD,
      },
      passProps: {
        initialFlow,
      },
    });
  };

  _renderGenderModal = handleChoseItem => {
    const { showGenderModal } = this.state;
    const maleString = translate(TranslationEnum.MALE);
    const femaleString = translate(TranslationEnum.FEMALE);
    return (
      <ItemsPicker
        data={[{ code: maleString, name: maleString }, { code: femaleString, name: femaleString }]}
        shouldShow={showGenderModal}
        handleChoseItem={value =>
          this._chosePickerItem(
            () => handleChoseItem(value),
            () => this.setState({ showGenderModal: false })
          )
        }
        handleClosePicker={() => this.setState({ showGenderModal: false })}
        buttonText={translate(TranslationEnum.SELECT)}
      />
    );
  };

  _chosePickerItem = (handleChoseItem, handleCloseModal) => {
    handleChoseItem();
    handleCloseModal();
  };

  _renderAgeRangeModal = handleChoseItem => {
    const { showAgeRangeModal } = this.state;
    const ageRangeOne = translate(TranslationEnum.BELOW_15);
    const ageRangeTwo = translate(TranslationEnum.BETWEEN_15_25);
    const ageRangeThree = translate(TranslationEnum.BETWEEN_26_40);
    const ageRangeFour = translate(TranslationEnum.BETWEEN_41_55);
    const ageRangeFive = translate(TranslationEnum.ABOVE_55);
    return (
      <ItemsPicker
        data={[
          { code: ageRangeOne, name: ageRangeOne },
          { code: ageRangeTwo, name: ageRangeTwo },
          { code: ageRangeThree, name: ageRangeThree },
          { code: ageRangeFour, name: ageRangeFour },
          { code: ageRangeFive, name: ageRangeFive },
        ]}
        shouldShow={showAgeRangeModal}
        handleChoseItem={value =>
          this._chosePickerItem(
            () => handleChoseItem(value),
            () => this.setState({ showAgeRangeModal: false })
          )
        }
        handleClosePicker={() =>
          this._chosePickerItem(handleChoseItem, () => this.setState({ showAgeRangeModal: false }))
        }
        buttonText={translate(TranslationEnum.SELECT)}
      />
    );
  };

  render() {
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
          <View style={main.closeButtonContainer}>
            <CloseButton onPress={this.dismiss} />
          </View>

          <Image style={main.logo} source={Images.LOGO} />

          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={getValidationSchema()}
            initialValues={{
              firstName: '',
              lastName: '',
              gender: '',
              ageRange: '',
              email: '',
              phoneNumber: '',
            }}
            onSubmit={({ firstName, lastName, gender, ageRange, email, phoneNumber }) =>
              this.navigateToPasswordPicking({
                firstName,
                lastName,
                gender,
                ageRange,
                email,
                phoneNumber,
              })
            }
            render={({ handleSubmit, handleChange, values, errors }) => (
              <View style={main.form}>
                <FormTextInput
                  autoCapitalize="words"
                  error={errors.firstName}
                  handleChange={handleChange('firstName')}
                  placeholder={translate(TranslationEnum.FIRST_NAME_PLACEHOLDER)}
                  value={values.firstName}
                />

                <FormTextInput
                  autoCapitalize="words"
                  error={errors.lastName}
                  handleChange={handleChange('lastName')}
                  placeholder={translate(TranslationEnum.LAST_NAME_PLACEHOLDER)}
                  value={values.lastName}
                />

                <PickerInput
                  value={values.gender}
                  placeholder={translate(TranslationEnum.GENDER_PLACEHOLDER)}
                  onPress={() => this.setState({ showGenderModal: true })}
                  error={errors.gender}
                />
                {this._renderGenderModal(handleChange('gender'))}

                <PickerInput
                  value={values.ageRange}
                  placeholder={translate(TranslationEnum.AGE_RANGE_PLACEHOLDER)}
                  onPress={() => this.setState({ showAgeRangeModal: true })}
                  error={errors.ageRange}
                />
                {this._renderAgeRangeModal(handleChange('ageRange'))}

                <FormTextInput
                  autoCapitalize="none"
                  error={errors.email}
                  handleChange={handleChange('email')}
                  placeholder={translate(TranslationEnum.EMAIL_PLACEHOLDER)}
                  value={values.email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                />

                <FormTextInput
                  autoCapitalize="none"
                  error={errors.phoneNumber}
                  handleChange={handleChange('phoneNumber')}
                  placeholder={translate(TranslationEnum.PHONE_PLACEHOLDER)}
                  value={values.phoneNumber}
                />

                <GeneralButton
                  onPress={handleSubmit}
                  style={main.button}
                  text={translate(TranslationEnum.NEXT)}
                  activityIndicatorColor={colors.FANTASY_DARK}
                />
              </View>
            )}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
