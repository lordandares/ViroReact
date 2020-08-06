import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  page: {
    backgroundColor: colors.EXPLORE,
    flex: 1,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  buttonsBar: {
    marginHorizontal: metrics.getScaledSize(30),
    marginTop: metrics.getScaledSize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  welcomeMessage: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingTop: metrics.getScaledSize(15),
  },
  notificationContainer: {
    flexDirection: 'row',
  },
  iconspace: {
    marginRight: metrics.getScaledSize(15),
  },
  navList: {
    paddingBottom: metrics.getScaledSize(23),
    paddingHorizontal: metrics.getScaledSize(35),
  },
  navtext: {
    paddingHorizontal: metrics.getScaledSize(16),
    paddingBottom: metrics.getScaledSize(1),
    marginHorizontal: metrics.getScaledSize(10),
    borderRadius: metrics.getScaledSize(20),
    borderWidth: metrics.getScaledSize(2),
    borderColor: colors.TRANSPARENT,
  },
  navtextActive: {
    borderColor: colors.WHITE,
  },
  card: {
    marginBottom: metrics.getScaledSize(100),
  },
  yourFestivitiesList: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingBottom: metrics.getScaledSize(45),
  },
  sliderList: {
    paddingBottom: metrics.getScaledSize(45),
  },
  divider: {
    width: metrics.getScaledSize(metrics.deviceWidth - 90),
    height: 1,
    backgroundColor: colors.GREY_MEDIUM,
    alignSelf: 'center',
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
});

export const text = StyleSheet.create({
  welcomeTo: {
    color: colors.WHITE,
  },
  appName: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(40),
    fontFamily: fonts.HURME_SEMIBOLD,
    marginTop: metrics.getScaledSize(35),
  },
  dates: {
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
});
