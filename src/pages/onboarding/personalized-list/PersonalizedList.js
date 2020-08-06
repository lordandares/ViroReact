import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { OnboardingStep } from '../onboarding-step/OnboardingStep';
import TranslationEnum from '../../../enum/TranslationEnum';
import { translate } from '../../../utils/Translator';
import images from '../../../theme/images';
import Pages from '../../../enum/Pages';
import { loginNavigation } from '../../../navigation/navigator';
import { isIOS } from '../../../utils/platformUtils';

export class PersonalizedList extends Component {
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
        name: Pages.EXPLORE_RIYADH,
      },
    });

  render() {
    const { language } = this.props;
    return (
      <OnboardingStep
        title={translate(TranslationEnum.YOUR_PERSONALIZED_LIST)}
        image={images[`PERSONALIZED_LIST_${language.toUpperCase()}`]}
        body={translate(TranslationEnum.FROM_TICKETS_TO_SHOW)}
        onButtonPress={this.navigateToNextStep}
        onBackButtonPress={() => Navigation.pop(this.props.componentId)}
        currentStepIndex={isIOS ? 2 : 1}
        onSkipPress={this.skipOnboarding}
      />
    );
  }
}

PersonalizedList.propTypes = {
  componentId: PropTypes.string.isRequired,
  onboardingHasBeenSeen: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
