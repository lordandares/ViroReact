import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { text as formInputTextStyle } from '../form-text-input/style';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const main = StyleSheet.create({
  pickerInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WINDOW_WIDTH - 80,
    borderBottomColor: colors.WHITE_ALPHA_50,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  container: {
    flex: 1,
  },
});

export const text = StyleSheet.create({
  pickerInput: {
    color: colors.WHITE,
    fontSize: 20,
    padding: 10,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  validation: formInputTextStyle.validation,
  placeholderColor: {
    color: colors.WHITE_ALPHA_50,
  },
});
