import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  wrapper: {
    minHeight: metrics.deviceHeight,
  },
  shapeContainer: {
    position: 'absolute',
    left: 0,
  },
  middleShape: {
    transform: [{ rotateY: '180deg' }],
  },
});
