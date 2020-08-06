import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import Tags from 'react-native-tags';
import { View, Text, TouchableOpacity } from 'react-native';
import { main } from './style';
import MenuButton from '../../components/menu-button';
import { addTag, removeTag, getTags } from '../../utils/pushNotificationsUtils';
import { getTabIndexByPageName } from '../../navigation/navigator';
import Pages from '../../enum/Pages';

/**
 * Description
 * @author ?
 * @class Support
 */
export default class Support extends PureComponent {
  /**
   * Navigator styles
   */
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  /**
   * Definition of the prop types
   */
  static propTypes = {};

  /**
   * Default Props
   */
  static defaultProps = {};

  /**
   * Name of the page for the tracking
   */
  static displayName = 'Support';

  constructor(props) {
    super(props);

    this.state = {
      shouldShowMenu: false,
      userTags: [],
    };
  }

  componentDidMount = () => {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    getTags().then(tags => this.setState({ userTags: tags }));
  };

  componentDidAppear() {
    this.setState({
      shouldShowMenu: true,
    });
  }

  componentDidDisappear() {
    this.setState({
      shouldShowMenu: false,
    });
  }

  loadingMap() {
    // console.log('============');
    // console.log('Will Loading Map');
  }
  onDidFinishLoadingMap() {
    // console.log('============');
    // console.log('onDidFinishLoadingMap');
  }
  onDidFailLoadingMap() {
    // console.log('============');
    // console.log('onDidFinishLoadingMap');
  }

  handleOnChangeTag = tags => {
    const recentTag = tags[tags.length - 1];
    addTag(recentTag);
  };

  handleRemoveTag = (index, tagLabel /* , event , deleted */) => {
    // console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted');
    removeTag(tagLabel);
  };

  render() {
    const { shouldShowMenu, userTags } = this.state;
    return (
      <View style={main.container}>
        <Tags
          initialText=""
          textInputProps={{
            placeholder: 'Interests',
          }}
          initialTags={userTags}
          onChangeTags={this.handleOnChangeTag}
          onTagPress={this.handleRemoveTag}
          containerStyle={main.tagsContainer}
          inputStyle={main.tagsInput}
          renderTag={({ tag, index, onPress }) => (
            <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={main.tagTextWrapper}>
              <Text style={main.tagText}>{tag}</Text>
            </TouchableOpacity>
          )}
        />
        {shouldShowMenu && <MenuButton selectedMenuItem={getTabIndexByPageName(Pages.SUPPORT)} />}
      </View>
    );
  }
}
