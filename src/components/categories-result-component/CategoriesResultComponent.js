import React from 'react';
import { Map } from 'immutable';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { main, text } from './style';
import AbsolutePositioningCard from '../../components/absolute-positioning-card';
import EventItem from '../../components/event-item';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import CustomHorizontalList from '../../components/custom-horizontal-list/';
import categories from '../../enum/CategoriesEnum';
import BackButton from '../back-button/';
import BackgroundDecorator from '../background-decorator/';
import { colors } from '../../theme';
import Pages from '../../enum/Pages';

export const CategoriesResultComponent = props => {
  const { searchQuery, searchResults } = props;
  const categoriesList = Object.keys(categories);
  const totalResults = categoriesList
    .map(x => searchResults[categories[x].id])
    .reduce((x, y) => x + (y.size || 0), 0);

  const _renderResultsMessage = () => {
    return (
      <View style={main.resultsMessageContainer}>
        <Text style={[text.resultsMessage]}>
          {translate(TranslationEnum.SEARCH_CATEGORY_RESULT_TITLE, { number: totalResults })}
        </Text>
        <Text style={text.queryMessage}>
          {!!searchQuery &&
            translate(TranslationEnum.SEARCH_CATEGORY_RESULT_SUBTITLE, { name: searchQuery })}
        </Text>
      </View>
    );
  };

  const _renderCustomHorizontalList = (
    data,
    id,
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
        <View key={id}>
          <CustomHorizontalList
            title={title}
            titleStyle={titleStyle}
            renderTitleActionButton={renderTitleActionButton}
            data={data}
            renderItem={renderItem}
            listStyle={listStyle}
            sliderLayout={sliderLayout}
          />

          {showDivider && <View style={main.divider} />}
        </View>
      );
    }
    return null;
  };

  const navigateToEventDetails = event => {
    const { setSelectedEventId, componentId } = props;
    setSelectedEventId(event.id);
    return Navigation.push(componentId, {
      component: {
        name: Pages.ARTICLE_DETAIL,
        passProps: {
          themeColor: 'IMAGINE',
        },
      },
    });
  };

  // eslint-disable-next-line react/prop-types
  const renderEventItem = ({ item, imageShape = 'round' }) => {
    const { venues } = props;
    return (
      <EventItem
        onPress={() => navigateToEventDetails(item)}
        festivity={item}
        imageShape={imageShape}
        venues={venues}
      />
    );
  };

  const renderNearFestivitiesIcon = () => null;

  const onBackButtonPress = () => Navigation.pop(props.componentId);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={main.page}>
      <BackgroundDecorator
        backgroundColor={colors.IMAGINE}
        middleShapeColor={colors.IMAGINE_DARK}
        contentShapeColor={colors.SPEED}
        componentId={props.componentId}
        currentComponentId={props.currentComponentId}
      >
        <View style={main.buttonsBar}>
          <BackButton onPress={onBackButtonPress} />
          {/* <Icon name="MARKER_FILL" color={colors.WHITE} size={30} /> */}
        </View>

        {_renderResultsMessage()}
        <AbsolutePositioningCard style={main.card}>
          {categoriesList.map(c =>
            _renderCustomHorizontalList(
              searchResults[categories[c].id],
              categories[c].id,
              translate(TranslationEnum[c]),
              text.eventsListTitle,
              renderNearFestivitiesIcon,
              ({ item }) => renderEventItem({ item, imageShape: 'poster' }),
              main.eventsList
            )
          )}
        </AbsolutePositioningCard>
      </BackgroundDecorator>
    </ScrollView>
  );
};

CategoriesResultComponent.propTypes = {
  componentId: PropTypes.string.isRequired,
  currentComponentId: PropTypes.string.isRequired,
  searchQuery: PropTypes.any,
  searchResults: PropTypes.any.isRequired,
  venues: PropTypes.instanceOf(Map).isRequired,
  setSelectedEventId: PropTypes.func.isRequired,
};

CategoriesResultComponent.defaultProps = {
  searchQuery: null,
};
