import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const main = StyleSheet.create({
  mapWrapper: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    backgroundColor: colors.RED,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
  },
  titleHeader: {
    color: colors.WHITE,
    fontSize: 18,
    letterSpacing: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mapContent: {
    flex: 10,
  },
  footer: {
    backgroundColor: colors.TRANSPARENT,
    position: 'absolute',
    flex: 6,
    marginTop: viewportHeight * 0.85,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: colors.TRANSPARENT,
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: viewportWidth * 2,
    borderBottomWidth: 100,
    borderLeftColor: colors.TRANSPARENT,
    borderRightColor: colors.TRANSPARENT,
    borderBottomColor: colors.BLUE,
  },
  footerSlide: {
    backgroundColor: colors.TRANSPARENT,
    position: 'absolute',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: viewportHeight * 0.75,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 0,
  },
  exampleContainerDark: {
    backgroundColor: colors.BLACK,
  },
  exampleContainerLight: {
    backgroundColor: colors.WHITE,
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: colors.TRANSPARENT,
    color: colors.BLACK_ALPHA_90,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.BLACK,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: colors.TRANSPARENT,
    color: colors.BLACK_ALPHA_90,
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 0,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 2,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
