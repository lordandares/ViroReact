import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import CustomHorizontalList from '../components/custom-horizontal-list/';
import colors from '../theme/colors';

const styleSheet = StyleSheet.create({
  divider: {
    width: Math.round(Dimensions.get('window').width - 90),
    height: 1,
    backgroundColor: colors.GREY_MEDIUM,
    alignSelf: 'center',
  },
});

export const renderCustomHorizontalList = (
  data,
  title,
  titleStyle,
  renderTitleActionButton,
  renderItem,
  listStyle,
  sliderLayout = false,
  showDivider = true
) => {
  if (data.size > 0) {
    return (
      <View>
        <CustomHorizontalList
          title={title}
          titleStyle={titleStyle}
          renderTitleActionButton={renderTitleActionButton}
          data={data}
          renderItem={renderItem}
          listStyle={listStyle}
          sliderLayout={sliderLayout}
        />

        {showDivider && <View style={styleSheet.divider} />}
      </View>
    );
  }
  return null;
};
