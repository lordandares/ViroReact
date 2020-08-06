import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, TouchableOpacity, LayoutAnimation, View } from 'react-native';
import { main, text } from './style';
import categories from '../../enum/CategoriesEnum';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';

/**
 * Description
 * @author ?
 * @class NavHorizontalCategories
 */
const NavHorizontalCategories = props => {
  const categoriesList = Object.keys(categories);
  const { layoutstate, setlayoutstate } = props;
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={main.navList}
    >
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setlayoutstate('0');
        }}
      >
        <View style={[main.navtext, layoutstate === '0' && main.navtextActive]}>
          <Text style={text.dates}>{translate(TranslationEnum.ALL)}</Text>
        </View>
      </TouchableOpacity>
      {categoriesList.map(x => (
        <TouchableOpacity
          key={categories[x].id}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setlayoutstate(categories[x].id);
          }}
        >
          <View style={[main.navtext, categories[x].id === layoutstate && main.navtextActive]}>
            <Text style={text.dates}>{translate(TranslationEnum[x])}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

NavHorizontalCategories.propTypes = {
  layoutstate: PropTypes.any.isRequired,
  setlayoutstate: PropTypes.func.isRequired,
};
NavHorizontalCategories.defaultProps = {};

export default NavHorizontalCategories;
