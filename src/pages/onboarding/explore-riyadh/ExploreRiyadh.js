import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { OnboardingStep } from '../onboarding-step/OnboardingStep';
import TranslationEnum from '../../../enum/TranslationEnum';
import { translate } from '../../../utils/Translator';
import images from '../../../theme/images';
import { loginNavigation } from '../../../navigation/navigator';
import { isIOS } from '../../../utils/platformUtils';

export class ExploreRiyadh extends Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  skipOrFinishOnboarding = () => {
    this.props.onboardingHasBeenSeen();
    return loginNavigation();
  };

  render() {
    return (
      <OnboardingStep
        title={translate(TranslationEnum.EXPLORE_RIYADH)}
        image={images.EXPLORE_RIYADH_EN}
        body={translate(TranslationEnum.EXPLORE_RIYADH_OFFER)}
        onButtonPress={this.skipOrFinishOnboarding}
        onBackButtonPress={() => Navigation.pop(this.props.componentId)}
        currentStepIndex={isIOS ? 3 : 2}
        onSkipPress={this.skipOrFinishOnboarding}
      />
    );
  }
}

ExploreRiyadh.propTypes = {
  componentId: PropTypes.string.isRequired,
  onboardingHasBeenSeen: PropTypes.func.isRequired,
};
