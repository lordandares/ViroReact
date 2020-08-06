import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './style';

export class AbsolutePositioningCard extends PureComponent {
  static propTypes = {
    ...View.propTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      itemHeight: 0,
    };
  }

  handleLayoutMeasure = ({ nativeEvent }) => {
    this.setState({ itemHeight: nativeEvent.layout.height });
  };

  render() {
    const { itemHeight } = this.state;
    return (
      <View style={this.props.style} onLayout={this.handleLayoutMeasure}>
        <View style={[styles.background, styles.absolute, { height: itemHeight }]} />
        {this.props.children}
      </View>
    );
  }
}
