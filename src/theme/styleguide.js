import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import fonts from './fonts';
import colors from './colors';
import categoryMapIcons from '../components/map-category/helpers/icons';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('screen');
const designWidth = 375;
const scaleCoefficient = deviceWidth / designWidth;

const getScaledSize = value => Math.round(value * scaleCoefficient);
const moderateScale = (size, factor = 0.5) => size + (getScaledSize(size) - size) * factor;
const nativeTopBarHeight = () => {
  if (Platform.OS === 'ios') {
    if (DeviceInfo.hasNotch()) {
      return moderateScale(86);
    }
    return moderateScale(63);
  }
  return moderateScale(70);
};
export const metrics = {
  deviceHeight,
  deviceWidth,
  getScaledSize,
  nativeTopBarHeight: nativeTopBarHeight(),
};

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rtlReverseFix: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
});

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: getScaledSize(40),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  h3: {
    fontSize: getScaledSize(17),
    fontFamily: fonts.HURME_SEMIBOLD,
    color: colors.GREY,
  },
  smallHeading: {
    fontSize: getScaledSize(13),
    fontFamily: fonts.HURME_SEMIBOLD,
  },
  bodyMedium: {
    fontSize: getScaledSize(15),
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  bodySmall: {
    fontSize: getScaledSize(13),
    fontFamily: fonts.OPENSANS_REGULAR,
  },
});

export const htmlStyles = StyleSheet.create({
  h1: {},
  p: {
    fontSize: getScaledSize(13),
    fontFamily: fonts.OPENSANS_REGULAR,
    color: colors.GREY_DARK,
  },
  span: {
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  a: {
    color: colors.FANTASY,
    textDecorationLine: 'underline',
  },
  b: {
    fontFamily: fonts.OPENSANS_SEMIBOLD,
  },
  ul: {},
  li: {},
});

export const layerStyles = icon => {
  return {
    iconImage: categoryMapIcons[icon + 1],
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    iconSize: 0.5,
  };
};
