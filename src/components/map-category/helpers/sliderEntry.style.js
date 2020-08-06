import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../theme';
import { metrics } from '../../../theme/styleguide';

export const sliderWidth = metrics.deviceWidth;
export const itemWidth = metrics.deviceWidth - 30;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideOuterContainer: {
    width: itemWidth,
    paddingHorizontal: metrics.getScaledSize(4),
  },
  slideInnerContainer: {
    paddingHorizontal: metrics.getScaledSize(15),
    paddingVertical: metrics.getScaledSize(20),
    borderRadius: metrics.getScaledSize(10),
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 22 },
    shadowRadius: 10,
    elevation: 5,
  },
  rowcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderRadius: entryBorderRadius,
  },
  image: {
    width: metrics.getScaledSize(86),
    height: metrics.getScaledSize(86),
    borderRadius: metrics.getScaledSize(43),
    marginRight: metrics.getScaledSize(17),
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(13),
    fontFamily: fonts.HURME_SEMIBOLD,
    marginBottom: metrics.getScaledSize(6),
  },
  textLikes: {
    fontSize: metrics.getScaledSize(15),
    fontFamily: fonts.OPENSANS_REGULAR,
    marginLeft: metrics.getScaledSize(8),
  },
  zone: {
    fontSize: metrics.getScaledSize(11),
    color: colors.GREY_MEDIUM_2,
    fontFamily: fonts.OPENSANS_REGULAR,
    marginTop: metrics.getScaledSize(10),
  },
  venue: {
    fontSize: metrics.getScaledSize(11),
    color: colors.GREY_DARK,
    fontFamily: fonts.OPENSANS_REGULAR,
    marginBottom: metrics.getScaledSize(9),
  },
});
