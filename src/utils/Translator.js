import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import 'moment/min/locales';
import I18n from 'i18n-js';
import formatMessage from 'format-message';
import TranslationEnum from '../enum/TranslationEnum';

const localeEN = require('../static/locale/locale-en.json');
const localeAR = require('../static/locale/locale-ar.json');

const initLocaleWithDefaultLanguage = (defaultLocale = 'en') => {
  I18n.defaultLocale = defaultLocale;
  I18n.locale = defaultLocale;
  I18n.fallbacks = true;
  formatMessageSetup();
};

const translations = {
  en: localeEN,
  ar: localeAR,
};

I18n.translations = translations;

const isRTL = () => {
  const currentLocale = I18n.currentLocale();
  return currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;
};

const formatMessageSetup = () => {
  formatMessage.setup({
    locale: I18n.locale,
    translations,
  });
  I18nManager.forceRTL(isRTL());
};

const changeLocale = (locale = 'en', action) => {
  I18n.locale = locale;
  if (action) {
    action(locale);
  }
  formatMessageSetup();
  setTimeout(() => RNRestart.Restart(), 100);
};

const getFormattedMessage = (id, options = {}) => formatMessage(id, options);

const translate = (id, options = {}) => {
  return TranslationEnum[id] !== undefined
    ? getFormattedMessage(id, options)
    : '__COPY_ID_NOT_FOUND__';
};

formatMessageSetup();

const getWritingDirectionStyle = () => (isRTL() ? 'rtl' : 'ltr');

export { initLocaleWithDefaultLanguage, changeLocale, translate, isRTL, getWritingDirectionStyle };
