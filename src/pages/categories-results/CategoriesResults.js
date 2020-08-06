import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import CategoriesResultComponent from '../../components/categories-result-component';

export class CategoriesResults extends PureComponent {
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

  static propTypes = {
    componentId: PropTypes.string.isRequired,
    searchQuery: PropTypes.any,
    searchResults: PropTypes.any.isRequired,
    venues: PropTypes.instanceOf(Map).isRequired,
    currentComponentId: PropTypes.string.isRequired,
    setCurrentComponentId: PropTypes.func.isRequired,
    setSelectedEventId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    searchQuery: null,
  };

  render() {
    const {
      componentId,
      searchQuery,
      searchResults,
      venues,
      currentComponentId,
      setSelectedEventId,
    } = this.props;
    return (
      <CategoriesResultComponent
        componentId={componentId}
        currentComponentId={currentComponentId}
        searchQuery={searchQuery}
        searchResults={searchResults}
        venues={venues}
        setSelectedEventId={setSelectedEventId}
      />
    );
  }
}
