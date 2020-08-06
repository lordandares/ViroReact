import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const main = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.INSPIRE,
  },
  contentContainer: {
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  logo: {
    width: 78,
    height: 99,
    resizeMode: 'contain',
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
  },
  form: {
    marginTop: 20,
    width: WINDOW_WIDTH - 80,
    alignItems: 'center',
  },
});
