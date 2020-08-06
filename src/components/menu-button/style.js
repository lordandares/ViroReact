import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../../theme';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: metrics.getScaledSize(50),
  },
  mainCircularBg: {
    width: metrics.getScaledSize(60),
    height: metrics.getScaledSize(60),
    borderRadius: metrics.getScaledSize(30),
    backgroundColor: colors.WHITE,
  },
  mainCircularButton: {
    width: metrics.getScaledSize(60),
    height: metrics.getScaledSize(60),
    borderRadius: metrics.getScaledSize(30),
    backgroundColor: colors.WHITE,
    shadowColor: colors.GREY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mainCircularCloseButton: {
    position: 'relative',
    alignSelf: 'center',
    width: metrics.getScaledSize(60),
    height: metrics.getScaledSize(60),
    borderRadius: metrics.getScaledSize(30),
    backgroundColor: colors.WHITE,
    shadowColor: colors.GREY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    top: Dimensions.get('window').height - 100,
    zIndex: 5,
  },
  menuContainer: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, // - 100,
    backgroundColor: colors.WHITE,
  },
  menuHeaderWrapper: {
    marginTop: metrics.getScaledSize(30),
    // height: '30%',
    flexDirection: 'row',
  },
  menuSettingsWrapper: {
    flexDirection: 'column',
    marginLeft: metrics.getScaledSize(30),
    marginTop: metrics.getScaledSize(50),
    alignItems: 'center',
  },
  settingsText: {
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
    textAlign: 'center',
    fontSize: metrics.getScaledSize(12),
    marginTop: metrics.getScaledSize(4),
  },
  menuTitleText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY_DARK,
    textAlign: 'center',
    fontSize: metrics.getScaledSize(14),
    marginHorizontal: metrics.getScaledSize(20),
    marginTop: metrics.getScaledSize(15),
  },
  logoImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.getScaledSize(60),
    marginBottom: metrics.getScaledSize(30),
  },
  menuLogo: {
    width: metrics.getScaledSize(218 / 2.5),
    height: metrics.getScaledSize(201 / 2.5),
    resizeMode: 'contain',
    marginTop: metrics.getScaledSize(60),
    marginBottom: metrics.getScaledSize(15),
  },
  slideWrapper: {
    width: Dimensions.get('window').width - 80,
    height: metrics.getScaledSize(400),
  },
  slide: {
    flex: 1,
    borderRadius: metrics.getScaledSize(20),
    alignContent: 'center',
    justifyContent: 'flex-end',
    padding: metrics.getScaledSize(20),
    marginHorizontal: metrics.getScaledSize(10),
    marginTop: metrics.getScaledSize(30),
  },
  slideIndexText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(14),
    marginBottom: metrics.getScaledSize(10),
  },
  slideTitleText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(36),
    marginBottom: metrics.getScaledSize(8),
  },
  slideSubTitleText: {
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.WHITE,
    fontSize: metrics.getScaledSize(14),
    marginBottom: metrics.getScaledSize(15),
  },
  slideCover: {
    width: 0.35,
    height: 1,
    borderRadius: 0.1,
    top: '50%',
    alignSelf: 'center',
    position: 'absolute',
    // backgroundColor: colors.BLACK,
    // zIndex: -100,
  },
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
