import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { main } from './style';
import { layoutStyles } from '../../theme/styleguide';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { colors } from '../../theme';

const AccountActions = props => {
  return (
    <View style={[layoutStyles.flexCenter, main.column]}>
      <TouchableWithoutFeedback onPress={props.onLogInPress}>
        <View>
          <Text style={[main.text, { color: props.linkColor }]}>
            {translate(TranslationEnum.ACCOUNT_LOGIN).toUpperCase()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

AccountActions.propTypes = {
  onLogInPress: PropTypes.func.isRequired,
  linkColor: PropTypes.string,
};

AccountActions.defaultProps = {
  linkColor: colors.JOY,
};

export default AccountActions;
