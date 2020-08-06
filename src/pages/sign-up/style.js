import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
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
  closeButtonContainer: {
    position: 'absolute',
    top: metrics.getScaledSize(40),
    left: metrics.getScaledSize(30),
  },
  logo: {
    width: metrics.getScaledSize(78),
    height: metrics.getScaledSize(99),
    resizeMode: 'contain',
    marginTop: metrics.getScaledSize(10),
  },
  button: {
    marginTop: metrics.getScaledSize(30),
    marginBottom: metrics.getScaledSize(15),
  },
  form: {
    marginTop: metrics.getScaledSize(20),
    width: WINDOW_WIDTH - 80,
    alignItems: 'center',
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
