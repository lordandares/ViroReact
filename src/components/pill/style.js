import { StyleSheet, Platform } from 'react-native';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    borderRadius: metrics.getScaledSize(30),
    paddingVertical: metrics.getScaledSize(6),
    paddingHorizontal: metrics.getScaledSize(24),
    borderWidth: metrics.getScaledSize(2),
    marginBottom: metrics.getScaledSize(15),
  },
  text: {
    fontSize: metrics.getScaledSize(13),
    fontFamily: fonts.HURME_SEMIBOLD,
    paddingBottom: Platform.OS === 'android' ? metrics.getScaledSize(2) : 0,
  },
});
