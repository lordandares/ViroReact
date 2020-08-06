import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, I18nManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Markdown from 'react-native-markdown-renderer';
import { main } from './style';
import { layoutStyles } from '../../theme/styleguide';
import BackgroundDecorator from '../../components/background-decorator';
import RoundIconButton from '../../components/round-icon-button';
import Pages from '../../enum/Pages';
import AbsolutePositioningCard from '../../components/absolute-positioning-card';
import privacy from '../../static/privacy-and-terms/privacy';
import terms from '../../static/privacy-and-terms/terms';
import { colors } from '../../theme';

/**
 * Description
 * @author ?
 * @class Settings
 */
export default class PrivacyPolicy extends PureComponent {
  /**
   * Navigator styles
   */

  static options = () => {
    return {
      topBar: {
        visible: false,
        drawBehind: false,
      },
    };
  };

  /**
   * Definition of the prop types
   */
  static propTypes = {
    language: PropTypes.string.isRequired,
    type: PropTypes.string,
    currentComponentId: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
  };

  /**
   * Default Props
   */
  static defaultProps = {
    type: 'privacy',
  };

  /**
   * Name of the page for the tracking
   */
  static displayName = 'PrivacyPolicy';

  constructor(props) {
    super(props);

    this.state = {};
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

  render() {
    const { type, currentComponentId, componentId } = this.props;
    const content = type === 'terms' ? terms[this.props.language] : privacy[this.props.language];
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
            currentComponentId={currentComponentId}
            componentId={componentId}
          >
            <View style={main.closeButtonContainer}>
              <RoundIconButton
                icon={I18nManager.isRTL ? 'CHEVRON_RIGHT' : 'CHEVRON_LEFT'}
                onPress={() => Navigation.pop(Pages.PRIVACY_POLICY)}
              />
            </View>
            <AbsolutePositioningCard style={main.card}>
              <View style={main.cardContainer}>
                {/* eslint-disable-next-line */}
                <Markdown children={content} />
              </View>
            </AbsolutePositioningCard>
          </BackgroundDecorator>
        </ScrollView>
      </View>
    );
  }
}
