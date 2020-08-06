import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView, StatusBar } from 'react-native';
import moment from 'moment';
import { Navigation } from 'react-native-navigation';
import { Map } from 'immutable';
import Modal from 'react-native-modal';
import { main, text } from './style';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import AbsolutePositioningCard from '../../components/absolute-positioning-card';
import EventItem from '../../components/event-item';
import colors from '../../theme/colors';
import { layoutStyles } from '../../theme/styleguide';
import Icon from '../../components/icon';
import MenuButton from '../../components/menu-button';
import {
  checkPermission,
  // createNotificationChannel,
  getNotificationsToken,
  // scheduleLocalNotification,
  enableNotifications,
} from '../../utils/pushNotificationsUtils';
import Pages from '../../enum/Pages';
import BackgroundDecorator from '../../components/background-decorator';
import { getTabIndexByPageName } from '../../navigation/navigator';
import { getCurrentWeather } from '../../utils/weatherUtils';
import { weatherIcons } from '../../enum/IconCharacter';
import { images } from '../../theme';
import { renderCustomHorizontalList } from '../../utils/eventUtil';

const LOCATION_UPDATE_TIMEOUT = 300000;
const WEATHER_UPDATE_INTERVAL = 900000;
const EVENTS_UPDATE_TIMEOUT = 900000;

export class Today extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      statusBar: {
        style: 'light',
        backgroundColor: colors.FANTASY,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      shouldShowMenu: false,
      showWeather: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { tags: currentTags, userTags, hasSkippedTagSelection } = this.props;
    const { tags: nextTags } = nextProps;
    if (currentTags.size !== nextTags.size && userTags.size === 0 && !hasSkippedTagSelection) {
      return Navigation.showModal({
        component: {
          name: Pages.PICK_INTERESTS,
          options: {
            topBar: {
              drawBehind: false,
              visible: true,
            },
          },
        },
      });
    }

