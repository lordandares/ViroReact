import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';

export const navBarHeight = metrics.nativeTopBarHeight + 10;

export const main = StyleSheet.create({
  container: {
    width: metrics.deviceWidth,
    height: navBarHeight,
  },

  containerAbsolute: {
    height: navBarHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  background: {
    width: metrics.deviceWidth,
    height: navBarHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    paddingHorizontal: metrics.getScaledSize(30),
    paddingBottom: metrics.getScaledSize(10),
  },
});
