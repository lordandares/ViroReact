import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

const imageDiameter = metrics.getScaledSize(130);

export const main = StyleSheet.create({
  eventItem: {
    marginHorizontal: metrics.getScaledSize(5),
  },
  eventSliderItem: {
    width: Math.round(Dimensions.get('window').width - 80),
    paddingHorizontal: metrics.getScaledSize(5),
    marginRight: 0,
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    marginTop: metrics.getScaledSize(20),
    maxWidth: metrics.getScaledSize(130),
  },
  likesContainer: {
    marginTop: metrics.getScaledSize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesIcon: {
    height: metrics.getScaledSize(15),
    width: metrics.getScaledSize(15),
    resizeMode: 'contain',
  },
  iconContainer: {
    backgroundColor: colors.FANTASY,
    position: 'absolute',
  },
  iconContainerSmall: {
    width: metrics.getScaledSize(25),
    height: metrics.getScaledSize(25),
    bottom: metrics.getScaledSize(-8),
    right: metrics.getScaledSize(19),
    borderRadius: metrics.getScaledSize(25),
    borderWidth: metrics.getScaledSize(3),
    borderStyle: 'solid',
    borderColor: colors.WHITE,
  },
  iconContainerBig: {
    width: metrics.getScaledSize(45),
    height: metrics.getScaledSize(45),
    borderRadius: metrics.getScaledSize(45),
    right: metrics.getScaledSize(10),
    bottom: metrics.getScaledSize(-22),
  },
});

export const text = StyleSheet.create({
  title: {
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(17),
    lineHeight: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  likes: {
    marginLeft: metrics.getScaledSize(7),
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
  },
  price: {
    marginTop: metrics.getScaledSize(5),
    fontFamily: fonts.OPENSANS_SEMIBOLD,
    fontSize: metrics.getScaledSize(15),
    color: colors.GREY_DARK,
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

export const image = StyleSheet.create({
  round: {
    width: imageDiameter,
    height: imageDiameter,
    resizeMode: 'cover',
    borderRadius: imageDiameter / 2,
  },
  poster: {
    width: metrics.getScaledSize(140),
    height: metrics.getScaledSize(214),
    borderRadius: metrics.getScaledSize(10),
    resizeMode: 'cover',
  },
  rectangular: {
    width: Math.round(Dimensions.get('window').width - 90),
    height: metrics.getScaledSize(215),
    borderRadius: metrics.getScaledSize(10),
    resizeMode: 'cover',
  },
});
