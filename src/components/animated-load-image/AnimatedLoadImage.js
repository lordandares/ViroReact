import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated } from 'react-native';
import colors from '../../theme/colors';

export class AnimatedLoadImage extends PureComponent {
  static propTypes = {
    ...Image.propTypes,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0);
  }

  handleLoad = () => {
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  render() {
    const { style } = this.props;

    return (
      <View style={[style, { backgroundColor: colors.GREY_LIGHT }]}>
        <Animated.View style={{ opacity: this.opacity }}>
          <Image {...this.props} onLoad={this.handleLoad} />
        </Animated.View>
      </View>
    );
  }
}
