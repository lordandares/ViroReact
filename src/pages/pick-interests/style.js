import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fonts, colors } from '../../theme';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: metrics.getScaledSize(50),
    paddingHorizontal: metrics.getScaledSize(30),
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
    alignContent: 'center',
  },
  tagItemWrapper: {
    marginHorizontal: metrics.getScaledSize(4),
  },
  closeButton: {
    shadowColor: colors.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  titleText: {
    fontSize: metrics.getScaledSize(13),
    fontFamily: fonts.HURME_SEMIBOLD,
    lineHeight: metrics.getScaledSize(16),
    color: colors.GREY_DARK,
    marginTop: DeviceInfo.hasNotch() ? metrics.getScaledSize(10) : 0,
    marginBottom: metrics.getScaledSize(20),
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    shadowColor: colors.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  buttonText: {
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(19),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  skipButton: {
    marginBottom: metrics.getScaledSize(32),
    marginTop: metrics.getScaledSize(25),
    alignSelf: 'center',
  },
  skipText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(13),
  },
  headerContainer: {
    position: 'absolute',
    top: metrics.getScaledSize(50),
    left: 0,
    width: metrics.deviceWidth,
  },
  buttonsContainer: {
    paddingTop: metrics.getScaledSize(100),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: metrics.deviceWidth,
    paddingHorizontal: metrics.getScaledSize(20),
  },
  scroll: {
    marginBottom: metrics.getScaledSize(100),
  },
  scrollContainer: {
    paddingVertical: metrics.getScaledSize(100),
  },
});
