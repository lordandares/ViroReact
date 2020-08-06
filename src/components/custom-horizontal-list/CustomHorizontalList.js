import React, { PureComponent } from 'react';
import { Text, View, Dimensions, FlatList } from 'react-native';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import styles from './style';
import { layoutStyles } from '../../theme/styleguide';

export class CustomHorizontalList extends PureComponent {
  static propTypes = {
    ...View.propTypes,
    data: PropTypes.instanceOf(Map),
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object.isRequired,
    renderTitleActionButton: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    listStyle: PropTypes.object,
    sliderLayout: PropTypes.bool,
  };

  static defaultProps = {
    ...View.propTypes,
    renderTitleActionButton: () => null,
    sliderLayout: false,
    listStyle: {},
    data: Map({}),
  };

  flatListKeyExtractor = (item, index) => `${item.title}${index}`;

  render() {
    const {
      style,
      title,
      titleStyle,
      renderTitleActionButton,
      renderItem,
      data,
      listStyle,
      sliderLayout,
    } = this.props;

    return (
      <View style={style}>
        <View
          style={[
            layoutStyles.row,
            layoutStyles.alignCenter,
            layoutStyles.justifyBetween,
            styles.titleContainer,
          ]}
        >
          <Text style={titleStyle}>{title}</Text>
          {renderTitleActionButton()}
        </View>

        <View style={styles.listContainer}>
          {sliderLayout ? (
            <View style={[styles.list, listStyle]}>
              <Carousel
                ref={ref => {
                  this.carousel = ref;
                }}
                data={data.toArray().map(mapEntry => mapEntry[1])}
                enableSnap
                renderItem={renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 80}
                activeSlideAlignment="center"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />
            </View>
          ) : (
            <FlatList
              keyExtractor={this.flatListKeyExtractor}
              style={styles.list}
              contentContainerStyle={listStyle}
              data={data.toArray().map(mapEntry => mapEntry[1])}
              renderItem={renderItem}
              horizontal
              sliderWidth={Dimensions.get('window').width}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    );
  }
}
