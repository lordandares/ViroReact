import { I18nManager } from 'react-native';

const fontsLTR = {
  ICONS: 'icons',
  HURME_SEMIBOLD: 'HurmeGeometricSans1-SemiBold',
  OPENSANS_REGULAR: 'OpenSans-Regular',
  OPENSANS_SEMIBOLD: 'OpenSans-SemiBold',
};

const fontsRTL = {
  ICONS: 'icons',
  HURME_SEMIBOLD: 'DINPro-Bold',
  OPENSANS_REGULAR: 'DINPro-Light',
  OPENSANS_SEMIBOLD: 'DINPro-Medium',
};

const getFonts = () => {
  if (I18nManager.isRTL) {
    return fontsRTL;
  }

  return fontsLTR;
};

const fonts = getFonts();
export default fonts;
