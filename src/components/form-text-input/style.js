import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const text = StyleSheet.create({
  input: {
    width: WINDOW_WIDTH - 80,
    color: colors.WHITE,
    fontSize: 20,
    padding: 10,
    fontFamily: fonts.HURME_SEMIBOLD,
    borderBottomColor: colors.WHITE_ALPHA_50,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  validation: {
    alignSelf: 'flex-start',
    height: 20,
    color: colors.WHITE,
    fontFamily: fonts.OPENSANS_REGULAR,
    lineHeight: 20,
    marginBottom: 10,
    fontSize: 12,
  },
});
