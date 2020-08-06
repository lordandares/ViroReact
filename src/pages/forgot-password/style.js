import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.FANTASY,
    paddingHorizontal: 30,
    paddingTop: 65,
    paddingBottom: 48,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 106,
    height: 136,
    resizeMode: 'contain',
    marginTop: 80,
    alignSelf: 'center',
  },
  lowerLogo: {
    marginTop: 0,
  },
  inputText: {
    width: '100%',
    color: colors.WHITE,
    fontSize: 17,
    fontFamily: fonts.HURME_SEMIBOLD,
    padding: 0,
    paddingBottom: 10,
    margin: 0,
  },
  buttonText: {
    color: colors.GREY_DARK,
    fontSize: 19,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  inputLabel: {
    color: colors.WHITE,
    fontSize: 11,
    lineHeight: 15,
    fontFamily: fonts.OPENSANS_REGULAR,
    marginBottom: 6,
  },
});

export const emailForm = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 85,
  },
});

export const passwordForm = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 23,
  },
  codeInput: {
    paddingHorizontal: 43,
  },
  passwordLabel: {
    marginTop: 36,
  },
  repeatPasswordLabel: {
    marginTop: 22,
  },
});

export const background = StyleSheet.create({
  topShape: {
    width: metrics.deviceWidth * 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ rotateX: '180deg' }],
  },
  bottomShape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
