import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './sliderEntry.style';
import { translate } from '../../../utils/Translator';
import TranslationEnum from '../../../enum/TranslationEnum';
import Icon from '../../icon';
import { formatAbbreviatedNumber } from '../../../utils/numberUtils';
import { colors } from '../../../theme';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool.isRequired,
    parallax: PropTypes.bool.isRequired,
    parallaxProps: PropTypes.object.isRequired,
    setCameraCoordinates: PropTypes.func.isRequired,
  };

  get image() {
    const {
      data: { imageHero },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: imageHero }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: imageHero }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { name, description, rate, priceFrom },
      setCameraCoordinates,
      even,
    } = this.props;

    const uppercaseTitle = name ? (
      <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
        {name.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          setCameraCoordinates([43.009, 21.594]);
        }}
      >
        <View style={styles.shadow} />
        <View style={styles.rowcontainer}>
          <View style={[styles.imageContainer]}>{this.image}</View>
          <View style={[styles.textContainer]}>
            {uppercaseTitle}
            <View style={styles.row}>
              <Icon name="STAR" color={colors.GREY_MEDIUM} size={17} />
              <Text style={styles.row}>{formatAbbreviatedNumber(rate)}</Text>
            </View>
            <Text style={[styles.subtitle]} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <View style={[styles.textContainerCost]}>
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
              {translate(TranslationEnum.COST)}
            </Text>
            <Text style={[styles.subtitle]} numberOfLines={2}>
              {`$ '${priceFrom}'`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
