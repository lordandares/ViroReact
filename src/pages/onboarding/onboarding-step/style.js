import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import { metrics } from '../../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.INSPIRE,
  },
  contentContainer: {
    alignItems: 'center',
  },
  buttonsBar: {
    marginHorizontal: metrics.getScaledSize(30),
    marginTop: metrics.getScaledSize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  image: {
    marginTop: metrics.getScaledSize(10),
    width: metrics.getScaledSize(300),
    height: metrics.deviceHeight * 0.35,
    maxHeight: metrics.getScaledSize(300),
    resizeMode: 'contain',
  },
  buttonContainer: {
    paddingVertical: metrics.getScaledSize(30),
    paddingHorizontal: metrics.getScaledSize(40),
  },
  dotsPageIndicator: {
    marginTop: metrics.getScaledSize(15),
  },
});

export const text = StyleSheet.create({
  skip: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(17),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  title: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(24),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  subtitle: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(16),
    marginTop: metrics.getScaledSize(15),
    textAlign: 'center',
    marginHorizontal: metrics.getScaledSize(62),
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  body: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(14),
    marginTop: metrics.getScaledSize(15),
    textAlign: 'center',
    marginHorizontal: metrics.getScaledSize(20),
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  button: {
    fontSize: metrics.getScaledSize(14),
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