    const { token: currentToken, retrieveEventsAndUserDynamicInfo } = this.props;
    const { token: nextToken, language: nextLanguage } = nextProps;
    if (!currentToken && !!nextToken) {
      retrieveEventsAndUserDynamicInfo({ locale: nextLanguage, token: nextToken });
    }
  }

  _retrieveEntities = () => {
    const {
      retrieveTags,
      retrieveKiosks,
      retrieveZones,
      retrieveCategories,
      retrieveVenues,
      language,
    } = this.props;

    this._scheduleEventsIUpdate();
    retrieveTags({ locale: language });
    retrieveKiosks({ eventId: 3, rate: 5 });
    retrieveZones({ eventId: 3, rate: 5 });
    retrieveCategories({ locale: language });
    retrieveVenues({ locale: language });
  };

  _schedulePositionRetrieving = () => {
    const { retrieveCurrentPosition } = this.props;
    retrieveCurrentPosition();
    this._positionInterval = setInterval(
      () => retrieveCurrentPosition(false),
      LOCATION_UPDATE_TIMEOUT
    );
  };

  _scheduleWeatherUpdates = async () => {
    try {
      const weather = await getCurrentWeather();
      this.setState({
        showWeather: true,
        weatherIcon: weatherIcons[weather.icon].icon,
        weatherTemp: weather.temp,
      });
    } catch (e) {
      this.setState({ showWeather: false });
    }
    setTimeout(this._scheduleWeatherUpdates, WEATHER_UPDATE_INTERVAL);
  };

  _scheduleEventsIUpdate = () => {
    const { retrieveEventsAndUserDynamicInfo, language, token } = this.props;
    retrieveEventsAndUserDynamicInfo({ locale: language, token });
    setTimeout(this._scheduleEventsIUpdate, EVENTS_UPDATE_TIMEOUT);
  };

  componentDidMount = () => {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    getNotificationsToken();
    // createNotificationChannel();
    checkPermission();
    enableNotifications(true);
    // setTimeout(() => scheduleLocalNotification(moment().add(1, 'minute')), 1500);
    this._retrieveEntities();
    this._schedulePositionRetrieving();
    this._updateCurrentTimeAndScheduleNext();
    this._scheduleWeatherUpdates();
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

  _updateCurrentTimeAndScheduleNext = () => {
    const { updateCurrentDate } = this.props;
    updateCurrentDate();
    const currentTime = moment();
    const currentTimestamp = moment().valueOf();
    const currentDate = currentTime.format('L');
    const tomorrowTimestamp = moment(currentDate)
      .add(1, 'day')
      .valueOf();
    setTimeout(() => {
      this._updateCurrentTimeAndScheduleNext();
    }, tomorrowTimestamp - currentTimestamp);
  };

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    clearInterval(this._positionInterval);
  }

  handleOpenNotifications = () => {
    const { changeLanguage, language } = this.props;
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  _renderWelcomeMessage = () => {
    const { weatherIcon, weatherTemp, showWeather } = this.state;

    return (
      <View style={main.welcomeMessage}>
        <View style={[layoutStyles.row, layoutStyles.justifyBetween, layoutStyles.alignCenter]}>
          <View>
            {showWeather && (
              <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
                <Icon name={weatherIcon} color={colors.WHITE} size={30} />
                <Text style={main.headerWeather}>{weatherTemp}</Text>
              </View>
            )}
            <Text style={main.headerDate}>
              {moment()
                .locale(this.props.language)
                .format('MMMM DD')}
            </Text>
          </View>

          {/* <TouchableWithoutFeedback
            onPress={this.handleOpenNotifications}
            hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
          >
            <View style={[layoutStyles.rtlReverseFix, main.notificationContainer]}>
              <Icon name="BELL" color={colors.WHITE} size={30} />
              <View style={[layoutStyles.flexCenter, main.notificationBubble]}>
                <Text style={main.notificationText}>4</Text>
              </View>
            </View>
          </TouchableWithoutFeedback> */}
        </View>
        <View style={[layoutStyles.row]}>
          <Text style={[text.appName]}>{translate(TranslationEnum.APP_NAME)}</Text>
        </View>
        <View style={[layoutStyles.row]}>
          <Text style={text.dates}>{translate(TranslationEnum.STARTING_ENDING_DATES)}</Text>
        </View>
      </View>
    );
  };

  navigateToEventDetails = event => {
    const { setSelectedEventId, componentId } = this.props;
    setSelectedEventId(event.id);
    return Navigation.push(componentId, {
      component: {
        name: Pages.ARTICLE_DETAIL,
      },
    });
  };

  renderEventItem = ({ item, imageShape = 'round' }) => (
    <EventItem
      onPress={() => this.navigateToEventDetails(item)}
      festivity={item}
      imageShape={imageShape}
      venues={this.props.venues}
    />
  );

  renderNearFestivitiesIcon = () => <Icon name="MARKER_FILL" color={colors.FANTASY} size={30} />;

  render() {
    const {
      loadingEntities,
      favoriteEvents,
      eventsByDistance,
      recommendedEvents,
      todayTopFestivities,
      retrieveEventsAndUserDynamicInfoFailed,
      componentId,
      currentComponentId,
    } = this.props;
    const { shouldShowMenu } = this.state;

    if (loadingEntities) {
      return (
        <View style={[main.page, layoutStyles.flexCenter]}>
          <StatusBar backgroundColor={colors.FANTASY} barStyle="light-content" />
          <Image source={images.LOADER} style={main.loader} />
        </View>
      );
    }
    return (
      <View style={[layoutStyles.container, main.page]}>
        <StatusBar backgroundColor={colors.FANTASY} barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[layoutStyles.container]}
          bounces={false}
        >
          <BackgroundDecorator
            backgroundColor={colors.FANTASY}
            middleShapeColor={colors.FANTASY_DARK}
            contentShapeColor={colors.TASTE}
            componentId={componentId}
            currentComponentId={currentComponentId}
          >
            {this._renderWelcomeMessage()}
            <AbsolutePositioningCard style={main.card}>
              {renderCustomHorizontalList(
                recommendedEvents,
                translate(TranslationEnum.RECOMMENDED_FOR_YOU),
                text.yourFestivitiesTitle,
                () => null,
                this.renderEventItem,
                main.yourFestivitiesList
              )}

              {renderCustomHorizontalList(
                eventsByDistance,
                translate(TranslationEnum.FESTIVITIES_NEAR_YOU),
                text.yourFestivitiesTitle,
                this.renderNearFestivitiesIcon,
                ({ item }) => this.renderEventItem({ item, imageShape: 'poster' }),
                main.yourFestivitiesList
              )}

              {renderCustomHorizontalList(
                todayTopFestivities,
                translate(TranslationEnum.TODAY_TOP_FESTIVITIES),
                text.yourFestivitiesTitle,
                () => null,
                ({ item }) => this.renderEventItem({ item, imageShape: 'poster' }),
                main.yourFestivitiesList,
                false
              )}

              {renderCustomHorizontalList(
                favoriteEvents,
                translate(TranslationEnum.YOUR_FESTIVITIES),
                text.yourFestivitiesTitle,
                () => null,
                this.renderEventItem,
                main.yourFestivitiesList
              )}
            </AbsolutePositioningCard>
          </BackgroundDecorator>
        </ScrollView>
        {shouldShowMenu && <MenuButton selectedMenuItem={getTabIndexByPageName(Pages.TODAY)} />}
        <Modal isVisible={retrieveEventsAndUserDynamicInfoFailed}>
          <View style={main.errorModal}>
            <Icon name="ALERT" color={colors.RED_DARKER} size={50} />
            <Text style={text.errorModalTitle}>{translate(TranslationEnum.WE_ARE_SORRY)}</Text>
            <Text style={text.errorModalBody}>
              {translate(TranslationEnum.UNEXPECTED_ERROR_OCCURRED)}
            </Text>
            <Text onPress={this._retrieveEntities} style={text.errorModalButtonText}>
              {translate(TranslationEnum.RETRY)}
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

Today.propTypes = {
  events: PropTypes.instanceOf(Map).isRequired,
  favoriteEvents: PropTypes.instanceOf(Map).isRequired,
  eventsByDistance: PropTypes.instanceOf(Map).isRequired,
  todayTopFestivities: PropTypes.instanceOf(Map).isRequired,
  recommendedEvents: PropTypes.instanceOf(Map).isRequired,
  loadingEntities: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
  currentComponentId: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  token: PropTypes.any,
  tags: PropTypes.instanceOf(Map).isRequired,
  userTags: PropTypes.instanceOf(Map).isRequired,
  hasSkippedTagSelection: PropTypes.bool.isRequired,
  retrieveEventsAndUserDynamicInfoFailed: PropTypes.bool.isRequired,
  venues: PropTypes.instanceOf(Map).isRequired,

  // actions
  retrieveTags: PropTypes.func.isRequired,
  retrieveKiosks: PropTypes.func.isRequired,
  retrieveZones: PropTypes.func.isRequired,
  retrieveVenues: PropTypes.func.isRequired,
  retrieveCurrentPosition: PropTypes.func.isRequired,
  retrieveCategories: PropTypes.func.isRequired,
  updateCurrentDate: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  retrieveEventsAndUserDynamicInfo: PropTypes.func.isRequired,
  setSelectedEventId: PropTypes.func.isRequired,
  setCurrentComponentId: PropTypes.func.isRequired,
};

Today.defaultProps = {
  token: null,
};
