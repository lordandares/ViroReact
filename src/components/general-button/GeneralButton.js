import React from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { main, text } from './style';
import colors from '../../theme/colors';

export const GeneralButton = props => {
  return (
    <TouchableHighlight
      disabled={props.disabled}
      style={[main.touchable, props.style]}
      onPress={props.onPress}
      underlayColor={colors.WHITE_ALPHA_90}
    >
      <View style={main.container}>
        {props.loading ? (
          <ActivityIndicator size="small" color={props.activityIndicatorColor} />
        ) : (
          <Text style={[text.buttonText, props.disabled && text.disabledColor]}>{props.text}</Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

GeneralButton.propTypes = {
  ...View.propTypes,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  activityIndicatorColor: PropTypes.any,
};

GeneralButton.defaultProps = {
  disabled: false,
  loading: false,
  activityIndicatorColor: colors.FANTASY_DARK,
};
