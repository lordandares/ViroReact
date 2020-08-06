import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  I18nManager,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import Icon from '../icon';
import TranslationEnum from '../../enum/TranslationEnum';
import { translate } from '../../utils/Translator';
import { main } from './style';
import { colors, images } from '../../theme';
import { mainNavigationPages, navigationComponent } from '../../navigation/navigator';
import { PlatformType } from '../../enum/PlatformType';
import Pages from '../../enum/Pages';
import { layoutStyles } from '../../theme/styleguide';

/**
 * Description
 * @author ?
 * @class MenuButton
 */
// function MenuButton(props) {
export default class MenuButton extends Component {
  static propTypes = {
    selectedMenuItem: PropTypes.number,
    isButtonVisible: PropTypes.bool,
  };

  static defaultProps = {
    selectedMenuItem: 0,
    isButtonVisible: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      coverBackgroundColor: colors.FANTASY,
      selectedMenuItem: props.selectedMenuItem,
    };

    this.menuItems = mainNavigationPages;
  }

  showMenu = () => {
    const { isVisible } = this.state;
    this.button &&
      this.button.transitionTo({ scale: 25, backgroundColor: colors.WHITE }, 250, 'ease-in');
    this.buttonIcon && this.buttonIcon.transitionTo({ opacity: 0 }, 100, 'ease-in');
    setTimeout(() => this.setState({ isVisible: !isVisible }), 300);
  };

  handleSelectMenu = id => {
    const { selectedMenuItem } = this.state;
    const selectedPage = mainNavigationPages.find(item => item.id === id);
    const selectedPageIndex = mainNavigationPages.findIndex(item => item.id === id);
    if (this.normalizeIndexes(selectedPageIndex) !== selectedMenuItem) return;

    this.setState({ coverBackgroundColor: selectedPage.color });

    this.cover && this.cover.transitionTo({ scale: 900 }, 250, 'ease-out');

    setTimeout(() => {
      this.cover && this.cover.transitionTo({ scale: 1 }, 400);
      this.setState({ isVisible: false });

      this.button &&
        this.button.transitionTo({
          backgroundColor: selectedPage.color,
        });

      setTimeout(() => {
        Navigation.mergeOptions('BottomTabs', {
          bottomTabs: {
            currentTabIndex: selectedPageIndex,
          },
        });
      }, 300);

      setTimeout(() => this.button && this.button.transitionTo({ scale: 1 }), 400);
      setTimeout(() => this.buttonIcon && this.buttonIcon.transitionTo({ opacity: 1 }), 1000);

      setTimeout(
        () => this.button && this.button.transitionTo({ backgroundColor: colors.WHITE }),
        800
      );
    }, 400);
  };

  handleOpenCloseMenu = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  handleOnSnap = index => {
    this.setState({ selectedMenuItem: index });
  };

  handleOpenSettings = () => {
    this.setState({ isVisible: false });
    this.cover && this.cover.transitionTo({ scale: 1 }, 200);
    this.button && this.button.transitionTo({ scale: 1 });
    this.button && this.button.transitionTo({ backgroundColor: colors.WHITE });
    setTimeout(
      () =>
        Navigation.showModal({
          stack: {
            children: [navigationComponent(Pages.SETTINGS)],
          },
        }),
      700
    );
  };

  normalizeIndexes = index => {
    if (Platform.OS === PlatformType.IOS) return index;
    return I18nManager.isRTL ? this.menuItems.length - 1 - index : index;
  };

  // eslint-disable-next-line
  renderItem = ({ item, index }) => {
    return (
      <Animatable.View
        style={main.slideWrapper}
        animation="slideInUp"
        delay={100 * index}
        useNativeDriver
      >
        <TouchableWithoutFeedback onPress={() => this.handleSelectMenu(item.id)}>
          <View style={[layoutStyles.alignStart, main.slide, { backgroundColor: item.color }]}>
            <Text style={main.slideIndexText}>{`0${index + 1}`}</Text>
            <Text style={main.slideTitleText}>{translate(TranslationEnum[item.title])}</Text>
            {/* <Text style={main.slideSubTitleText}>{item.subTitle}</Text> */}
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  };

  render() {
    const { coverBackgroundColor, isVisible } = this.state;
    const { isButtonVisible, selectedMenuItem } = this.props;

    return (
      <View style={main.container} pointerEvents="box-none">
        {isButtonVisible ? (
          <TouchableOpacity onPress={this.showMenu}>
            <View>
              <Animatable.View
                ref={ref => {
                  this.button = ref;
                }}
                style={main.mainCircularBg}
              />

              <Animatable.View
                ref={ref => {
                  this.buttonIcon = ref;
                }}
                style={[layoutStyles.flexCenter, main.mainCircularButton]}
              >
                <Icon name="MENU" size={30} color={colors.GREY_DARK} onPress={this.showMenu} />
              </Animatable.View>
            </View>
          </TouchableOpacity>
        ) : (
          <Animatable.View
            ref={ref => {
              this.button = ref;
            }}
            style={[main.mainCircularButton, { backgroundColor: colors.TRANSPARENT }]}
          />
        )}
        <Modal
          visible={isVisible}
          transparent
          animationType="fade"
          onRequestClose={this.handleOpenCloseMenu}
        >
          {isVisible && (
            <Animatable.View animation="fadeIn" useNativeDriver style={main.menuContainer}>
              <View style={main.menuHeaderWrapper}>
                <TouchableWithoutFeedback
                  onPress={this.handleOpenSettings}
                  hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                >
                  <View style={main.menuSettingsWrapper}>
                    <Icon name="SETTINGS" color={colors.BLACK} size={28} />
                    <Text style={main.settingsText}>{translate(TranslationEnum.SETTINGS)}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={main.logoImageWrapper}>
                  <Image source={images.LOGO_COLOR} style={main.menuLogo} />
                </View>
              </View>
              <Carousel
                ref={c => {
                  this.carousel = c;
                }}
                data={this.menuItems}
                renderItem={this.renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width - 80}
                onSnapToItem={this.handleOnSnap}
                firstItem={this.normalizeIndexes(selectedMenuItem)}
                // firstItem={selectedMenuItem}
                // contentContainerCustomStyle={
                //   Platform.OS === 'android' && {
                //     flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                //   }
                // }
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                useScrollView
              />
              <Animatable.View
                ref={ref => {
                  this.cover = ref;
                }}
                pointerEvents="none"
                style={[main.slideCover, { backgroundColor: coverBackgroundColor }]}
              />
            </Animatable.View>
          )}
        </Modal>
      </View>
    );
  }
}
