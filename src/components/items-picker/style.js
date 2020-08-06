import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme';

export const main = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.BLACK_ALPHA_50,
  },
  pickerWrapper: {
    borderRadius: 10,
    margin: 10,
    marginBottom: 25,
    backgroundColor: colors.WHITE,
  },
  androidPickerWrapper: {
    height: 200,
    marginBottom: 10,
  },
  itemWrapper: {
    padding: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  itemName: {
    color: colors.BLUE,
    fontFamily: fonts.OPENSANS_REGULAR,
    fontSize: 18,
  },
  selectedItem: {
    fontFamily: fonts.OPENSANS_SEMIBOLD,
  },
  buttonsWrapper: {
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  closeButtonIcon: {},
  confirmButtonText: {
    color: colors.BLUE,
    fontFamily: fonts.OPENSANS_REGULAR,
  },
  continueButtonWrapper: {
    marginLeft: 20,
    marginRight: 20,
  },
  picker: {
    height: 230,
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
