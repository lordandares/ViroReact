import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './style';
import IconCharacter from '../../enum/IconCharacter';
import { colors } from '../../theme';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    lineHeight: PropTypes.number,
    iconStyle: PropTypes.any,
    containerStyle: PropTypes.any,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    color: colors.BLACK,
    size: 15,
    lineHeight: null,
    iconStyle: {},
    containerStyle: {},
    disabled: false,
    onPress: null,
  };

  renderContent = () => {
    const { name, color, size, lineHeight, iconStyle } = this.props;
    const iconUnicode = IconCharacter[name];

    return (
      <Text
        style={[
          Styles.icon,
          {
            color,
            fontSize: size,
            lineHeight: lineHeight || size,
          },
          iconStyle,
        ]}
      >
        {iconUnicode}
      </Text>
    );
  };

  render() {
    const { containerStyle, onPress, disabled } = this.props;
    return (
      <View style={[Styles.container, containerStyle]}>
        {onPress ? (
          <TouchableWithoutFeedback onPress={disabled ? () => null : onPress}>
            <View>{this.renderContent()}</View>
          </TouchableWithoutFeedback>
        ) : (
          this.renderContent()
        )}
      </View>
    );
  }
}

export default Icon;
