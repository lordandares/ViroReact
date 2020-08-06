import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  page: {
    flex: 1,
  },
  card: {
    marginTop: metrics.getScaledSize(20),
  },
  cardContent: {
    marginHorizontal: metrics.getScaledSize(25),
    marginTop: metrics.getScaledSize(35),
    marginBottom: metrics.getScaledSize(35),
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.getScaledSize(30),
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.getScaledSize(15),
  },
  categoryContainer: {
    width: metrics.getScaledSize(65),
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.getScaledSize(45),
    height: metrics.getScaledSize(45),
    borderRadius: metrics.getScaledSize(45),
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    marginLeft: metrics.getScaledSize(10),
  },
});

export const text = StyleSheet.create({
  title: {
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(40),
    fontFamily: fonts.HURME_SEMIBOLD,
    marginTop: metrics.getScaledSize(65),
    marginHorizontal: metrics.getScaledSize(35),
  },
  cardTitle: {
    textAlignVertical: 'center',
    fontSize: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
    textAlign: 'center',
  },
  categoryTitle: {
    fontFamily: fonts.OPENSANS_REGULAR,
    marginTop: metrics.getScaledSize(5),
    textAlign: 'center',
    fontSize: metrics.getScaledSize(9),
  },
  textSearchTitle: {
    marginTop: metrics.getScaledSize(30),
    fontSize: metrics.getScaledSize(14),
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
    marginBottom: metrics.getScaledSize(15),
  },
  searchInput: {
    padding: metrics.getScaledSize(5),
    flex: 1,
    fontSize: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
    borderBottomColor: colors.GREY_MEDIUM,
    borderBottomWidth: 1,
  },
  noResultsMessage: {
    fontFamily: fonts.OPENSANS_REGULAR,
    marginTop: metrics.getScaledSize(10),
    fontSize: metrics.getScaledSize(10),
  },
  redColor: {
    color: colors.RED_DARKER,
  },
});
