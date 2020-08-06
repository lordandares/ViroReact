import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { main, text, image } from './style';
import { layoutStyles } from '../../theme/styleguide';
import Icon from '../icon';
import { categoryIcons } from '../../enum/IconCharacter';
import { formatAbbreviatedNumber } from '../../utils/numberUtils';
import AnimatedLoadImage from '../animated-load-image';
import VisibilityDetector from '../visibility-detector/VisibilityDetector';
import { colors } from '../../theme';

export class EventItem extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    festivity: PropTypes.object.isRequired,
    imageShape: PropTypes.oneOf(['round', 'poster', 'rectangular']),
    venues: PropTypes.instanceOf(Map).isRequired,
  };

  static defaultProps = {
    onPress: () => {},
    imageShape: 'round',
  };

  constructor(props) {
    super(props);

    this.contentOpacity = new Animated.Value(0);
    this.isVisible = false;
    this.state = {
      loadedImage: false,
    };
  }

  handleVisibilityChange = visible => {
    if (this.visible !== visible) {
      if (visible && !this.state.loadedImage) this.setState({ loadedImage: true });
      Animated.timing(this.contentOpacity, {
        toValue: visible ? 1 : 0,
        duraion: visible ? 500 : 300,
      }).start();
    }
  };

  render() {
    const { festivity, imageShape, onPress, venues } = this.props;
    const imageStyles = image[imageShape];
    const iconContainerStyles = categoryIcons[festivity.category.id || festivity.category];

    return (
      <View style={layoutStyles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={layoutStyles.container}>
            <VisibilityDetector onChange={this.handleVisibilityChange}>
              <View
                style={[
                  layoutStyles.container,
                  main.eventItem,
                  imageShape === 'rectangular' && main.eventSliderItem,
                ]}
              >
                <View>
                  <AnimatedLoadImage
                    style={imageStyles}
                    source={this.state.loadedImage ? { uri: festivity.imageHero.thumbnail } : null}
                  />
                  <View
                    style={[
                      layoutStyles.flexCenter,
                      main.iconContainer,
                      imageShape === 'round'
                        ? main.iconContainerSmall
                        : [main.iconContainerBig, { backgroundColor: iconContainerStyles.color }],
                    ]}
                  >
                    <Icon
                      name={imageShape === 'round' ? 'CHEVRON_RIGHT' : iconContainerStyles.icon}
                      color={colors.WHITE}
                      size={imageShape === 'round' ? 8 : 25}
                    />
                  </View>
                </View>
              </View>
            </VisibilityDetector>
            <Animated.View
              style={[
                layoutStyles.container,
                main.contentContainer,
                { opacity: this.contentOpacity },
              ]}
            >
              <View style={layoutStyles.container}>
                <Text style={text.title} numberOfLines={2} ellipsizeMode="tail">
                  {festivity.name}
                </Text>
              </View>
              <Text style={text.zone} numberOfLines={1} ellipsizeMode="tail">
                {venues.get(festivity.venue).zone.name}
              </Text>
              <Text style={text.venue} numberOfLines={1} ellipsizeMode="tail">
                {venues.get(festivity.venue).name}
              </Text>
              <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
                <Icon name="PROFILE" color={colors.GREY_MEDIUM} size={17} />
                <Text style={text.likes}>{formatAbbreviatedNumber(festivity.likes)}</Text>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
