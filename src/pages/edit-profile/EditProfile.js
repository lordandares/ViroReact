import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Switch, I18nManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Formik } from 'formik';
import { main, texts } from './style';
import { layoutStyles } from '../../theme/styleguide';
import BackgroundDecorator from '../../components/background-decorator';
import Icon from '../../components/icon';
import RoundIconButton from '../../components/round-icon-button';
import { colors } from '../../theme';
import SettingsProfileCard from '../../components/settings-profile-card';
import Pages from '../../enum/Pages';
import FormTextInput from '../../components/form-text-input';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import GeneralButton from '../../components/general-button';

/**
 * Description
 * @author ?
 * @class Settings
 */
export default class EditProfile extends PureComponent {
  /**
   * Navigator styles
   */

  static options = () => {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  };

  /**
   * Definition of the prop types
   */
  static propTypes = {
    language: PropTypes.string.isRequired,
    // user: PropTypes.obj.isRequired,

    // actions
    changeLanguage: PropTypes.func.isRequired,
  };

  /**
   * Default Props
   */
  static defaultProps = {};

  /**
   * Name of the page for the tracking
   */
  static displayName = 'EditProfile';

  constructor(props) {
    super(props);

    this.state = {
      shouldShowPicker: false,
    };
  }

  componentDidMount = () => {};

  handleSelectedItem = ({ selectedItem }) => {
    // eslint-disable-next-line
    console.log(selectedItem);
    this.openPickerModal();
  };

  openPickerModal = () => {
    const { shouldShowPicker } = this.state;
    this.setState({ shouldShowPicker: !shouldShowPicker });
  };

  renderSwitchComponent = ({ icon, title, subtitle, value }) => {
    return (
      <View style={main.switchWrapper}>
        <View style={main.iconWeapper}>
          <Icon name={icon} color={colors.WHITE} size={25} />
        </View>
        <View style={main.switchBodyWrapper}>
          <Text style={texts.switchTitleText}>{title}</Text>
          <Text style={texts.switchSubtitleText}>{subtitle}</Text>
        </View>
        <View style={main.switchButtonyWrapper}>
          <Switch
            thumbColor={colors.WHITE}
            trackColor={colors.INSPIRE_DARK}
            tintColor={colors.INSPIRE_DARK}
            onTintColor={colors.INSPIRE_DARK}
            value={value}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={[layoutStyles.container, main.page]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[layoutStyles.container]}
          bounces={false}
        >
          <BackgroundDecorator
            backgroundColor={colors.TASTE}
            contentShapeColor={colors.INSPIRE}
            contentShapeTop={200}
          >
            <View style={main.closeButtonContainer}>
              <RoundIconButton
                icon={I18nManager.isRTL ? 'CHEVRON_RIGHT' : 'CHEVRON_LEFT'}
                onPress={() => Navigation.pop(Pages.EDIT_PROFILE)}
              />
            </View>

            <SettingsProfileCard
              user={{ name: 'Jhon Doe', email: 'jhon.doe@gmail.com' }}
              // shouldShowEditButton
            />

            <View style={main.settingsContentWrapper}>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                // validationSchema={getValidationSchema()}
                initialValues={{
                  firstName: 'Jhon',
                  lastName: 'Doe',
                  emailAddress: 'jhon.doe@gmail.com',
                }}
                onSubmit={(/* { firstName, lastName, emailAddress } */) => {}}
                render={({ /*  handleSubmit, */ handleChange, values, errors }) => (
                  <View style={main.formWrapper}>
                    <View style={[layoutStyles.row]}>
                      <Text style={texts.inputLabel}>
                        {translate(TranslationEnum.FIRST_NAME_PLACEHOLDER)}
                      </Text>
                    </View>
                    <FormTextInput
                      autoCapitalize="words"
                      error={errors.firstName}
                      handleChange={handleChange('firstName')}
                      placeholder={translate(TranslationEnum.FIRST_NAME_PLACEHOLDER)}
                      value={values.firstName}
                    />

                    <View style={[layoutStyles.row]}>
                      <Text style={texts.inputLabel}>
                        {translate(TranslationEnum.LAST_NAME_PLACEHOLDER)}
                      </Text>
                    </View>
                    <FormTextInput
                      autoCapitalize="words"
                      error={errors.lastName}
                      handleChange={handleChange('lastName')}
                      placeholder={translate(TranslationEnum.LAST_NAME_PLACEHOLDER)}
                      value={values.lastName}
                    />

                    <View style={main.passwordWrapper}>
                      <View style={[layoutStyles.row]}>
                        <Text style={texts.inputLabel}>
                          {translate(TranslationEnum.NEW_PASSWORD_PLACEHOLDER)}
                        </Text>
                      </View>
                      <FormTextInput
                        autoCapitalize="words"
                        error={errors.password}
                        handleChange={handleChange('password')}
                        placeholder={translate(TranslationEnum.NEW_PASSWORD_PLACEHOLDER)}
                        value={values.password}
                      />
                      <FormTextInput
                        autoCapitalize="words"
                        error={errors.password2}
                        handleChange={handleChange('password2')}
                        placeholder={translate(TranslationEnum.REPEAT_NEW_PASSWORD_PLACEHOLDER)}
                        value={values.password2}
                      />
                    </View>
                    <GeneralButton
                      onPress={() => {}}
                      text={translate(TranslationEnum.DELETE_ACCOUNT)}
                      style={main.deleteAccountButton}
                      textStyle={texts.deleteAccountButtonText}
                    />
                  </View>
                )}
              />
            </View>
          </BackgroundDecorator>
        </ScrollView>
      </View>
    );
  }
}
