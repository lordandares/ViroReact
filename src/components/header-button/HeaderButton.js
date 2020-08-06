import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { main } from './style';
import { colors } from '../../theme';
import Icon from '../icon';
import { metrics, layoutStyles } from '../../theme/styleguide';

/**
 * Description
 * @author Carlos Arteaga
 * @class HeaderButton
 */
class HeaderButton extends PureComponent {
  /**
   * Definition of the prop types
   */
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    containerStyle: PropTypes.object,
  };

  /**
   * Default Props
   */
  static defaultProps = {
    iconSize: metrics.getScaledSize(28),
    iconColor: colors.WHITE,
    backgroundColor: colors.TRANSPARENT,
    containerStyle: null,
  };

  render() {
    const { iconName, iconSize, iconColor, onPress, backgroundColor, containerStyle } = this.props;
    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[layoutStyles.flexCenter, main.container, { backgroundColor }]}>
            <Icon name={iconName} size={iconSize} color={iconColor} onPress={onPress} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default HeaderButton;
