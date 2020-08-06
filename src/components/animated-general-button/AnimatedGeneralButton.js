import React, { PureComponent } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import { main } from './style';
import colors from '../../theme/colors';
import Icon from '../icon';

// Animation Config
const type = LayoutAnimation.Types.easeInEaseOut;
const property = LayoutAnimation.Properties.opacity;
const genCustomPreset = delays => ({
  duration: 200,
  create: { type, property, delay: delays[0] },
  update: { type, property, delay: delays[1] },
  delete: { type, property, delay: delays[2] },
});

export class AnimatedGeneralButton extends PureComponent {
  componentWillReceiveProps(newProps) {
    const { loading, success } = this.props;
    if ((newProps.loading && !loading) || (newProps.success && !success)) {
      this.animateShrink();
      return;
    }
    if (newProps.success && !newProps.loading && !success && loading) {
      this.animateStandard();
      return;
    }
    if (!newProps.success && newProps.loading && success && !loading) {
      this.animateStandard();
      return;
    }
    if (!newProps.loading && !newProps.success && (loading || success)) {
      this.animateExpand();
    }
  }

  animateStandard() {
    LayoutAnimation.configureNext(genCustomPreset([200, 0, 0]));
  }

  animateShrink() {
    LayoutAnimation.configureNext(genCustomPreset([150, 100, 0]));
  }

  animateExpand() {
    LayoutAnimation.configureNext(genCustomPreset([250, 100, 0]));
  }

  renderButtonContent() {
    const { loading, success, activityIndicatorColor, textStyle, text } = this.props;
    if (loading) {
      return <ActivityIndicator size="small" color={activityIndicatorColor} />;
    }
    if (success) {
      // TODO: replace icon with a tic
      return <Icon name="STAR" size={18} color={colors.BLACK} />;
    }
    return <Text style={[main.buttonText, textStyle]}>{text}</Text>;
  }

  render() {
    const { disabled, style, onPress, loading, success } = this.props;
    return (
      <TouchableHighlight
        disabled={disabled}
        underlayColor={colors.WHITE_ALPHA_80}
        style={[main.touchable, style, (loading || success) && main.circularTouchable]}
        onPress={onPress}
      >
        <View style={main.container}>{this.renderButtonContent()}</View>
      </TouchableHighlight>
    );
  }
}

AnimatedGeneralButton.propTypes = {
  ...View.propTypes,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  activityIndicatorColor: PropTypes.any,
};

AnimatedGeneralButton.defaultProps = {
  textStyle: {},
  disabled: false,
  loading: false,
  success: false,
  activityIndicatorColor: colors.BLACK,
};
