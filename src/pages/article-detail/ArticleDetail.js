import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  Linking,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Map } from 'immutable';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import { main, header, slider, eventInfo, bullet, actionBtns, sponsors } from './style';
import { layoutStyles, textStyles, htmlStyles, layerStyles } from '../../theme/styleguide';
import { AbsolutePositioningCard } from '../../components/absolute-positioning-card/AbsolutePositioningCard';
import images from '../../theme/images';
import Icon from '../../components/icon';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { text } from '../today/style';
import EventItem from '../../components/event-item/';
import { formatAbbreviatedNumber } from '../../utils/numberUtils';
import BackgroundDecorator from '../../components/background-decorator';
import AnimatedLoadImage from '../../components/animated-load-image';
import RatingModal from '../../components/rating-modal';
import colors from '../../theme/colors';
import ErrorModal from '../../components/error-modal/';
import { CENTER_COORDINATE, MAP_BOUNDS } from '../../enum/Maps';
import { PointAdapter } from '../../components/map-category/helpers/adapter';
import { renderCustomHorizontalList } from '../../utils/eventUtil';
import NavBar from '../../components/nav-bar/NavBar';
import { BackButton } from '../../components/back-button/BackButton';

export class ArticleDetail extends PureComponent {
  static propTypes = {
    event: PropTypes.object.isRequired,
    categories: PropTypes.instanceOf(Map).isRequired,
    venues: PropTypes.instanceOf(Map).isRequired,
    componentId: PropTypes.string.isRequired,
    currentComponentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
    ratingAndUpdateInProgress: PropTypes.bool.isRequired,
    settingFavoriteAndUpdateInProgress: PropTypes.bool.isRequired,
    rateEventAndRetrieveDynamicInfo: PropTypes.func.isRequired,
    setFavoriteEventAndRetrieveDynamicInfo: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    token: PropTypes.any,
    settingFavoriteAndUpdateFailed: PropTypes.bool.isRequired,
    resetFavoringAndUpdateFailure: PropTypes.func.isRequired,
    ratingAndUpdateFailed: PropTypes.bool.isRequired,
    resetRatingAndUpdateFailure: PropTypes.func.isRequired,
    themeColor: PropTypes.oneOf(Object.keys(colors)),
    similarActivities: PropTypes.instanceOf(Map).isRequired,
  };

  static defaultProps = {
    themeColor: 'FANTASY',
    token: null,
  };

  static displayName = 'ArticleDetail';

  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
      bottomTabs: {
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);

    this.themeColor = colors[this.props.themeColor];

