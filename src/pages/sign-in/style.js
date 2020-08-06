import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.INSPIRE,
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: metrics.getScaledSize(110),
    height: metrics.deviceHeight * 0.35,
    maxHeight: metrics.getScaledSize(140),
    resizeMode: 'contain',
    marginTop: metrics.getScaledSize(40),
  },
  button: {
    marginTop: metrics.getScaledSize(30),
    marginBottom: metrics.getScaledSize(20),
  },
  form: {
    marginTop: metrics.getScaledSize(20),
    width: WINDOW_WIDTH - 80,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: metrics.getScaledSize(20),
    marginVertical: metrics.getScaledSize(15),
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginLeft: metrics.getScaledSize(20),
    marginTop: metrics.getScaledSize(20),
  },
});

export const text = StyleSheet.create({
  guest: {
    alignSelf: 'flex-end',
    marginRight: metrics.getScaledSize(40),
    color: colors.WHITE,
    marginTop: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(16),
  },
  forgotPassword: {
    color: colors.WHITE,
    marginTop: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(16),
  },
  dontHaveAccount: {
    marginRight: metrics.getScaledSize(20),
    color: colors.WHITE,
    fontFamily: fonts.OPENSANS_REGULAR,
    fontSize: metrics.getScaledSize(16),
  },
  signUp: {
    color: colors.WHITE,
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(16),
  },
});

export const background = StyleSheet.create({
  topShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ rotateX: '180deg' }],
  },
  bottomShape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{ rotateY: '180deg' }],
  },
});
