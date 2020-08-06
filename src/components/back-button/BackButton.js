import React from 'react';
import { TouchableWithoutFeedback, View, I18nManager } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../icon';
import styles from './style';
import { colors } from '../../theme';

const handleOnPress = props => {
  return !props.disabled && props.onPress();
};

export const BackButton = props => (
  <TouchableWithoutFeedback onPress={() => handleOnPress(props)}>
    <View style={[styles.backButton, props.style]}>
      <Icon
        name={I18nManager.isRTL ? 'CHEVRON_RIGHT' : 'CHEVRON_LEFT'}
        size={12}
        color={colors.GREY_DARK}
        onPress={() => handleOnPress(props)}
      />
    </View>
  </TouchableWithoutFeedback>
);

BackButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

BackButton.defaultProps = {
  style: {},
  onPress: () => {},
  disabled: false,
};
