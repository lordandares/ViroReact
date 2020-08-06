import { StyleSheet } from 'react-native';
import { metrics } from '../../theme/styleguide';

export const main = StyleSheet.create({
  container: {
    width: metrics.getScaledSize(50),
    height: metrics.getScaledSize(50),
    borderRadius: metrics.getScaledSize(25),
  },
});
