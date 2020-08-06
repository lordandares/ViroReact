import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { main, text, background } from './style';
import Images from '../../theme/images';
import Pages from '../../enum/Pages';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import GeneralButton from '../../components/general-button/';
import { layoutStyles } from '../../theme/styleguide';
import Parallelogram from '../../components/parallelogram';
import { colors } from '../../theme';

export class Onboarding extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  static propTypes = {
    onboardingHasBeenSeen: PropTypes.func.isRequired,
    componentId: PropTypes.string.isRequired,
  };

  startOnboarding = () =>
    Navigation.push(this.props.componentId, {
      component: {
        name: Pages.ENABLE_LOCATION,
      },
    });

  render() {
    return (
      <View style={main.container}>
        <Parallelogram color={colors.FANTASY} height={90} style={background.topShape} />
        <Parallelogram color={colors.TASTE} height={130} style={background.bottomShape} />

        <View style={[layoutStyles.alignCenter, main.contentContainer]}>
          <Image style={main.logo} source={Images.LOGO} />
          <Text style={text.title}>{translate(TranslationEnum.WELCOME_TO_RIYADH)}</Text>
          <Text style={text.subtitle}>{translate(TranslationEnum.OFFICIAL_GUIDE)}</Text>
        </View>

        <View style={main.buttonContainer}>
          <GeneralButton
            onPress={this.startOnboarding}
            text={translate(TranslationEnum.DISCOVER)}
          />
        </View>
      </View>
    );
  }
}
