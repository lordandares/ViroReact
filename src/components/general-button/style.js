import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { fonts } from '../../theme';

const HEIGHT = 50;

export const main = StyleSheet.create({
  touchable: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
});

export const text = StyleSheet.create({
  buttonText: {
    color: colors.GREY_DARK,
    fontSize: 19,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  disabledColor: {
    color: colors.GREY_MEDIUM,
  },
});
