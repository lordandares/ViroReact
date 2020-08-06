import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const main = StyleSheet.create({
  mapWrapper: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    // width: 25,
    // height: 25,
    backgroundColor: colors.RED,
  },
});
