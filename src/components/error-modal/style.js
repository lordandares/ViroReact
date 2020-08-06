import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export const main = StyleSheet.create({
  errorModalContainer: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  errorModalCloseButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 15,
  },
  errorModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export const text = StyleSheet.create({
  errorModalTitle: {
    color: colors.RED_DARKER,
    fontFamily: fonts.OPENSANS_SEMIBOLD,
    fontSize: 18,
    marginTop: 10,
  },
  errorModalBody: {
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 50,
    textAlign: 'center',
  },
});
