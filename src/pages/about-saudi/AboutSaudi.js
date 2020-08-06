import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import I18n from 'i18n-js';
// import PropTypes from 'prop-types';
import { View, Text, Button, I18nManager } from 'react-native';
import PropTypes from 'prop-types';
import Pages from '../../enum/Pages';
import { styles } from './style';
import {
  translate,
  changeLocale,
  getWritingDirectionStyle,
  initLocaleWithDefaultLanguage,
} from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';

/**
 * Description
 * @author ?
 * @class AboutSaudi
 */
export default class AboutSaudi extends PureComponent {
  /**
   * Navigator styles
   */
  static navigatorStyle = {};

  /**
   * Definition of the prop types
   */
  static propTypes = {
    changeLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  };

  /**
   * Default Props
   */
  static defaultProps = {};

  /**
   * Name of the page for the tracking
   */
  static displayName = 'AboutSaudi';

  constructor(props) {
    super(props);
    // console.log('ABOUT SAUDI PROPS', props);
    initLocaleWithDefaultLanguage(props.language);
    I18nManager.forceRTL(props.language === 'ar');
  }

  onPressArticle() {
    Navigation.push(Pages.ABOUT_SAUDI, {
      component: {
        name: Pages.ARTICLE_DETAIL,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
          },
        },
        // passProps: {
        //   // id,
        //   // image,
        //   // title,
        //   // description,
        // },
      },
    });
  }

  handleChangeLocale = () => {
    const { changeLanguage } = this.props;
    const newLang = I18n.currentLocale() === 'en' ? 'ar' : 'en';
    changeLocale(newLang, changeLanguage);
    // forse update to re-render
    this.forceUpdate();
  };

  render() {
    const { language } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.localeContainer}>
          <Button
            style={styles.button}
            onPress={this.handleChangeLocale}
            title="Change Lang"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>{language}</Text>
        </View>
        <View style={styles.article}>
          <Text style={{ writingDirection: getWritingDirectionStyle() }}>
            {translate(TranslationEnum.SIMPLE_TITLE, { name: 'John' })}
          </Text>
          <Button
            onPress={this.onPressArticle}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}
