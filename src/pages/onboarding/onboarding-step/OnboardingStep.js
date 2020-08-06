import React from 'react';
import { View, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { main, text, background } from './style';
import BackButton from '../../../components/back-button/';
import { translate } from '../../../utils/Translator';
import TranslationEnum from '../../../enum/TranslationEnum';
import GeneralButton from '../../../components/general-button';
import DotsPageIndicator from '../../../components/dots-page-indicator';
import colors from '../../../theme/colors';
import Parallelogram from '../../../components/parallelogram';
import { metrics, layoutStyles } from '../../../theme/styleguide';
import NavBar from '../../../components/nav-bar/NavBar';
import { isIOS } from '../../../utils/platformUtils';

const ONBOARDING_STEPS = isIOS ? 4 : 3;
const DOT_DIAMETER = 10;
const DON_MARGIN = 10;
const DOT_BORDER_WIDTH = 1;

const _renderNavBarNavigator = action => {
  return <BackButton onPress={action} />;
};

const _renderNavBarActions = action => {
  return (
    <TouchableWithoutFeedback onPress={action}>
      <Text onPress={action} style={text.skip}>
        {translate(TranslationEnum.SKIP)} >
      </Text>
    </TouchableWithoutFeedback>
  );
};
export const OnboardingStep = props => {
  return (
    <View style={main.container}>
      <Parallelogram
        color={colors.FANTASY}
        width={metrics.deviceWidth * 0.5}
        borderHeight={metrics.deviceHeight * 0.15}
        style={background.topShape}
      />
      <Parallelogram color={colors.TASTE} height={50} style={background.bottomShape} />

      <View style={layoutStyles.container}>
        <View style={[layoutStyles.container, layoutStyles.justifyBetween]}>
          <NavBar
            renderNavigatorActions={_renderNavBarNavigator(props.onBackButtonPress)}
            renderBarActions={_renderNavBarActions(props.onSkipPress)}
          />

          <View style={[layoutStyles.container, layoutStyles.flexCenter]}>
            <Text style={text.title}>{props.title}</Text>

            {!!props.subtitle && <Text style={text.subtitle}>{props.subtitle}</Text>}

            <Image style={main.image} source={props.image} />

            <Text style={text.body}>{props.body}</Text>
          </View>
        </View>

        <View style={[layoutStyles.alignCenter, main.buttonContainer]}>
          <GeneralButton
            onPress={props.onButtonPress}
            style={main.button}
            text={translate(TranslationEnum.CONTINUE)}
          />

          <DotsPageIndicator
            style={main.dotsPageIndicator}
            totalSteps={ONBOARDING_STEPS}
            currentStepIndex={props.currentStepIndex}
            dotDiameter={DOT_DIAMETER}
            dotMargin={DON_MARGIN}
            dotBorderWidth={DOT_BORDER_WIDTH}
            dotColor={colors.WHITE}
          />
        </View>
      </View>
    </View>
  );
};

OnboardingStep.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any,
  image: PropTypes.any.isRequired,
  body: PropTypes.any.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  onBackButtonPress: PropTypes.func.isRequired,
  onSkipPress: PropTypes.func.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
};

OnboardingStep.defaultProps = {
  subtitle: null,
};
