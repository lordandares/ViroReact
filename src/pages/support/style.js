import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const main = StyleSheet.create({
  map: {
    flex: 1,
    width: 500,
    height: 500,
    opacity: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
    opacity: 1,
  },
  tagsContainer: {
    marginTop: 100,
    justifyContent: 'center',
  },
  tagsInput: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
  },
  tagTextWrapper: {
    backgroundColor: colors.WHITE_ALPHA_80,
    borderRadius: 10,
    margin: 5,
  },
  tagText: {
    padding: 10,
    fontFamily: fonts.OPENSANS_REGULAR,
  },
});

/*
 Some common Styling Cheat Sheet:

 alignItems: flex-start, flex-end, center, stretch
 alignSelf: auto, flex-start, flex-end, center, stretch
 flexDirection: row, row-reverse, column, column-reverse
 justifyContent: flex-start, flex-end, center, space-between, space-around
 flexWrap: wrap, nowrap
 position: absolute, relative
 paddingHorizontal: number
 paddingVertical: number
 marginHorizontal: number
 marginVertical: number

 textAlign: auto, left, right, center, justify
 textAlignVertical: auto, top, bottom, center

 backfaceVisibility: visible, hidden
 resizeMode: cover, contain, stretch, repeat, center
 
 */
