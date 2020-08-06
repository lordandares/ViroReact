import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { main } from './style';
import colors from '../../theme/colors';

const Pill = ({ customStyle, isActive, text, activeColor, inactiveColor, onPress }) => {
  const borderColorStyle = isActive ? { borderColor: activeColor } : { borderColor: inactiveColor };
  const textColorStyle = isActive ? { color: activeColor } : { color: inactiveColor };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[main.container, borderColorStyle, customStyle]}>
        <Text style={[main.text, textColorStyle]}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Pill.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  isActive: PropTypes.bool,
  text: PropTypes.string.isRequired,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};
Pill.defaultProps = {
  customStyle: {},
  isActive: false,
  activeColor: colors.INSPIRE,
  inactiveColor: colors.GREY_DISABLED,
};

export default Pill;
