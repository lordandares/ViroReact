import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.TASTE,
  },
  closeButtonContainer: {
    // position: 'absolute',
    marginTop: metrics.getScaledSize(20),
    marginLeft: metrics.getScaledSize(20),
  },
  card: {
    marginTop: metrics.getScaledSize(20),
  },
  cardContainer: {
    margin: metrics.getScaledSize(30),
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: metrics.getScaledSize(100),
    height: metrics.getScaledSize(100),
    padding: metrics.getScaledSize(25),
    marginBottom: metrics.getScaledSize(20),
    borderRadius: metrics.getScaledSize(100),
    alignSelf: 'center',
    backgroundColor: colors.GREY_LIGHT,
  },
  cardTextWrapper: {
    marginHorizontal: metrics.getScaledSize(30),
  },
  cardButtonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: metrics.getScaledSize(20),
  },

  settingsContentWrapper: {
    marginHorizontal: metrics.getScaledSize(35),
  },
  contentTitleWrapper: {
    marginTop: 30,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.WHITE,
  },
  line: {
    width: '100%',
    height: 1,
    marginVertical: metrics.getScaledSize(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.WHITE,
  },

  /* SWITCH */
  switchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.getScaledSize(10),
  },
  iconWeapper: {
    flex: 0.3,
  },
  switchBodyWrapper: {
    flex: 1,
  },
  switchButtonyWrapper: {
    flex: 0.3,
  },

  logOutButton: {
    marginVertical: metrics.getScaledSize(30),
  },
});

export const texts = StyleSheet.create({
  cardTitleText: {
    fontSize: metrics.getScaledSize(20),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
  cardSubtitleText: {
    fontSize: metrics.getScaledSize(16),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
  },
  cardBodyText: {
    fontSize: metrics.getScaledSize(14),
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
    marginTop: metrics.getScaledSize(10),
  },
});
