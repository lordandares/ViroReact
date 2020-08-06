import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  iconspace: {
    marginRight: metrics.getScaledSize(15),
  },
  navList: {
    paddingTop: metrics.getScaledSize(15),
    paddingBottom: metrics.getScaledSize(23),
    paddingHorizontal: metrics.getScaledSize(20),
  },
  navtext: {
    paddingHorizontal: metrics.getScaledSize(16),
    paddingBottom: metrics.getScaledSize(1),
    marginHorizontal: metrics.getScaledSize(10),
    borderRadius: metrics.getScaledSize(20),
    borderWidth: metrics.getScaledSize(2),
    borderColor: colors.TRANSPARENT,
  },
  navtextActive: {
    borderColor: colors.WHITE,
  },
});

export const text = StyleSheet.create({
  dates: {
    color: colors.WHITE,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
});
