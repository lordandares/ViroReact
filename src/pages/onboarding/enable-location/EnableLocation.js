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

export class EnableLocation extends Component {
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
        name: isIOS ? Pages.TURN_NOTIFICATIONS : Pages.PERSONALIZED_LIST,
      },
    });

  render() {
    const { language } = this.props;
    const imageSource = isIOS
      ? images[`ENABLE_LOCATION_${language.toUpperCase()}`]
      : images[`ENABLE_LOCATION_ANDROID_${language.toUpperCase()}`];
    return (
      <OnboardingStep
        title={translate(TranslationEnum.ENABLE_LOCATION)}
        subtitle={translate(TranslationEnum.APP_USES_LOCATION)}
        image={imageSource}
        body={translate(TranslationEnum.PHONE_WILL_REQUEST_LOCATION)}
        onButtonPress={this.navigateToNextStep}
        onBackButtonPress={() => Navigation.pop(this.props.componentId)}
        currentStepIndex={0}
        onSkipPress={this.skipOnboarding}
      />
    );
  }
}

EnableLocation.propTypes = {
  componentId: PropTypes.string.isRequired,
  onboardingHasBeenSeen: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
