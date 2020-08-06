import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Map } from 'immutable';
import { cloneDeep } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { main } from './style';
import CloseButton from '../../components/close-button/';
import Pill from '../../components/pill';
import GeneralButton from '../../components/general-button/';
import TextChevronButton from '../../components/text-chevron-button';
import { colors } from '../../theme';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import { layoutStyles } from '../../theme/styleguide';
import NavBar from '../../components/nav-bar/NavBar';

export default class PickInterests extends PureComponent {
  static propTypes = {
    tags: PropTypes.instanceOf(Map).isRequired,
    userTags: PropTypes.instanceOf(Map).isRequired,
    setHasSkippedTagSelection: PropTypes.func.isRequired,
    saveUserTags: PropTypes.func.isRequired,
    componentId: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  static displayName = 'PickInterests';

  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);

    const { tags, userTags } = props;
    const selectedTagsMap = {};
    tags.forEach(tag => {
      selectedTagsMap[tag.id] = !!userTags.get(tag.id);
    });

    this.state = {
      selectedTagsMap,
    };
  }

  closeHandler = () => {
    const { componentId } = this.props;
    return Navigation.dismissModal(componentId);
  };

  pressTagHandler = pressedTagId => {
    const { selectedTagsMap } = this.state;
    const newSelectedTagsMap = cloneDeep(selectedTagsMap);
    newSelectedTagsMap[pressedTagId] = !newSelectedTagsMap[pressedTagId];
    this.setState({ selectedTagsMap: newSelectedTagsMap });
  };

  finishHandler = () => {
    const { saveUserTags } = this.props;
    const { selectedTagsMap } = this.state;
    saveUserTags(selectedTagsMap);
    return this.closeHandler();
  };

  skipHandler = () => {
    const { setHasSkippedTagSelection } = this.props;
    setHasSkippedTagSelection();
    return this.closeHandler();
  };

  renderTags = () => {
    const { tags } = this.props;
    const { selectedTagsMap } = this.state;
    return (
      <View style={main.tagContainer}>
        {tags.toArray().map(mapEntry => {
          const tag = mapEntry[1];
          return (
            <View key={`tag${tag.id}`} style={main.tagItemWrapper}>
              <Pill
                text={tag.name}
                activeColor={colors.INSPIRE}
                inactiveColor={colors.GREY_DISABLED}
                onPress={() => {
                  this.pressTagHandler(tag.id);
                }}
                isActive={selectedTagsMap[tag.id]}
              />
            </View>
          );
        })}
      </View>
    );
  };

  _renderNavBarNavigator = () => {
    return <CloseButton onPress={this.closeHandler} style={main.closeButton} />;
  };

  render() {
    return (
      <View style={main.container}>
        <ScrollView
          style={[layoutStyles.container, main.scroll]}
          contentContainerStyle={[main.scrollContainer, layoutStyles.flexCenter]}
          showsVerticalScrollIndicator={false}
        >
          <View>{this.renderTags()}</View>
        </ScrollView>
        <LinearGradient
          colors={[colors.WHITE, colors.WHITE_ALPHA_90, 'rgba(255, 255, 255, 0)']}
          style={main.headerContainer}
        >
          <View>
            <Text style={main.titleText}>{translate(TranslationEnum.PICK_INTERESTS_TITLE)}</Text>
          </View>
        </LinearGradient>
        <NavBar renderNavigatorActions={this._renderNavBarNavigator()} absolutePosition />

        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', colors.WHITE_ALPHA_90, colors.WHITE]}
          style={main.buttonsContainer}
        >
          <GeneralButton
            text={translate(TranslationEnum.FINISH)}
            onPress={this.finishHandler}
            textStyle={main.buttonText}
            style={main.button}
          />
          <TextChevronButton
            text={translate(TranslationEnum.SKIP)}
            onPress={this.skipHandler}
            colorName={colors.INSPIRE}
            iconSize={8}
            style={main.skipButton}
            textStyle={main.skipText}
          />
        </LinearGradient>
      </View>
    );
  }
}
