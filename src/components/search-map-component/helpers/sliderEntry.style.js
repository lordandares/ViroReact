import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../../../theme';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.2;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 3;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 22 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  rowcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 4,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: colors.WHITE,
    borderRadius: entryBorderRadius * 100,
    padding: 20,
  },
  imageContainerEven: {
    backgroundColor: colors.WHITE,
  },
  image: {
    borderRadius: IS_IOS ? 60 : viewportHeight * 5,
    overflow: 'hidden',
    borderWidth: IS_IOS ? 10 : 0,
    borderColor: colors.WHITE,
    height: 40,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: entryBorderRadius,
    backgroundColor: colors.WHITE,
  },
  radiusMaskEven: {
    backgroundColor: colors.BLACK,
  },
  textContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
  },
  textContainerCost: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
  },
  textContainerEven: {
    backgroundColor: colors.BLACK,
  },
  title: {
    color: colors.BLACK,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  row: {
    flexDirection: 'row',
  },
});
