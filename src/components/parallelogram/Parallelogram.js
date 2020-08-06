import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { main } from './style';
import { metrics } from '../../theme/styleguide';

export const Parallelogram = props => {
  const { color, borderHeight, height, style, width } = props;
  return (
    <View style={[main.shapeContainer, style]}>
      <View
        style={[
          main.shape,
          {
            borderBottomColor: color,
            borderBottomWidth: metrics.getScaledSize(borderHeight),
            borderRightWidth: width,
          },
        ]}
      />
      <View
        style={[
          main.rectangle,
          {
            backgroundColor: color,
            height: metrics.getScaledSize(height),
          },
        ]}
      />
    </View>
  );
};

Parallelogram.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  borderHeight: PropTypes.number,
  style: PropTypes.object,
};

Parallelogram.defaultProps = {
  width: metrics.deviceWidth,
  height: 0,
  borderHeight: 75,
  style: {},
};
