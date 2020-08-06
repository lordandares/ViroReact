import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  background: {
    width: Dimensions.get('screen').width - 28,
    borderRadius: 25,
    backgroundColor: colors.WHITE,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 14,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
  },
});
