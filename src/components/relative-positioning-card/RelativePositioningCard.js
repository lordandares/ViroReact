import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './../absolute-positioning-card/style';

export class RelativePositioningCard extends PureComponent {
  static propTypes = {
    ...View.propTypes,
  };

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.background, styles.container, style || {}]}>{this.props.children}</View>
    );
  }
}
