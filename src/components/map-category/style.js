import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  mapWrapper: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.EXPLORE,
  },
  titleHeader: {
    color: colors.WHITE,
    fontSize: 18,
    letterSpacing: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footer: {
    backgroundColor: colors.TRANSPARENT,
    paddingBottom: metrics.getScaledSize(50),
    position: 'absolute',
    bottom: 0,
  },
  footerBackground: {
    position: 'absolute',
    top: metrics.getScaledSize(45),
    left: 0,
  },
  slider: {
    overflow: 'visible',
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
});
