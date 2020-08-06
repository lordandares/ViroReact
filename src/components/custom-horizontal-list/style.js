import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    paddingTop: 50,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    width: Dimensions.get('window').width,
  },
});
