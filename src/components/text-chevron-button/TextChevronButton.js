import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { main } from './style';
import { layoutStyles } from '../../theme/styleguide';
import colors from '../../theme/colors';
import Icon from '../icon';

const TextChevronButton = ({
  style,
  isTouchableOpacity,
  onPress,
  colorName,
  text,
  iconSize,
  textStyle,
}) => {
  const Touchable = isTouchableOpacity ? TouchableOpacity : TouchableWithoutFeedback;
  return (
    <View style={style}>
      <Touchable onPress={onPress} disabled={!onPress}>
        <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
          <Text style={[main.defaultText, textStyle, { color: colorName }]}>{text}</Text>
          <Icon name="CHEVRON_RIGHT" size={iconSize} color={colorName} />
        </View>
      </Touchable>
    </View>
  );
};

TextChevronButton.propTypes = {
  style: PropTypes.any,
  isTouchableOpacity: PropTypes.bool,
  onPress: PropTypes.func,
  colorName: PropTypes.string,
  text: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  textStyle: PropTypes.any,
};

TextChevronButton.defaultProps = {
  style: {},
  isTouchableOpacity: false,
  onPress: () => null,
  colorName: colors.JOY,
  iconSize: 7,
  textStyle: {},
};

export default TextChevronButton;
