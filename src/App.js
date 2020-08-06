import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, I18nManager, Platform, NativeModules } from 'react-native';
import { mainMenuNavigation, onboardingNavigation, loginNavigation } from './navigation/navigator';
import { initLocaleWithDefaultLanguage } from './utils/Translator';
import { setLanguage } from './store/actions/app';

export default class App extends PureComponent {
  static propTypes = {
    store: PropTypes.object,
  };

  static defaultProps = {
    store: {},
  };

  _getDeviceLanguage = () => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
    return deviceLanguage.includes('ar') ? 'ar' : 'en';
  };

  componentWillMount() {
    const { store } = this.props;
    const state = store.getState();
    const { isFirstStart, language } = state.app;
    const { accessToken } = state.user;

    let appLanguage = language;
    if (!appLanguage) {
      appLanguage = this._getDeviceLanguage();
      store.dispatch(setLanguage(appLanguage));
    }
    initLocaleWithDefaultLanguage(appLanguage);
    I18nManager.forceRTL(appLanguage === 'ar');

    // Show onboarding
    if (isFirstStart) {
      return onboardingNavigation();
    }

    // Show sign-in page
    if (!accessToken) {
      return loginNavigation();
    }

    // Show main navigation
    return mainMenuNavigation();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LOADING</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