    this.savedPositionY = 0;
    this.actBtnsOpacity = new Animated.Value(1);
    this.state = {
      isRatingModalVisible: false,
    };

    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    const { setCurrentComponentId, componentId } = this.props;
    setCurrentComponentId(componentId);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { event: currentEvent } = this.props;
    const { event: nextEvent } = nextProps;
    if (currentEvent.userRate !== nextEvent.userRate) {
      this.setState({ isRatingModalVisible: false });
    }
  }

  openEventTicketingUrl = () => {
    const {
      event: { ticketingUrl },
    } = this.props;
    Linking.canOpenURL(ticketingUrl).then(supported => {
      if (supported) {
        Linking.openURL(ticketingUrl);
      }
    });
  };

  _renderHeader = () => {
    const { categories, event, venues } = this.props;
    return (
      <View style={header.container}>
        <Image source={images.LOGO_COLOR} style={header.logo} />
        <View style={layoutStyles.row}>
          <Text style={[textStyles.smallHeading, header.category]}>
            {categories.get(event.category).name}
          </Text>
        </View>
        <View style={layoutStyles.row}>
          <Text style={[textStyles.h1, header.title, { color: this.themeColor }]}>
            {event.name}
          </Text>
        </View>
        <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
          <Icon
            name="PROFILE"
            size={19}
            color={colors.GREY_MEDIUM}
            containerStyle={header.likesIcon}
          />
          <Text styl={[textStyles.bodyMedium, header.likesText]}>
            {formatAbbreviatedNumber(event.likes)}
          </Text>
          <TouchableWithoutFeedback onPress={this.toggleRatingModalIfSignedIn}>
            <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
              <Icon
                name="STAR_FILL"
                size={19}
                color={this.themeColor}
                containerStyle={header.rateIcon}
              />
              <Text styl={[textStyles.bodyMedium, header.likesText]}>
                {formatAbbreviatedNumber(event.rate)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={header.body}>
          <View style={layoutStyles.row}>
            <HTMLView
              value={`<p>${event.description}</p>`}
              stylesheet={htmlStyles} /* renderNode={this.renderNode} */
            />
          </View>
        </View>

        <View style={[layoutStyles.alignCenter, header.locationContainer]}>
          <View
            style={[
              layoutStyles.flexCenter,
              header.locationIcon,
              { backgroundColor: this.themeColor },
            ]}
          >
            <Icon name="MARKER_FILL" size={28} color={colors.WHITE} />
          </View>
          <Text style={[textStyles.smallHeading, header.locationText]}>
            {venues.get(event.venue).zone.name}
          </Text>
        </View>
      </View>
    );
  };

  _renderImageSlider = () => {
    const {
      event: { imageCarousel },
    } = this.props;
    if (imageCarousel.size > 0) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[layoutStyles.row, slider.container]}>
            {imageCarousel.map((item, index) => (
              <View key={`img-${index}`}>
                <Image source={{ uri: item.thumbnail }} style={slider.image} />
                <Text style={[textStyles.bodyMedium, slider.index]}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      );
    }
    return null;
  };

  _renderSponsors = () => {
    const {
      event: { imageSponsors },
    } = this.props;

    if (imageSponsors.size > 0) {
      return (
        <View style={[main.container, sponsors.wrapper]}>
          <View style={layoutStyles.row}>
            <Text style={[textStyles.h3, main.heading]}>
              {translate(TranslationEnum.EVENT_SPONSORED)}
            </Text>
          </View>

          <View style={[layoutStyles.row, layoutStyles.alignCenter, sponsors.list]}>
            {imageSponsors.map((sponsor, index) => (
              <Image source={{ uri: sponsor.thumbnail }} style={sponsors.item} key={`s-${index}`} />
            ))}
          </View>
          <View style={main.divider} />
        </View>
      );
    }
    return <View style={main.divider} />;
  };

  _renderEventInfo = () => {
    const {
      event,
      event: { times },
      venues,
      locale,
    } = this.props;
    const venueInfo = venues.get(event.venue);
    const amenitiesList = venueInfo.zone.amenities;

    const headingStyles = [textStyles.smallHeading, eventInfo.heading, { color: this.themeColor }];
    const linkStyles = [
      textStyles.smallHeading,
      eventInfo.heading,
      eventInfo.link,
      { color: this.themeColor },
    ];

    return (
      <View style={main.container}>
        <View style={layoutStyles.row}>
          <Text style={[textStyles.h3, main.heading]}>
            {translate(TranslationEnum.EVENT_ABOUT)}
          </Text>
        </View>

        <View style={layoutStyles.row}>
          <View style={[layoutStyles.container, layoutStyles.justifyBetween, eventInfo.column]}>
            <View style={layoutStyles.alignStart}>
              <Icon
                name="CALENDAR"
                size={35}
                lineHeight={50}
                color={this.themeColor}
                containerStyle={layoutStyles.container}
              />
              <Text style={headingStyles}>
                {translate(TranslationEnum.EVENT_DATES).toUpperCase()}
              </Text>
              <View style={layoutStyles.row}>
                <Text
                  style={[textStyles.bodyMedium, eventInfo.textRegular, eventInfo.textEmphasis]}
                >
                  {`${moment(event.startDate)
                    .locale(locale)
                    .format('MMM D')}`}
                </Text>
                {event.endDate && (
                  <Text
                    style={[textStyles.bodyMedium, eventInfo.textRegular, eventInfo.textEmphasis]}
                  >
                    {` - ${moment(event.endDate)
                      .locale(locale)
                      .format('MMM D')}`}
                  </Text>
                )}
              </View>
            </View>

            {!!event.priceFrom && (
              <View style={layoutStyles.alignStart}>
                <Text style={headingStyles}>
                  {translate(TranslationEnum.EVENT_COST).toUpperCase()}
                </Text>
                <View style={layoutStyles.row}>
                  <Text
                    style={[textStyles.bodyMedium, eventInfo.textRegular, eventInfo.textEmphasis]}
                  >
                    {`$${event.priceFrom}`}
                  </Text>
                  {event.priceTo > 0 && (
                    <Text
                      style={[textStyles.bodyMedium, eventInfo.textRegular, eventInfo.textEmphasis]}
                    >
                      {` - $${event.priceTo}`}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>

          <View style={layoutStyles.container}>
            {times.size > 0 && (
              <View style={layoutStyles.alignStart}>
                <Icon
                  name="CLOCK"
                  size={40}
                  lineHeight={50}
                  color={this.themeColor}
                  containerStyle={layoutStyles.container}
                />
                <Text style={headingStyles}>
                  {translate(TranslationEnum.EVENT_HOURS).toUpperCase()}
                </Text>
                {times.map((time, index) => {
                  return (
                    <View style={layoutStyles.row} key={`t-${index}`}>
                      <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>
                        {moment()
                          .day(time.day)
                          .format('ddd')}
                        {': '}
                      </Text>
                      <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>
                        {`${moment()
                          .hour(time.timeFrom)
                          .format('ha')} - ${moment()
                          .hour(time.timeTo)
                          .format('ha')}`}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        <View style={layoutStyles.row}>
          <View style={[layoutStyles.container, layoutStyles.alignStart, eventInfo.column]}>
            <View style={layoutStyles.row}>
              <Text style={headingStyles}>
                {translate(TranslationEnum.EVENT_ZONE).toUpperCase()}
              </Text>
            </View>
            <Text style={[textStyles.bodyMedium, eventInfo.textRegular, eventInfo.textEmphasis]}>
              {venueInfo.zone.name}
            </Text>
          </View>

          <View style={[layoutStyles.container, layoutStyles.alignStart]}>
            <Text style={headingStyles}>
              {translate(TranslationEnum.EVENT_AUDIENCE).toUpperCase()}
            </Text>
            <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>{event.audience}</Text>
          </View>
        </View>

        <View style={layoutStyles.row}>
          <View style={[layoutStyles.container, layoutStyles.alignStart, eventInfo.column]}>
            <Text style={headingStyles}>{translate(TranslationEnum.EVENT_KIDS).toUpperCase()}</Text>

            <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>
              {event.kidsAllowed
                ? translate(TranslationEnum.EVENT_KIDS_ALLOWED)
                : translate(TranslationEnum.EVENT_KIDS_NOT_ALLOWED)}
            </Text>
          </View>

          {amenitiesList.length > 0 && (
            <View style={[layoutStyles.container, layoutStyles.alignStart]}>
              <Text style={headingStyles}>
                {translate(TranslationEnum.EVENT_AMENITIES).toUpperCase()}
              </Text>

              {amenitiesList.map((amenity, index) => {
                return (
                  <View key={`a-${index}`}>
                    <View style={bullet.icon} />
                    <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>
                      {amenity.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {!!event.specialNotes && (
          <View style={layoutStyles.alignStart}>
            <Text style={headingStyles}>
              {translate(TranslationEnum.EVENT_SPECIAL_NOTES).toUpperCase()}
            </Text>
            <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>{event.specialNotes}</Text>
          </View>
        )}

        <View style={layoutStyles.alignStart}>
          {(!!event.ticketsOnGate || !!event.ticketingUrl) && (
            <Text style={headingStyles}>
              {translate(TranslationEnum.EVENT_TICKETS).toUpperCase()}
            </Text>
          )}

          {!!event.ticketingUrl && (
            <TouchableWithoutFeedback onPress={this.openEventTicketingUrl}>
              <View
                style={[layoutStyles.row, layoutStyles.alignCenter, { color: this.themeColor }]}
              >
                <Text style={linkStyles}>{translate(TranslationEnum.EVENT_TICKETS_ONLINE)}</Text>
                <Icon name="CHEVRON_RIGHT" color={this.themeColor} size={7} />
              </View>
            </TouchableWithoutFeedback>
          )}

          {!!event.ticketsOnGate && (
            <View style={eventInfo.gateTickets}>
              <View style={bullet.icon} />
              <Text style={[textStyles.bodyMedium, eventInfo.textRegular]}>
                {translate(TranslationEnum.EVENT_TICKETS_ON_GATE)}
              </Text>
            </View>
          )}

          {/* {!!event.findNearKiosk && (
            <View style={(!!event.ticketsOnGate || !!event.ticketingUrl) && eventInfo.linkKiosk}>
              <TouchableWithoutFeedback>
                <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
                  <Text style={linkStyles}>{translate(TranslationEnum.EVENT_TICKETS_KIOSK)}</Text>
                  <Icon name="CHEVRON_RIGHT" color={this.themeColor} size={7} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )} */}
        </View>
      </View>
    );
  };

  _renderMap = () => {
    const { event, venues } = this.props;

    const collections = PointAdapter(event, venues);

    return (
      <View style={main.mapWrapper}>
        {/* <View style={main.map} /> */}
        <MapboxGL.MapView
          style={main.map}
          showUserLocation
          zoomEnabled
          logoEnabled={false}
          contentInset={10}
          styleURL={MapboxGL.StyleURL.Light}
          compassEnabled={false}
        >
          <MapboxGL.Camera
            bounds={MAP_BOUNDS}
            zoomLevel={3}
            animationDuration={2000}
            animationMode="flyTo"
            centerCoordinate={CENTER_COORDINATE}
          />
          {collections.map((collect, index) => {
            let source = null;
            if (collect.features.length > 0) {
              source = (
                <MapboxGL.ShapeSource
                  id={`id${index}`}
                  key={`id${collect.features[0].id}`}
                  shape={collect}
                  minZoomLevel={3}
                  maxZoomLevel={3}
                >
                  <MapboxGL.SymbolLayer
                    id={`ids${index}`}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    minZoomLevel={1}
                    style={layerStyles(index)}
                  />
                </MapboxGL.ShapeSource>
              );
            }
            return source;
          })}
        </MapboxGL.MapView>
      </View>
    );
  };

  renderEventItem = ({ item, imageShape = 'round' }) => (
    <EventItem venues={this.props.venues} festivity={item} imageShape={imageShape} />
  );

  _renderActionButtons = () => {
    const {
      event,
      setFavoriteEventAndRetrieveDynamicInfo,
      settingFavoriteAndUpdateInProgress,
      locale,
      token,
    } = this.props;
    return (
      <Animated.View style={[actionBtns.wrapper, { opacity: this.actBtnsOpacity }]}>
        {/* <View style={actionBtns.buttonWrapper}>
          <TouchableWithoutFeedback>
            <View style={[layoutStyles.flexCenter, actionBtns.button]}>
              <Icon name="SHARE" size={23} color={colors.GREY_DARK} />
            </View>
          </TouchableWithoutFeedback>
        </View> */}

        {!!event.ticketingUrl && (
          <View style={actionBtns.buttonWrapper}>
            <TouchableWithoutFeedback onPress={this.openEventTicketingUrl}>
              <View style={[layoutStyles.flexCenter, actionBtns.button]}>
                <Icon
                  name="TICKET"
                  size={23}
                  color={colors.GREY_DARK}
                  onPress={this.openEventTicketingUrl}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}

        {!!token && (
          <View style={actionBtns.buttonWrapper}>
            <TouchableWithoutFeedback>
              <View style={[layoutStyles.flexCenter, actionBtns.button]}>
                {(settingFavoriteAndUpdateInProgress && (
                  <ActivityIndicator color={colors.GREY_DARK} />
                )) ||
                  (event.isFavorite ? (
                    <Icon
                      onPress={() =>
                        setFavoriteEventAndRetrieveDynamicInfo({
                          eventId: event.id,
                          status: 0,
                          token,
                          locale,
                        })
                      }
                      name="HEART_FILL"
                      size={23}
                      color={this.themeColor}
                    />
                  ) : (
                    <Icon
                      onPress={() =>
                        setFavoriteEventAndRetrieveDynamicInfo({
                          eventId: event.id,
                          status: 1,
                          token,
                          locale,
                        })
                      }
                      name="HEART"
                      size={23}
                      color={colors.GREY_DARK}
                    />
                  ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </Animated.View>
    );
  };

  handleScroll = ({ nativeEvent }) => {
    const posY = nativeEvent.contentOffset.y;

    Animated.timing(this.actBtnsOpacity, {
      toValue: posY > this.savedPositionY ? 0 : 1,
      duration: 300,
    }).start();
  };

  handleActionButtonsVisibility = ({ nativeEvent }) => {
    const posY = nativeEvent.contentOffset.y;
    if (posY > this.savedPositionY) {
      this.savedPositionY = posY;
    } else if (posY < this.savedPositionY - 50) {
      this.savedPositionY = posY;
    }
  };

  toggleRatingModalIfSignedIn = () => {
    const { isRatingModalVisible } = this.state;
    const { token } = this.props;
    if (token) {
      this.setState({ isRatingModalVisible: !isRatingModalVisible });
    }
  };

  _renderNavBarNavigator = () => {
    return <BackButton onPress={() => Navigation.pop(this.props.componentId)} />;
  };

  render() {
    const {
      event,
      ratingAndUpdateInProgress,
      rateEventAndRetrieveDynamicInfo,
      locale,
      token,
      settingFavoriteAndUpdateFailed,
      resetFavoringAndUpdateFailure,
      ratingAndUpdateFailed,
      resetRatingAndUpdateFailure,
      componentId,
      currentComponentId,
      similarActivities,
    } = this.props;
    const { isRatingModalVisible } = this.state;

    return (
      <View style={[layoutStyles.container, main.wrapper]}>
        <ScrollView
          scrollEventThrottle={0}
          onScroll={this.handleScroll}
          onScrollBeginDrag={this.handleActionButtonsVisibility}
          bounces={false}
          contentInsetAdjustmentBehavior="never"
        >
          <AnimatedLoadImage
            source={{ uri: event.imageHero.mobile }}
            style={main.backgroundImage}
          />

          <BackgroundDecorator
            backgroundColor={colors.TRANSPARENT}
            contentShapeColor={this.themeColor}
            componentId={componentId}
            currentComponentId={currentComponentId}
          >
            <View style={layoutStyles.container}>
              <AbsolutePositioningCard style={main.card}>
                {this._renderHeader()}

                {this._renderImageSlider()}

                {this._renderSponsors()}

                {this._renderEventInfo()}

                {this._renderMap()}

                {renderCustomHorizontalList(
                  similarActivities,
                  translate(TranslationEnum.SIMILAR_ACTIVITIES),
                  text.yourFestivitiesTitle,
                  () => null,
                  this.renderEventItem,
                  main.yourFestivitiesList,
                  false,
                  false
                )}
              </AbsolutePositioningCard>
            </View>
          </BackgroundDecorator>
        </ScrollView>

        <NavBar
          absolutePosition
          renderNavigatorActions={this._renderNavBarNavigator()}
          backgroundColor={colors.BLACK_ALPHA_60}
        />

        {!!token && (
          <RatingModal
            locale={locale}
            ratingInProgress={ratingAndUpdateInProgress}
            rateEvent={rateEventAndRetrieveDynamicInfo}
            event={event}
            isVisible={isRatingModalVisible}
            closeHandler={this.toggleRatingModalIfSignedIn}
            token={token}
            ratingAndUpdateFailed={ratingAndUpdateFailed}
            resetRatingAndUpdateFailure={resetRatingAndUpdateFailure}
          />
        )}

        <ErrorModal
          isVisible={settingFavoriteAndUpdateFailed}
          title={translate(TranslationEnum.ERROR)}
          body={translate(TranslationEnum.UNEXPECTED_ERROR_OCCURRED_TRY_AGAIN)}
          closeHandler={resetFavoringAndUpdateFailure}
        />

        {this._renderActionButtons()}
      </View>
    );
  }
}
