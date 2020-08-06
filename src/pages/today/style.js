import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    backgroundColor: colors.FANTASY,
    flex: 1,
  },
  loader: {
    width: metrics.getScaledSize(300),
    height: metrics.getScaledSize(300),
    resizeMode: 'contain',
  },
  welcomeMessage: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingTop: metrics.getScaledSize(15),
  },
  card: {
    marginTop: metrics.getScaledSize(35),
    marginBottom: metrics.getScaledSize(100),
  },
  yourFestivitiesList: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingBottom: metrics.getScaledSize(45),
  },
  sliderList: {
    paddingBottom: metrics.getScaledSize(45),
  },
  headerWeather: {
    color: colors.WHITE,
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(13),
    marginLeft: metrics.getScaledSize(10),
  },
  headerDate: {
    color: colors.WHITE,
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(17),
    marginTop: metrics.getScaledSize(5),
  },
  notificationBubble: {
    width: metrics.getScaledSize(23),
    height: metrics.getScaledSize(23),
    borderRadius: metrics.getScaledSize(23),
    position: 'absolute',
    right: metrics.getScaledSize(-13),
    bottom: metrics.getScaledSize(-4),
    backgroundColor: colors.WHITE,
  },
  notificationText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(13),
    color: colors.GREY_DARK,
    textAlign: 'center',
  },
  errorModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingTop: metrics.getScaledSize(30),
    paddingHorizontal: metrics.getScaledSize(20),
    marginHorizontal: metrics.getScaledSize(30),
    borderRadius: metrics.getScaledSize(10),
  },
});

export const text = StyleSheet.create({
  welcomeTo: {
    color: colors.WHITE,
  },
  appName: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(40),
    fontFamily: fonts.HURME_SEMIBOLD,
    marginTop: metrics.getScaledSize(65),
    lineHeight: metrics.getScaledSize(42),
  },
  dates: {
    marginTop: metrics.getScaledSize(5),
    color: colors.WHITE,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  yourFestivitiesTitle: {
    fontSize: metrics.getScaledSize(20),
    lineHeight: metrics.getScaledSize(25),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
  seeAll: {
    color: colors.FANTASY,
    fontFamily: fonts.HURME_SEMIBOLD,
    fontSize: metrics.getScaledSize(13),
    marginRight: metrics.getScaledSize(8),
  },
  errorModalTitle: {
    color: colors.RED_DARKER,
    fontFamily: fonts.OPENSANS_SEMIBOLD,
    fontSize: metrics.getScaledSize(18),
    marginTop: metrics.getScaledSize(15),
  },
  errorModalBody: {
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(16),
    marginTop: metrics.getScaledSize(10),
    textAlign: 'center',
  },
  errorModalButtonText: {
    fontFamily: fonts.OPENSANS_SEMIBOLD,
    color: colors.RED_DARKER,
    fontSize: metrics.getScaledSize(16),
    paddingTop: metrics.getScaledSize(30),
    paddingHorizontal: metrics.getScaledSize(30),
    paddingBottom: metrics.getScaledSize(30),
    textAlign: 'center',
  },
});
