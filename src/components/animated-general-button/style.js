import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const HEIGHT = 50;

export const main = StyleSheet.create({
  touchable: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    alignSelf: 'center',
  },
  circularTouchable: {
    width: HEIGHT,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: colors.GREY_DARK,
  },
});
