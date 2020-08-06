import React from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { main, texts } from './style';
import AbsolutePositioningCard from '../absolute-positioning-card';
import Icon from '../icon';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { colors } from '../../theme';
import AccountActions from '../account-actions/AccountActions';
import Pages from '../../enum/Pages';

const SettingsProfileCard = props => {
  const renderSignInSignUpButtons = () => (
    <View>
      <AccountActions
        onLogInPress={() =>
          Navigation.showModal({
            component: {
              name: Pages.SIGN_IN,
              passProps: {
                initialFlow: false,
              },
            },
          })
        }
        linkColor={colors.INSPIRE}
      />
    </View>
  );

  return (
    <AbsolutePositioningCard style={main.card}>
      <View style={main.cardContainer}>
        <View style={main.avatar}>
          <Icon name="PROFILE" color={colors.GREY_MEDIUM} size={50} />
        </View>
        <View style={main.cardTextWrapper}>
          <View>
            <Text style={texts.cardTitleText}>
              {!props.user.accessToken
                ? translate(TranslationEnum.SETTINGS_PROFILE_CARD_TITLE)
                : `${props.user.firstName} ${props.user.lastName}`}
            </Text>
          </View>
          <View>
            <Text style={texts.cardBodyText}>
              {!props.user.accessToken
                ? translate(TranslationEnum.SETTINGS_PROFILE_CARD_BODY)
                : props.user.email}
            </Text>
          </View>
          {!props.user.accessToken && renderSignInSignUpButtons()}
          {/* {props.user.accessToken && renderEditButton()} */}
        </View>
      </View>
    </AbsolutePositioningCard>
  );
};

SettingsProfileCard.propTypes = {
  user: PropTypes.object,
};
SettingsProfileCard.defaultProps = {
  user: null,
};

export default SettingsProfileCard;
