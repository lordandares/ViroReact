import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../icon';
import styles from './style';
import { colors } from '../../theme';

const handleOnPress = props => {
  return !props.disabled && props.onPress();
};

export const CloseButton = props => (
  <TouchableWithoutFeedback onPress={() => handleOnPress(props)}>
    <View style={[styles.closeButton, props.style]}>
      <Icon onPress={() => handleOnPress(props)} name="CROSS" size={12} color={colors.GREY_DARK} />
    </View>
  </TouchableWithoutFeedback>
);

CloseButton.propTypes = {
  ...View.propTypes,
  onPress: PropTypes.func,
};

CloseButton.defaultProps = {
  onPress: () => {},
};
