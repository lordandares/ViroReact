import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { values } from 'lodash';
import { Navigation } from 'react-native-navigation';
import { Map } from 'immutable';
import { main, text as textStyles } from './style';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import Pages from '../../enum/Pages';
import RelativePositioningCard from '../../components/relative-positioning-card';
import Icon from '../../components/icon';
import categoriesEnum from '../../enum/CategoriesEnum';
import { categoryIcons, viewAllIcon } from '../../enum/IconCharacter';
import MenuButton from '../../components/menu-button';
import LoadingIndicator from '../../components/loading-indicator';
import colors from '../../theme/colors';
import BackgroundDecorator from '../../components/background-decorator';
import { getTabIndexByPageName } from '../../navigation/navigator';
import { ALL_CATEGORIES_ID } from '../../store/selectors/searchSelectors';
import { layoutStyles } from '../../theme/styleguide';

export class Search extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    currentComponentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
    searchResults: PropTypes.any,
    searchQuery: PropTypes.any,
    categories: PropTypes.instanceOf(Map).isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    setSearchCategory: PropTypes.func.isRequired,
    loadingEntities: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
  };

  static defaultProps = {
    searchResults: null,
    searchQuery: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      textInputText: '',
      shouldShowMenu: false,
    };

    this.firstCategoriesRow = [];
    this.secondCategoriesRow = [];

    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  _setCategoryRowsIfNeeded = () => {
    const { categories } = this.props;

    if (this.firstCategoriesRow.length > 0 || this.secondCategoriesRow.length > 0) {
      return;
    }

    this.firstCategoriesRow = [
      categories.find(category => category.id === categoriesEnum.RESTAURANTS.id),
      categories.find(category => category.id === categoriesEnum.EXHIBITIONS_AND_BUSINESS.id),
      categories.find(category => category.id === categoriesEnum.GAMING.id),
      categories.find(category => category.id === categoriesEnum.SHOWS_AND_PERFORMANCE.id),
    ];

    this.secondCategoriesRow = [
      categories.find(category => category.id === categoriesEnum.FESTIVALS.id),
      categories.find(category => category.id === categoriesEnum.ENTERTAINMENT_ACTIVITIES.id),
      categories.find(category => category.id === categoriesEnum.LIVE_SHOWS.id),
      { id: ALL_CATEGORIES_ID, name: translate(TranslationEnum.VIEW_ALL) },
    ];
  };

  componentDidAppear() {
    const { setCurrentComponentId, componentId } = this.props;
    setCurrentComponentId(componentId);
    this.setState({
      shouldShowMenu: true,
    });
  }

  componentDidDisappear() {
    this.setState({
      shouldShowMenu: false,
    });
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  _navigateToSearchResultsPage = category => {
    const { setSearchQuery, setSearchCategory, componentId } = this.props;

    setSearchQuery(null);
    setSearchCategory(category);
    return Navigation.push(componentId, {
      component: {
        name: Pages.CATEGORIES_RESULT,
      },
    });
  };

  _renderCategory = category => {
    const iconObject = categoryIcons[category.id] || viewAllIcon;
    return (
      <TouchableWithoutFeedback
        key={`category${category.id}`}
        onPress={() => this._navigateToSearchResultsPage(category)}
      >
        <View style={main.categoryContainer}>
          <View style={[main.iconContainer, { backgroundColor: iconObject.color }]}>
            <Icon
              name={iconObject.icon}
              color={colors.WHITE}
              size={25}
              onPress={() => this._navigateToSearchResultsPage(category)}
            />
          </View>
          <Text style={textStyles.categoryTitle}>{category.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  componentWillReceiveProps(nextProps) {
    const { componentId, searchQuery: currentSearchQuery } = this.props;
    const { searchQuery: nextSearchQuery } = nextProps;

    if (currentSearchQuery !== nextSearchQuery && !!nextSearchQuery) {
      const searchThrewNoResults = this._didSearchThrewNoResults(nextProps);
      if (!searchThrewNoResults) {
        return Navigation.push(componentId, {
          component: {
            name: Pages.CATEGORIES_RESULT,
          },
        });
      }
    }
  }

  _didSearchThrewNoResults = props =>
    !!props.searchQuery &&
    !!props.searchResults &&
    !values(props.searchResults).find(eventsMap => eventsMap.size > 0);

  onSearchIconPress = () => {
    const { setSearchQuery } = this.props;
    const { textInputText } = this.state;
    Keyboard.dismiss();
    setSearchQuery(textInputText);
  };

  render() {
    const {
      setSearchQuery,
      loadingEntities,
      componentId,
      currentComponentId,
      language,
    } = this.props;
    const { shouldShowMenu, textInputText } = this.state;

    if (loadingEntities) {
      return <LoadingIndicator size="large" color={colors.WHITE} style={main.page} />;
    }

    this._setCategoryRowsIfNeeded();

    const searchThrewNoResults = this._didSearchThrewNoResults(this.props);

    return (
      <View style={main.page}>
        <BackgroundDecorator
          backgroundColor={colors.IMAGINE}
          middleShapeColor={colors.IMAGINE_DARK}
          contentShapeColor={colors.SPEED}
          componentId={componentId}
          currentComponentId={currentComponentId}
        >
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={main.page}>
            <View style={layoutStyles.row}>
              <Text style={textStyles.title}>{translate(TranslationEnum.SEARCH)}</Text>
            </View>

            <RelativePositioningCard style={main.card}>
              <View style={main.cardContent}>
                <View style={main.cardTitle}>
                  <Text style={textStyles.cardTitle}>
                    {translate(TranslationEnum.EXPLORE_NEARBY)}
                  </Text>
                  <Icon name="MARKER_FILL" color={colors.IMAGINE} size={35} />
                </View>

                <View style={main.categoriesRow}>
                  {this.firstCategoriesRow.map(this._renderCategory)}
                </View>

                <View style={main.categoriesRow}>
                  {this.secondCategoriesRow.map(this._renderCategory)}
                </View>

                {language === 'en' && (
                  <View>
                    <Text style={textStyles.textSearchTitle}>
                      {translate(TranslationEnum.ENTER_TERM_SEARCH_ACTIVITIES)}
                    </Text>
                    <View style={main.searchRow}>
                      <TextInput
                        spellCheck={false}
                        autoCorret={false}
                        value={textInputText}
                        onFocus={() => {
                          if (!searchThrewNoResults) {
                            setSearchQuery(null);
                          }
                        }}
                        onChangeText={text => {
                          this.setState({ textInputText: text });
                          if (searchThrewNoResults) {
                            setSearchQuery(null);
                          }
                        }}
                        style={textStyles.searchInput}
                        onSubmitEditing={({ nativeEvent: { text } }) => setSearchQuery(text)}
                      />
                      <TouchableWithoutFeedback onPress={this.onSearchIconPress}>
                        <View>
                          <Icon
                            name="SEARCH"
                            color={colors.IMAGINE}
                            size={35}
                            lineHeight={50}
                            containerStyle={main.searchIcon}
                            onPress={this.onSearchIconPress}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <Text style={[textStyles.noResultsMessage, textStyles.redColor]}>
                      {searchThrewNoResults
                        ? translate(TranslationEnum.NO_RESULT_FOUND_MESSAGE)
                        : ''}
                    </Text>
                  </View>
                )}
              </View>
            </RelativePositioningCard>
          </KeyboardAwareScrollView>
          {shouldShowMenu && <MenuButton selectedMenuItem={getTabIndexByPageName(Pages.SEARCH)} />}
        </BackgroundDecorator>
      </View>
    );
  }
}
