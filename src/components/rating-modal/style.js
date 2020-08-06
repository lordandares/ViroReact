import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const main = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: colors.WHITE,
    paddingLeft: 45,
    paddingRight: 30,
    paddingTop: 43,
    paddingBottom: 31,
  },
  closeButton: {
    shadowColor: colors.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'absolute',
    right: 30,
    top: 27,
    zIndex: 100,
  },
  starsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  star: {
    marginRight: 8,
  },
  lastStar: {
    marginRight: 0,
  },
  button: {
    marginTop: 20,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.07,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  errorContainer: {
    height: 35,
    justifyContent: 'flex-end',
  },
});

export const text = StyleSheet.create({
  titleText: {
    color: colors.GREY_DARK,
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  messageText: {
    color: colors.GREY_DARK,
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.OPENSANS_REGULAR,
    maxWidth: 220,
    marginTop: 11,
  },
  errorMessage: {
    color: colors.FANTASY_DARK,
    fontSize: 14,
    fontFamily: fonts.OPENSANS_REGULAR,
    textAlign: 'center',
  },
});
