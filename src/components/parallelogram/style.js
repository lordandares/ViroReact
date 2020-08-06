import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';
import { colors } from '../../theme';

export const main = StyleSheet.create({
  shape: {
    width: 0,
    height: 0,
    backgroundColor: colors.TRANSPARENT,
    borderStyle: 'solid',
    borderRightColor: colors.TRANSPARENT,
  },
  rectangle: {
    width: metrics.width,
  },
});
