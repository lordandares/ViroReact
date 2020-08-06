import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  page: {
    backgroundColor: colors.IMAGINE,
    flex: 1,
  },
  buttonsBar: {
    marginHorizontal: metrics.getScaledSize(30),
    marginTop: metrics.getScaledSize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  resultsMessageContainer: {
    paddingHorizontal: 45,
    paddingTop: 35,
  },
  card: {
    marginVertical: 35,
  },
  eventsList: {
    paddingHorizontal: 45,
    paddingBottom: 45,
  },
  divider: {
    width: Math.round(Dimensions.get('window').width - 90),
    height: 1,
    backgroundColor: colors.GREY_MEDIUM,
    alignSelf: 'center',
  },
});

export const text = StyleSheet.create({
  resultsMessage: {
    color: colors.WHITE,
    fontSize: 40,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  queryMessage: {
    marginTop: 5,
    color: colors.WHITE,
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  eventsListTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
});
