import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.JOY,
  },
  page: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingTop: metrics.getScaledSize(15),
  },
  headerBtn: {
    marginRight: metrics.getScaledSize(15),
  },
  yourFestivitiesList: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingBottom: metrics.getScaledSize(45),
  },
  buttonsBar: {
    marginHorizontal: metrics.getScaledSize(30),
    marginTop: metrics.getScaledSize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: metrics.getScaledSize(30),
  },
  card: {
    marginVertical: metrics.getScaledSize(35),
  },
  emptyCard: {
    paddingTop: metrics.getScaledSize(26),
    paddingBottom: metrics.getScaledSize(30),
    paddingHorizontal: metrics.getScaledSize(40),
  },
  emptyIconContainer: {
    width: metrics.getScaledSize(80),
    height: metrics.getScaledSize(80),
    borderRadius: metrics.getScaledSize(40),
    backgroundColor: colors.GREY_LIGHT,
    marginBottom: metrics.getScaledSize(8),
  },
  seeAllChevron: {
    marginTop: metrics.getScaledSize(17),
  },
  divider: {
    width: metrics.getScaledSize(metrics.deviceWidth - 90),
    height: 1,
    backgroundColor: colors.GREY_MEDIUM,
    alignSelf: 'center',
  },
  festivitiesList: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingBottom: metrics.getScaledSize(45),
  },
  rectangularList: {
    paddingBottom: metrics.getScaledSize(45),
  },
});

export const text = StyleSheet.create({
  headerTitle: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(40),
    fontFamily: fonts.HURME_SEMIBOLD,
    marginTop: metrics.getScaledSize(65),
  },
  emptyTitle: {
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(20),
    lineHeight: metrics.getScaledSize(22),
    marginTop: metrics.getScaledSize(7),
    fontFamily: fonts.HURME_SEMIBOLD,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.GREY_DARK,
    fontSize: metrics.getScaledSize(13),
    lineHeight: metrics.getScaledSize(20),
    fontFamily: fonts.OPENSANS_REGULAR,
    textAlign: 'center',
  },
  festivitiesTitle: {
    fontSize: metrics.getScaledSize(20),
    lineHeight: metrics.getScaledSize(25),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
  yourFestivitiesTitle: {
    fontSize: metrics.getScaledSize(20),
    lineHeight: metrics.getScaledSize(25),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
});
