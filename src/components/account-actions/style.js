import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';
import { fonts } from '../../theme';

export const main = StyleSheet.create({
  column: {
    paddingVertical: metrics.getScaledSize(7),
    paddingHorizontal: metrics.getScaledSize(5),
  },
  text: {
    paddingVertical: metrics.getScaledSize(10),
    paddingHorizontal: metrics.getScaledSize(10),
    fontSize: metrics.getScaledSize(13),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
});
