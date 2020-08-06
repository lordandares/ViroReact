import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { main } from './style';
import { layoutStyles } from '../../theme/styleguide';
import { colors } from '../../theme';

/**
 * Description
 * @author ?
 * @class NavBar
 */
class NavBar extends PureComponent {
  /**
   * Definition of the prop types
   */
  static propTypes = {
    active: PropTypes.bool,
    backgroundColor: PropTypes.string,
    renderNavigatorActions: PropTypes.node,
    renderBarActions: PropTypes.node,
    absolutePosition: PropTypes.bool,
  };

  /**
   * Default Props
   */
  static defaultProps = {
    active: false,
    backgroundColor: colors.TRANSPARENT,
    renderNavigatorActions: null,
    renderBarActions: null,
    absolutePosition: false,
  };

  render() {
    const {
      renderNavigatorActions,
      renderBarActions,
      backgroundColor,
      absolutePosition,
    } = this.props;

    return (
      <View
        style={[
          layoutStyles.justifyEnd,
          main.container,
          absolutePosition && main.containerAbsolute,
        ]}
      >
        <LinearGradient colors={[backgroundColor, colors.TRANSPARENT]} style={main.background} />

        <View
          style={[
            layoutStyles.row,
            layoutStyles.alignCenter,
            layoutStyles.justifyBetween,
            main.content,
          ]}
        >
          <View>{renderNavigatorActions}</View>

          <View>{renderBarActions}</View>
        </View>
      </View>
    );
  }
}

export default NavBar;
