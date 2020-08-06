import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Map } from 'immutable';
import { main } from './style';
import MapCategory from '../../components/map-category/MapCategory';
import { CENTER_COORDINATE, COORDINATE, MAP_BOUNDS } from '../../enum/Maps';

export class MapFestivities extends PureComponent {
  static propTypes = {
    loadingEntities: PropTypes.bool.isRequired,
    venues: PropTypes.instanceOf(Map).isRequired,
    live: PropTypes.instanceOf(Map).isRequired,
    festivals: PropTypes.instanceOf(Map).isRequired,
    gaming: PropTypes.instanceOf(Map).isRequired,
    showsAndPerformance: PropTypes.instanceOf(Map).isRequired,
    entertainment: PropTypes.instanceOf(Map).isRequired,
    exhibitionsAndBusiness: PropTypes.instanceOf(Map).isRequired,
    restaurants: PropTypes.instanceOf(Map).isRequired,
    componentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
  };

  static displayName = 'MapFestivities';

  constructor(props) {
    super(props);
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

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  render() {
    const {
      venues,
      live,
      festivals,
      gaming,
      showsAndPerformance,
      entertainment,
      exhibitionsAndBusiness,
      restaurants,
      componentId,
    } = this.props;

    const points = [
      live,
      festivals,
      gaming,
      showsAndPerformance,
      entertainment,
      exhibitionsAndBusiness,
      restaurants,
    ];

    return (
      <View style={main.mapWrapper}>
        <MapCategory
          points={points}
          centerCoordinate={CENTER_COORDINATE}
          coordinate={COORDINATE}
          bounds={MAP_BOUNDS}
          componentId={componentId}
          venues={venues}
          closeModal={this.closeModal}
        />
      </View>
    );
  }
}

MapFestivities.propTypes = {
  componentId: PropTypes.string.isRequired,
  venues: PropTypes.instanceOf(Map).isRequired,
};
