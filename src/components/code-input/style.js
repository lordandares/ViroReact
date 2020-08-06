import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const main = StyleSheet.create({
  container: {
    width: '100%',
    height: 71,
    alignItems: 'center',
  },
  titleText: {
    color: colors.WHITE,
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.HURME_SEMIBOLD,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0,
  },
  characterContainer: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  characterBox: {
    width: 28,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterUnderline: {
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
  },
  character: {
    color: colors.WHITE,
    fontSize: 25,
    lineHeight: 29,
    fontFamily: fonts.HURME_SEMIBOLD,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.WHITE,
    opacity: 0.2,
    marginTop: 18,
  },
});
