import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.INSPIRE,
  },
  contentContainer: {
    flex: 1,
    paddingTop: metrics.deviceHeight * 0.25,
  },
  logo: {
    width: metrics.getScaledSize(150),
    height: metrics.getScaledSize(225),
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: metrics.deviceWidth,
    paddingHorizontal: metrics.getScaledSize(40),
    position: 'absolute',
    bottom: metrics.getScaledSize(50),
    left: 0,
  },
});

export const text = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: colors.WHITE,
    marginTop: metrics.getScaledSize(10),
    marginHorizontal: metrics.getScaledSize(30),
    fontSize: metrics.getScaledSize(18),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.WHITE,
    marginTop: metrics.getScaledSize(10),
    marginHorizontal: metrics.getScaledSize(28),
    fontFamily: fonts.OPENSANS_REGULAR,
  },
});

export const background = StyleSheet.create({
  topShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }],
  },
  bottomShape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{ rotateY: '180deg' }],
  },
});
