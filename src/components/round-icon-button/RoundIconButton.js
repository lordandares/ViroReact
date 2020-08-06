import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../icon';
import styles from './style';
import { colors } from '../../theme';

export const RoundIconButton = props => (
  <TouchableWithoutFeedback onPress={props.onPress} style={props.style}>
    <View style={styles.closeButton}>
      <Icon onPress={props.onPress} name={props.icon} size={props.size} color={props.color} />
    </View>
  </TouchableWithoutFeedback>
);

RoundIconButton.propTypes = {
  ...View.propTypes,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

RoundIconButton.defaultProps = {
  onPress: () => {},
  icon: 'CROSS',
  size: 12,
  color: colors.GREY_DARK,
};
