import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { main } from './style';
import SliderEntry from './helpers/slideEntry';
import categoryMapIcons from './helpers/icons';
import { sliderWidth, itemWidth } from './helpers/sliderEntry.style';
import Adapter from './helpers/adapter';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';

/**
 * Description
 * @author ?
 * @class SearchMapComponent
 */

const layerStyles = icon => {
  return {
    iconImage: categoryMapIcons[icon + 1],
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    iconSize: 1,
  };
};

const SearchMapComponent = props => {
  const { points, centerCoordinate, bounds } = props;
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
  const [cameraCoordinates, setCameraCoordinates] = useState(centerCoordinate);
  points.forEach((item, i) => {
    item.itemCarrousel = i + 1;
  });
  const collections = Adapter(points);
  const onSourceLayerPress = e => {
    const feature = e.nativeEvent.payload;
    setSlider1ActiveSlide(parseInt(feature.id, 10));
  };

  // eslint-disable-next-line react/prop-types
  const _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        setCameraCoordinates={setCord}
        even={(index + 1) % 2 === 0}
        parallax
        parallaxProps={parallaxProps}
      />
    );
  };

  const setCord = cord => {
    // eslint-disable-next-line no-alert
    alert('This will navigate to description card');
    return setCameraCoordinates(cord);
  };

  return (
    <View style={main.container}>
      <View style={main.header}>
        <Text style={main.titleHeader}>
          {translate(TranslationEnum.SEARCH_MAP_RESULT_TITLE, {
            number: points.length,
            name: points[0].category.name,
          })}
        </Text>
      </View>
      <View style={main.mapContent}>
        <View style={main.mapWrapper}>
          {collections ? (
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
                bounds={bounds}
                zoomLevel={3}
                animationDuration={2000}
                animationMode="flyTo"
                centerCoordinate={cameraCoordinates}
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
                      onPress={onSourceLayerPress}
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
          ) : null}
        </View>
      </View>
      <View style={main.footer}>
        <View style={main.triangle} />
      </View>
      <View style={main.footerSlide}>
        <Carousel
          data={points}
          renderItem={_renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          firstItem={slider1ActiveSlide}
          inactiveSlideScale={10.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={main.slider}
          contentContainerCustomStyle={main.sliderContentContainer}
          loop
          loopClonesPerSide={2}
          activeSlideAlignment="start"
          // autoplay
          // autoplayDelay={500}
          // autoplayInterval={3000}
          onSnapToItem={index => setSlider1ActiveSlide(index)}
        />
      </View>
    </View>
  );
};

SearchMapComponent.propTypes = {
  points: PropTypes.array.isRequired,
  centerCoordinate: PropTypes.array.isRequired,
  coordinate: PropTypes.array.isRequired,
  bounds: PropTypes.object.isRequired,
};
SearchMapComponent.defaultProps = {};

export default SearchMapComponent;
