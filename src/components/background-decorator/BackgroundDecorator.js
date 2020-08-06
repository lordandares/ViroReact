import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { layoutStyles, metrics } from '../../theme/styleguide';
import { main } from './style';
import Parallelogram from '../parallelogram';

export class BackgroundDecorator extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    contentShapeColor: PropTypes.string.isRequired,
    middleShapeColor: PropTypes.string,
    contentShapeTop: PropTypes.number,
    middleShapeTop: PropTypes.number,
    componentId: PropTypes.string.isRequired,
    currentComponentId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    middleShapeColor: null,
    contentShapeTop: metrics.deviceHeight * 0.7,
    middleShapeTop: metrics.deviceHeight * 0.7 - 120,
  };

  constructor(props) {
    super(props);

    this.state = {
      contentHeight: 0,
    };
  }

  handleMeasurements = ({ nativeEvent }) => {
    this.setState({ contentHeight: nativeEvent.layout.height });
  };

  render() {
    const {
      children,
      backgroundColor,
      contentShapeColor,
      contentShapeTop,
      middleShapeColor,
      middleShapeTop,
      componentId,
      currentComponentId,
    } = this.props;

    const { contentHeight } = this.state;

    return (
      <View
        style={[layoutStyles.container, main.wrapper, { backgroundColor }]}
        onLayout={this.handleMeasurements}
      >
        {!!middleShapeColor && (
          <View style={[main.shapeContainer, { top: middleShapeTop }]}>
            <Parallelogram color={middleShapeColor} height={150} style={main.middleShape} />
          </View>
        )}

        <View style={[main.shapeContainer, { top: contentShapeTop }]}>
          <Parallelogram color={contentShapeColor} height={contentHeight} />
        </View>

        {componentId === currentComponentId ? (
          <Animatable.View animation="fadeInUp" style={layoutStyles.container}>
            {children}
          </Animatable.View>
        ) : null}
      </View>
    );
  }
}
