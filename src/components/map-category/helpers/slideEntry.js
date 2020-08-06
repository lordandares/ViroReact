import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './sliderEntry.style';
import Icon from '../../icon';
import { formatAbbreviatedNumber } from '../../../utils/numberUtils';
import { colors } from '../../../theme';
import { layoutStyles } from '../../../theme/styleguide';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool.isRequired,
    parallax: PropTypes.bool.isRequired,
    parallaxProps: PropTypes.object.isRequired,
    setCameraCoordinates: PropTypes.func.isRequired,
    venues: PropTypes.any.isRequired,
  };

  render() {
    const {
      data: { name, rate, imageHero, venue },
      setCameraCoordinates,
      venues,
    } = this.props;

    return (
      <View style={styles.slideOuterContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setCameraCoordinates([43.009, 21.594]);
          }}
        >
          <View style={styles.slideInnerContainer}>
            <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
              <Image source={{ uri: imageHero.full }} style={styles.image} />
              <View style={layoutStyles.container}>
                <View>
                  <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                    {name}
                  </Text>
                </View>
                <Text style={styles.zone}>{venues.get(venue).zone.name}</Text>
                <Text style={styles.venue}>{venues.get(venue).name}</Text>
                <View style={[layoutStyles.row, layoutStyles.alignCenter]}>
                  <Icon name="PROFILE" color={colors.GREY_MEDIUM} size={17} />
                  <Text style={styles.textLikes}>{formatAbbreviatedNumber(rate)}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
