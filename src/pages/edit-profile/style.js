import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const main = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.TASTE,
  },
  closeButtonContainer: {
    // position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
  },
  card: {
    marginTop: 20,
  },
  cardContainer: {
    margin: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    padding: 25,
    marginBottom: 20,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: colors.GREY_LIGHT,
  },
  cardTextWrapper: {
    marginHorizontal: 30,
  },
  cardButtonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },

  settingsContentWrapper: {
    marginHorizontal: 35,
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
    marginVertical: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.WHITE,
  },

  formWrapper: {
    marginTop: 40,
  },
  passwordWrapper: {
    marginTop: 30,
  },
  deleteAccountButton: {
    marginTop: 30,
  },
});

export const texts = StyleSheet.create({
  inputLabel: {
    fontSize: 13,
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.WHITE,
  },
  deleteAccountButtonText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.RED_DARKER,
  },
  // cardBodyText: {
  //   fontSize: 14,
  //   fontFamily: fonts.OPENSANS_REGULAR,
  //   color: colors.GREY_DARK,
  //   textAlign: 'center',
  //   marginTop: 10,
  // },
  // cardButtonText: {
  //   fontSize: 15,
  //   fontFamily: fonts.HURME_SEMIBOLD,
  //   color: colors.GREY_DARK,
  //   marginHorizontal: 10,
  // },
  // contentTitleText: {
  //   fontSize: 20,
  //   fontFamily: fonts.HURME_SEMIBOLD,
  //   color: colors.WHITE,
  // },
});

/*
 Some common Styling Cheat Sheet:

 alignItems: flex-start, flex-end, center, stretch
 alignSelf: auto, flex-start, flex-end, center, stretch
 flexDirection: row, row-reverse, column, column-reverse
 justifyContent: flex-start, flex-end, center, space-between, space-around
 flexWrap: wrap, nowrap
 position: absolute, relative
 paddingHorizontal: number
 paddingVertical: number
 marginHorizontal: number
 marginVertical: number

 textAlign: auto, left, right, center, justify
 textAlignVertical: auto, top, bottom, center

 backfaceVisibility: visible, hidden
 resizeMode: cover, contain, stretch, repeat, center
 
 */
