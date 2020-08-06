import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.GREY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
