import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import Pages from '../../enum/Pages';
import { FestivitiesComponent } from '../../components/FestivitiesComponent/FestivitiesComponent';

export class Festivities extends PureComponent {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  static navigatorStyle = {};

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
    currentComponentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
    setSelectedEventId: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  static displayName = 'Festivities';

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

  navigationComnponent = (component, options = {}) => {
    return typeof component === 'string'
      ? { component: { id: component, name: component, options } }
      : component;
  };

  sendToMap = () =>
    Navigation.showModal({
      component: {
        name: Pages.MAP_FESTIVITIES,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
          },
        },
      },
    });

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
      currentComponentId,
      setCurrentComponentId,
      setSelectedEventId,
    } = this.props;
    return (
      <FestivitiesComponent
        searchText="Text"
        sendToMap={this.sendToMap}
        venues={venues}
        live={live}
        festivals={festivals}
        gaming={gaming}
        showsAndPerformance={showsAndPerformance}
        entertainment={entertainment}
        exhibitionsAndBusiness={exhibitionsAndBusiness}
        restaurants={restaurants}
        componentId={componentId}
        currentComponentId={currentComponentId}
        setCurrentComponentId={setCurrentComponentId}
        setSelectedEventId={setSelectedEventId}
      />
    );
  }
}
