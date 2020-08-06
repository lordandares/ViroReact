import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { metrics } from '../../theme/styleguide';

/**
 * Description
 * @author Carlos Arteaga
 * @class VisibilityDetector
 */

class VisibilityDetector extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    active: PropTypes.bool,
    delay: PropTypes.number,
    children: PropTypes.any.isRequired,
    offsetLeft: PropTypes.number,
    offsetRight: PropTypes.number,
  };

  static defaultProps = {
    active: true,
    delay: Platform.OS === 'ios' ? 0 : 100,
    offsetLeft: 15,
    offsetRight: 80,
  };

  constructor(props) {
    super(props);

    this.lastValue = null;
  }

  componentWillUnmount() {
    this.stopWatching();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      if (nextProps.active) {
        this.startWatching();
      } else {
        this.stopWatching();
      }
    }
  }

  onLayout = () => {
    if (this.props.active) {
      this.startWatching();
    }
  };

  startWatching = () => {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(event => this.check(event), this.props.delay);
  };

  stopWatching = () => {
    this.interval = clearInterval(this.interval);
  };

  check = () => {
    const { onChange, offsetLeft, offsetRight } = this.props;
    const element = this.ref;
    let elementLeft;

    element.measureInWindow(x => {
      elementLeft = x;

      const viewportLeft = 0 + offsetLeft;
      const viewportRight = metrics.deviceWidth - offsetRight;

      const isVisible = elementLeft < viewportRight && elementLeft > viewportLeft;

      if (isVisible !== this.lastValue) {
        this.lastValue = isVisible;
        onChange(isVisible);
      }
    });
  };

  render() {
    const { children } = this.props;
    return (
      <View
        ref={ref => {
          this.ref = ref;
        }}
        {...this.props}
        onLayout={this.onLayout}
      >
        {children}
      </View>
    );
  }
}

export default VisibilityDetector;
