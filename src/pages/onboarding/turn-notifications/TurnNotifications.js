import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { OnboardingStep } from '../onboarding-step/OnboardingStep';
import TranslationEnum from '../../../enum/TranslationEnum';
import { translate } from '../../../utils/Translator';
import images from '../../../theme/images';
import Pages from '../../../enum/Pages';
import { loginNavigation } from '../../../navigation/navigator';

export class TurnNotifications extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  skipOnboarding = () => {
    this.props.onboardingHasBeenSeen();
    return loginNavigation();
  };

  navigateToNextStep = () =>
    Navigation.push(this.props.componentId, {
      component: {
        name: Pages.PERSONALIZED_LIST,
      },
    });

  render() {
    const { language } = this.props;
    return (
      <OnboardingStep
        title={translate(TranslationEnum.TURN_NOTIFICATIONS)}
        subtitle={translate(TranslationEnum.APP_USES_NOTIFICATIONS)}
        image={images[`ENABLE_NOTIFICATIONS_${language.toUpperCase()}`]}
        body={translate(TranslationEnum.PHONE_WILL_REQUEST_NOTIFICATIONS)}
        onButtonPress={this.navigateToNextStep}
        onBackButtonPress={() => Navigation.pop(this.props.componentId)}
        currentStepIndex={1}
        onSkipPress={this.skipOnboarding}
      />
    );
  }
}

TurnNotifications.propTypes = {
  componentId: PropTypes.string.isRequired,
  onboardingHasBeenSeen: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
