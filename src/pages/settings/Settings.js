import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Switch } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { UrbanAirship } from 'urbanairship-react-native';
import { main, texts } from './style';
import { layoutStyles } from '../../theme/styleguide';
import BackgroundDecorator from '../../components/background-decorator';
import Icon from '../../components/icon';
import { CloseButton } from '../../components/close-button/CloseButton';
import { colors } from '../../theme';
import SettingsProfileCard from '../../components/settings-profile-card';
import GeneralButton from '../../components/general-button';
import Pages from '../../enum/Pages';
import { navigationComponent } from '../../navigation/navigator';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { enableNotifications } from '../../utils/pushNotificationsUtils';

export default class Settings extends PureComponent {
  static options = () => {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  };

  static propTypes = {
    language: PropTypes.string.isRequired,
    // user: PropTypes.obj.isRequired,
    user: PropTypes.object.isRequired,
    loadingEventsAndUserDynamicInfo: PropTypes.bool.isRequired,
    componentId: PropTypes.string.isRequired,
    currentComponentId: PropTypes.string.isRequired,

    // actions
    changeLanguage: PropTypes.func.isRequired,
    retrieveEventsAndUserDynamicInfo: PropTypes.func.isRequired,
    logUserOut: PropTypes.func.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
  };

  static displayName = 'Settings';

  constructor(props) {
    super(props);

    this.state = {
      shouldShowPicker: false,
      isNotificationsEnabled: false,
    };

    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    const { setCurrentComponentId, componentId } = this.props;
    setCurrentComponentId(componentId);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentDidMount = () => {
    UrbanAirship.isUserNotificationsEnabled().then(enabled => {
      this.setState({ isNotificationsEnabled: enabled });
    });
  };

  openPickerModal = () => this.setState({ shouldShowPicker: !this.state.shouldShowPicker });

  handleEnableNotifications = value => {
    this.setState({ isNotificationsEnabled: value });
    enableNotifications(value);
  };

  renderSwitchComponent = ({ icon, title, subtitle, value, onValueChange }) => {
    return (
      <View style={main.switchWrapper}>
        <View style={[layoutStyles.row, main.iconWeapper]}>
          <Icon name={icon} color={colors.WHITE} size={25} />
        </View>
        <View style={main.switchBodyWrapper}>
          <View style={[layoutStyles.row]}>
            <Text style={texts.switchTitleText}>{title}</Text>
          </View>
          <View style={[layoutStyles.row]}>
            <Text style={texts.switchSubtitleText}>{subtitle}</Text>
          </View>
        </View>
        <View style={main.switchButtonyWrapper}>
          <Switch
            thumbColor={colors.WHITE}
            trackColor={colors.INSPIRE_DARK}
            // tintColor={colors.INSPIRE_DARK}
            onTintColor={colors.INSPIRE_DARK}
            value={value}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    );
  };

  logUserOut = () => {
    const { logUserOut, retrieveEventsAndUserDynamicInfo, language } = this.props;
    logUserOut();
    retrieveEventsAndUserDynamicInfo({ locale: language, token: null });
    return Navigation.dismissAllModals();
  };

  render() {
    const { isNotificationsEnabled } = this.state;
    const { loadingEventsAndUserDynamicInfo, user, componentId, currentComponentId } = this.props;

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
            componentId={componentId}
            currentComponentId={currentComponentId}
          >
            <View style={main.closeButtonContainer}>
              <CloseButton
                disabled={loadingEventsAndUserDynamicInfo}
                onPress={() => Navigation.dismissAllModals()}
              />
            </View>

            <SettingsProfileCard user={user} />

            <View style={main.settingsContentWrapper}>
              <View style={[layoutStyles.row, main.contentTitleWrapper]}>
                <Text style={texts.contentTitleText}>
                  {translate(TranslationEnum.SETTINGS_NOTIFICATIONS_TITLE)}
                </Text>
              </View>

              {this.renderSwitchComponent({
                icon: 'NOTIFICATION',
                title: translate(TranslationEnum.SETTINGS_NOTIFICATIONS_TITLE),
                subtitle: translate(TranslationEnum.SETTINGS_NOTIFICATIONS_SUBTITLE),
                value: isNotificationsEnabled,
                onValueChange: this.handleEnableNotifications,
              })}

              <View style={main.line} />

              <View style={[layoutStyles.row]}>
                <Text
                  onPress={() =>
                    Navigation.push(
                      Pages.SETTINGS,
                      navigationComponent(Pages.PRIVACY_POLICY, null, { type: 'privacy' })
                    )
                  }
                  style={texts.privacyText}
                >
                  {translate(TranslationEnum.SETTINGS_PRIVACY_POLICY_BUTTON)}
                </Text>
              </View>

              {!!user.accessToken && (
                <GeneralButton
                  onPress={this.logUserOut}
                  disabled={loadingEventsAndUserDynamicInfo}
                  loading={loadingEventsAndUserDynamicInfo}
                  text={translate(TranslationEnum.SETTINGS_LOG_OUT_BUTTON)}
                  style={main.logOutButton}
                />
              )}
            </View>
          </BackgroundDecorator>
        </ScrollView>
      </View>
    );
  }
}
