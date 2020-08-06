import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export const main = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.FANTASY,
  },
  container: {
    paddingHorizontal: metrics.getScaledSize(45),
  },
  card: {
    marginTop: metrics.deviceHeight * 0.6,
    paddingBottom: metrics.getScaledSize(50),
    marginBottom: metrics.getScaledSize(100),
  },
  backgroundImage: {
    width: metrics.deviceWidth,
    height: metrics.deviceHeight * 0.9,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  divider: {
    width: metrics.deviceWidth - 90,
    height: 1,
    marginBottom: metrics.getScaledSize(45),
    alignSelf: 'center',
    backgroundColor: colors.GREY_MEDIUM,
  },
  heading: {
    color: colors.GREY_DARK,
    marginBottom: metrics.getScaledSize(37),
  },
  mapWrapper: {
    paddingHorizontal: metrics.getScaledSize(15),
    paddingVertical: metrics.getScaledSize(25),
  },
  map: {
    width: metrics.deviceWidth - 30,
    height: metrics.deviceWidth - 30,
    backgroundColor: colors.GREY_MEDIUM,
  },
  yourFestivitiesList: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingBottom: metrics.getScaledSize(45),
  },
});

export const header = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.getScaledSize(45),
    paddingVertical: metrics.getScaledSize(32),
  },
  logo: {
    width: metrics.getScaledSize(50),
    height: metrics.getScaledSize(47),
    resizeMode: 'contain',
  },
  category: {
    color: colors.GREY_MEDIUM,
    paddingTop: metrics.getScaledSize(10),
    paddingBottom: metrics.getScaledSize(5),
  },
  title: {
    color: colors.FANTASY,
    lineHeight: metrics.getScaledSize(45),
  },
  locationContainer: {
    position: 'absolute',
    top: metrics.getScaledSize(-32),
    right: metrics.getScaledSize(45),
  },
  locationIcon: {
    width: metrics.getScaledSize(65),
    height: metrics.getScaledSize(65),
    marginBottom: metrics.getScaledSize(12),
    borderRadius: metrics.getScaledSize(32),
    backgroundColor: colors.FANTASY,
    elevation: 5,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  locationText: {
    maxWidth: metrics.getScaledSize(95),
    color: colors.GREY_DARK,
    textAlign: 'center',
  },
  likesIcon: {
    marginRight: metrics.getScaledSize(9),
  },
  rateIcon: {
    marginLeft: metrics.getScaledSize(16),
    marginRight: metrics.getScaledSize(9),
  },
  likesText: {
    color: colors.GREY_DARK,
  },
  body: {
    paddingTop: metrics.getScaledSize(23),
    paddingBottom: metrics.getScaledSize(16),
  },
});

export const slider = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.getScaledSize(45),
  },
  image: {
    width: metrics.getScaledSize(130),
    height: metrics.getScaledSize(175),
    borderRadius: metrics.getScaledSize(10),
    marginRight: metrics.getScaledSize(15),
    resizeMode: 'cover',
  },
  index: {
    color: colors.GREY_MEDIUM,
    paddingVertical: metrics.getScaledSize(13),
  },
});

export const eventInfo = StyleSheet.create({
  heading: {
    color: colors.FANTASY,
    paddingTop: metrics.getScaledSize(20),
    paddingBottom: metrics.getScaledSize(10),
  },
  textEmphasis: {
    fontFamily: fonts.OPENSANS_SEMIBOLD,
  },
  textRegular: {
    color: colors.GREY_DARK,
    lineHeight: metrics.getScaledSize(25),
  },
  column: {
    paddingRight: metrics.getScaledSize(20),
  },
  link: {
    marginRight: metrics.getScaledSize(8),
    paddingTop: 0,
    paddingBottom: 0,
  },
  gateTickets: {
    marginTop: metrics.getScaledSize(13),
  },
  linkKiosk: {
    marginTop: metrics.getScaledSize(35),
  },
});

export const bullet = StyleSheet.create({
  icon: {
    width: metrics.getScaledSize(3),
    height: metrics.getScaledSize(3),
    borderRadius: metrics.getScaledSize(3),
    position: 'absolute',
    top: metrics.getScaledSize(11),
    left: metrics.getScaledSize(-11),
    backgroundColor: colors.GREY_DARK,
  },
});

export const navigator = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: metrics.getScaledSize(27),
    left: 0,
    paddingHorizontal: metrics.getScaledSize(30),
  },
  backIcon: {
    width: metrics.getScaledSize(30),
    height: metrics.getScaledSize(30),
    borderRadius: metrics.getScaledSize(15),
    backgroundColor: colors.WHITE,
  },
});

export const actionBtns = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: metrics.getScaledSize(53),
    bottom: metrics.getScaledSize(25),
  },
  buttonWrapper: {
    marginTop: metrics.getScaledSize(8),
  },
  button: {
    width: metrics.getScaledSize(50),
    height: metrics.getScaledSize(50),
    borderRadius: metrics.getScaledSize(25),
    backgroundColor: colors.WHITE,
    elevation: 2,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
  },
});

export const sponsors = StyleSheet.create({
  wrapper: {
    paddingTop: metrics.getScaledSize(10),
  },
  list: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  item: {
    width: metrics.getScaledSize(70),
    height: metrics.getScaledSize(45),
    marginBottom: metrics.getScaledSize(40),
    marginHorizontal: metrics.getScaledSize(10),
    resizeMode: 'contain',
  },
});
