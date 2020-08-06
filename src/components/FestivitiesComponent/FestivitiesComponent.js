import React, { useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { Map } from 'immutable';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import { main, text } from './style';
import AbsolutePositioningCard from '../absolute-positioning-card';
import EventItem from '../event-item';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import CustomHorizontalList from '../custom-horizontal-list';
import CategoriesEnum, { nameById } from '../../enum/CategoriesEnum';
import { layoutStyles } from '../../theme/styleguide';
import BackgroundDecorator from '../background-decorator/';
import { colors } from '../../theme';
import { getTabIndexByPageName } from '../../navigation/navigator';
import Pages from '../../enum/Pages';
import MenuButton from '../menu-button';
import HeaderButton from '../header-button/HeaderButton';
import { navigateToSearchPage } from '../../navigation/utils';

export const FestivitiesComponent = props => {
  const { sendToMap } = props;
  const categoriesList = Object.keys(CategoriesEnum);
  const [layoutstate, setlayoutstate] = useState('0');
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const _redernav = () => {
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
        {categoriesList.map(c => (
          <TouchableOpacity
            key={`category${c}`}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setlayoutstate(CategoriesEnum[c].id);
            }}
          >
            <View
              style={[main.navtext, layoutstate === CategoriesEnum[c].id && main.navtextActive]}
            >
              <Text style={text.dates}>{translate(TranslationEnum[c])}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const _renderWelcomeMessage = () => {
    return (
      <View style={main.welcomeMessage}>
        <View style={[layoutStyles.row, layoutStyles.justifyBetween, layoutStyles.alignCenter]}>
          <View style={main.notificationContainer} />
          <View style={main.notificationContainer}>
            <HeaderButton
              onPress={navigateToSearchPage}
              iconName="SEARCH"
              backgroundColor={colors.EXPLORE_DARK}
              containerStyle={main.iconspace}
            />

            <HeaderButton
              iconName="MARKER_FILL"
              backgroundColor={colors.EXPLORE_DARK}
              onPress={sendToMap}
            />
          </View>
        </View>
        <View style={layoutStyles.row}>
          <Text style={[text.appName]}>{translate(TranslationEnum.FESTIVITIES)}</Text>
        </View>
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
          themeColor: 'EXPLORE',
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

  const multrenderhorizontal = (selector, c) => {
    if (c === '0' && selector.length > 0) {
      return renderHorizonatal(selector);
    }
    return selector.size > 0
      ? _renderCustomHorizontalList(
          selector,
          c,
          translate(TranslationEnum[nameById[c].name]),
          text.yourFestivitiesTitle,
          renderNearFestivitiesIcon,
          ({ item }) => renderEventItem({ item, imageShape: 'poster' }),
          main.yourFestivitiesList
        )
      : null;
  };

  const renderHorizonatal = selector => {
    return selector.map((s, index) => {
      if (s.size > 0) {
        return _renderCustomHorizontalList(
          s,
          index,
          translate(TranslationEnum[nameById[index + 1].name]),
          text.yourFestivitiesTitle,
          renderNearFestivitiesIcon,
          ({ item }) => renderEventItem({ item, imageShape: 'poster' }),
          main.yourFestivitiesList
        );
      }
      return null;
    });
  };

  const renderNearFestivitiesIcon = () => null; // <Icon name="MARKER" color={colors.FANTASY} size={24} />;

  const selectObj = x => {
    const {
      live,
      festivals,
      gaming,
      showsAndPerformance,
      entertainment,
      exhibitionsAndBusiness,
      restaurants,
    } = props;

    switch (x) {
      case '1':
        return live;
      case '2':
        return festivals;
      case '3':
        return gaming;
      case '4':
        return showsAndPerformance;
      case '5':
        return entertainment;
      case '6':
        return exhibitionsAndBusiness;
      case '7':
        return restaurants;
      default:
        return [
          live,
          festivals,
          gaming,
          showsAndPerformance,
          entertainment,
          exhibitionsAndBusiness,
          restaurants,
        ];
    }
  };

  return (
    <View style={main.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={main.page}>
        <BackgroundDecorator
          backgroundColor={colors.EXPLORE}
          middleShapeColor={colors.EXPLORE_DARK}
          contentShapeColor={colors.TASTE}
          componentId={props.componentId}
          currentComponentId={props.currentComponentId}
        >
          {_renderWelcomeMessage()}
          {_redernav()}

          <AbsolutePositioningCard style={main.card}>
            {multrenderhorizontal(selectObj(layoutstate), layoutstate)}
          </AbsolutePositioningCard>
        </BackgroundDecorator>
      </ScrollView>
      <MenuButton selectedMenuItem={getTabIndexByPageName(Pages.FESTIVITIES)} />
    </View>
  );
};

FestivitiesComponent.propTypes = {
  searchText: PropTypes.string.isRequired,
  sendToMap: PropTypes.func.isRequired,
  live: PropTypes.instanceOf(Map).isRequired,
  festivals: PropTypes.instanceOf(Map).isRequired,
  gaming: PropTypes.instanceOf(Map).isRequired,
  showsAndPerformance: PropTypes.instanceOf(Map).isRequired,
  entertainment: PropTypes.instanceOf(Map).isRequired,
  exhibitionsAndBusiness: PropTypes.instanceOf(Map).isRequired,
  restaurants: PropTypes.instanceOf(Map).isRequired,
  venues: PropTypes.instanceOf(Map).isRequired,
  componentId: PropTypes.string.isRequired,
  currentComponentId: PropTypes.string.isRequired,
  setSelectedEventId: PropTypes.func.isRequired,
};

FestivitiesComponent.defaultProps = {};
