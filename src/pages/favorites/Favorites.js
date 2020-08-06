import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Map } from 'immutable';
import { main, text } from './style';
import { layoutStyles } from '../../theme/styleguide';
import colors from '../../theme/colors';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import Icon from '../../components/icon';
import MenuButton from '../../components/menu-button';
import LoadingIndicator from '../../components/loading-indicator';
import AbsolutePositioningCard from '../../components/absolute-positioning-card';
import TextChevronButton from '../../components/text-chevron-button';
import CustomHorizontalList from '../../components/custom-horizontal-list/';
import EventItem from '../../components/event-item';
import BackgroundDecorator from '../../components/background-decorator';
import Pages from '../../enum/Pages';
import { getTabIndexByPageName } from '../../navigation/navigator';
import { nameById } from '../../enum/CategoriesEnum';
import HeaderButton from '../../components/header-button/HeaderButton';
import { navigateToFestivitiesPage, navigateToSearchPage } from '../../navigation/utils';
import AccountActions from '../../components/account-actions/AccountActions';

export default class Favorites extends PureComponent {
  static navigatorStyle = {};
  static displayName = 'Favorites';

  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = { shouldShowMenu: false };
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

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

  renderHeader() {
    return (
      <View style={main.headerContainer}>
        <View style={[layoutStyles.row, layoutStyles.justifyEnd]}>
          <HeaderButton
            onPress={navigateToSearchPage}
            iconName="SEARCH"
            backgroundColor={colors.JOY_DARK}
          />

          {/* <HeaderButton
            onPress={() => null}
            iconName="MARKER_FILL"
            backgroundColor={colors.JOY_DARK}
          /> */}
        </View>
        <View style={layoutStyles.row}>
          <Text style={text.headerTitle}>{translate(TranslationEnum.FAVORITES)}</Text>
        </View>
      </View>
    );
  }

  renderEmptyCard = () => (
    <AbsolutePositioningCard style={[layoutStyles.flexCenter, main.card, main.emptyCard]}>
      <View style={[layoutStyles.flexCenter, main.emptyIconContainer]}>
        <Icon name="HEART" color={colors.GREY_MEDIUM} size={40} />
      </View>
      <Text style={text.emptyTitle}>{translate(TranslationEnum.FAVORITES_EMPTY_TITLE)}</Text>
      <Text style={text.emptySubtitle}>{translate(TranslationEnum.FAVORITES_EMPTY_SUBTITLE)}</Text>
      <TextChevronButton
        text={translate(TranslationEnum.SEE_ALL_FESTIVITIES)}
        colorName={colors.JOY}
        style={main.seeAllChevron}
        onPress={navigateToFestivitiesPage}
      />
    </AbsolutePositioningCard>
  );

  renderLoggedOutCard = () => (
    <AbsolutePositioningCard style={[layoutStyles.flexCenter, main.card, main.emptyCard]}>
      <View style={[layoutStyles.flexCenter, main.emptyIconContainer]}>
        <Icon name="HEART" color={colors.GREY_MEDIUM} size={40} />
      </View>
      <Text style={text.emptyTitle}>{translate(TranslationEnum.FAVORITES_LOGGED_OUT_TITLE)}</Text>
      <Text style={text.emptySubtitle}>
        {translate(TranslationEnum.FAVORITES_LOGGED_OUT_SUBTITLE)}
      </Text>

      <AccountActions
        onLogInPress={() =>
          Navigation.showModal({
            component: {
              name: Pages.SIGN_IN,
              passProps: {
                initialFlow: false,
              },
            },
          })
        }
      />
    </AbsolutePositioningCard>
  );

  _renderCustomHorizontalList = (
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

  renderNearFestivitiesIcon = () => null; // <Icon name="MARKER" color={colors.FANTASY} size={24} />;

  navigateToEventDetails = event => {
    const { setSelectedEventId, componentId } = this.props;
    setSelectedEventId(event.id);
    return Navigation.push(componentId, {
      component: {
        name: Pages.ARTICLE_DETAIL,
        passProps: {
          themeColor: 'JOY',
        },
      },
    });
  };

  // eslint-disable-next-line react/prop-types
  renderEventItem = ({ item, imageShape = 'round' }) => {
    const { venues } = this.props;
    return (
      <EventItem
        onPress={() => this.navigateToEventDetails(item)}
        festivity={item}
        imageShape={imageShape}
        venues={venues}
      />
    );
  };

  renderHorizontal = selector => {
    return selector.map((s, index) => {
      if (s.size > 0) {
        return this._renderCustomHorizontalList(
          s,
          index,
          translate(TranslationEnum[nameById[index + 1].name]),
          text.yourFestivitiesTitle,
          this.renderNearFestivitiesIcon,
          ({ item }) => this.renderEventItem({ item, imageShape: 'poster' }),
          main.yourFestivitiesList
        );
      }
      return null;
    });
  };

  selectObj = () => {
    const {
      live,
      festivals,
      gaming,
      showsAndPerformance,
      entertainment,
      exhibitionsAndBusiness,
      restaurants,
    } = this.props;
    return [
      live,
      festivals,
      gaming,
      showsAndPerformance,
      entertainment,
      exhibitionsAndBusiness,
      restaurants,
    ];
  };

  render() {
    const {
      loadingEntities,
      componentId,
      currentComponentId,
      favoriteEvents,
      accessToken,
    } = this.props;
    const { shouldShowMenu } = this.state;
    if (loadingEntities) {
      return <LoadingIndicator size="large" color={colors.WHITE} style={main.page} />;
    }
    return (
      <View style={main.container}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <BackgroundDecorator
            backgroundColor={colors.JOY}
            middleShapeColor={colors.JOY_DARK}
            contentShapeColor={colors.SPEED}
            componentId={componentId}
            currentComponentId={currentComponentId}
          >
            {this.renderHeader()}
            <AbsolutePositioningCard style={main.card}>
              {favoriteEvents.size === 0 && !!accessToken && this.renderEmptyCard()}
              {!accessToken && this.renderLoggedOutCard()}
              {this.renderHorizontal(this.selectObj())}
            </AbsolutePositioningCard>
          </BackgroundDecorator>
        </ScrollView>
        {shouldShowMenu && <MenuButton selectedMenuItem={getTabIndexByPageName(Pages.FAVORITES)} />}
      </View>
    );
  }

  static propTypes = {
    loadingEntities: PropTypes.bool.isRequired,
    favoriteEvents: PropTypes.instanceOf(Map).isRequired,
    categories: PropTypes.instanceOf(Map).isRequired,
    venues: PropTypes.instanceOf(Map).isRequired,
    componentId: PropTypes.string.isRequired,
    currentComponentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
    setSelectedEventId: PropTypes.func.isRequired,
    live: PropTypes.instanceOf(Map).isRequired,
    festivals: PropTypes.instanceOf(Map).isRequired,
    gaming: PropTypes.instanceOf(Map).isRequired,
    showsAndPerformance: PropTypes.instanceOf(Map).isRequired,
    entertainment: PropTypes.instanceOf(Map).isRequired,
    exhibitionsAndBusiness: PropTypes.instanceOf(Map).isRequired,
    restaurants: PropTypes.instanceOf(Map).isRequired,
    accessToken: PropTypes.any,
  };
  static defaultProps = {
    accessToken: null,
  };
}
