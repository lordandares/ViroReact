import React, { useState } from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { main } from './style';
import NavHorizontalCategories from '../nav-horizontal-categories';
import SliderEntry from './helpers/slideEntry';
import { itemWidth } from './helpers/sliderEntry.style';
import Adapter, { carrouselAdapter } from './helpers/adapter';
import { layerStyles, layoutStyles, metrics } from '../../theme/styleguide';
import { CloseButton } from '../close-button/CloseButton';
import Parallelogram from '../parallelogram';
import { colors } from '../../theme';
import NavBar from '../nav-bar/NavBar';

const renderNavBarNavigator = action => {
  return <CloseButton onPress={action} />;
};
const MapCategory = props => {
  const { points, centerCoordinate, bounds, venues } = props;
  // eslint-disable-next-line no-unused-vars
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(1);
  const [categoryFiltered, setCategoryFiltered] = useState('0');
  const [cameraCoordinates, setCameraCoordinates] = useState(centerCoordinate);
  const pointCarousel = carrouselAdapter(points);
  // const pointCarousel = points.flat();

  const collections = Adapter(points, venues, categoryFiltered);
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
        venues={props.venues}
      />
    );
  };

  const setCord = cord => {
    // eslint-disable-next-line no-alert
    // alert('This will navigate to description card');
    return setCameraCoordinates(cord);
  };

  return (
    <View style={layoutStyles.container}>
      <View style={main.header}>
        <NavBar renderNavigatorActions={renderNavBarNavigator(props.closeModal)} />
        <NavHorizontalCategories
          layoutstate={categoryFiltered}
          setlayoutstate={setCategoryFiltered}
        />
      </View>

      <View style={layoutStyles.container}>
        <View style={layoutStyles.container}>
          <View style={main.mapWrapper}>
            {collections ? (
              <MapboxGL.MapView
                style={main.map}
                showUserLocation
                zoomEnabled
                logoEnabled={false}
                contentInset={8}
                styleURL={MapboxGL.StyleURL.Light}
                compassEnabled={false}
              >
                <MapboxGL.Camera
                  bounds={bounds}
                  zoomLevel={6}
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
      </View>

      <View style={main.footer}>
        <Parallelogram color={colors.EXPLORE} style={main.footerBackground} height={100} />
        <Carousel
          data={pointCarousel}
          renderItem={_renderItemWithParallax}
          sliderWidth={metrics.deviceWidth}
          firstItem={slider1ActiveSlide}
          itemWidth={itemWidth}
          hasParallaxImages
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={main.slider}
          contentContainerCustomStyle={main.sliderContentContainer}
          activeSlideAlignment="center"
          onSnapToItem={index => setSlider1ActiveSlide(index)}
        />
      </View>
    </View>
  );
};

MapCategory.propTypes = {
  points: PropTypes.any.isRequired,
  centerCoordinate: PropTypes.array.isRequired,
  coordinate: PropTypes.array.isRequired,
  bounds: PropTypes.object.isRequired,
  venues: PropTypes.any.isRequired,
  closeModal: PropTypes.func.isRequired,
};
MapCategory.defaultProps = {};

export default MapCategory;
