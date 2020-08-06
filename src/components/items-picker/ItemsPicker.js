import React, { Component } from 'react';
import { View, Text, Modal, Picker, Platform, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { main } from './style';
import { PlatformType } from '../../enum/PlatformType';
import GeneralButton from '../general-button';
import Icon from '../icon';
import { colors } from '../../theme';

/**
 * Description
 * @author ?
 * @class ItemsPicker
 */
export class ItemsPicker extends Component {
  /**
   * Definition of the prop types
   */
  static propTypes = {
    data: PropTypes.array.isRequired,
    shouldShow: PropTypes.bool.isRequired,
    handleChoseItem: PropTypes.func.isRequired,
    handleClosePicker: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
  };

  /**
   * Default Props
   */
  static defaultProps = {
    buttonText: 'Select',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: undefined,
      itemSelected: 0,
    };
  }

  componentWillUnmount = () => {
    this.setState({
      selectedItem: undefined,
      itemSelected: 0,
    });
  };

  handleChoseItem = () => {
    const { data } = this.props;
    let { selectedItem } = this.state;
    if (!selectedItem) {
      selectedItem = data[0].code; // eslint-disable-line
    }

    this.props.handleChoseItem(selectedItem);
  };

  handleClosePicker = () => {
    this.props.handleClosePicker();
  };

  handleSelectItem = (item, index) => {
    this.setState({ selectedItem: item.code, itemSelected: index });
  };

  keyExtractor = item => item.code;
  renderItem = ({ item, index }) => {
    return (
      <View style={main.itemWrapper}>
        <TouchableOpacity onPress={() => this.handleSelectItem(item, index)}>
          <Text style={[main.itemName, index === this.state.itemSelected && main.selectedItem]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  androidPickerRender = () => {
    const { data } = this.props;
    return (
      <View style={main.androidPickerWrapper}>
        <FlatList
          initialNumToRender={20}
          extraData={this.state}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  };

  render() {
    const { buttonText, shouldShow } = this.props;
    return (
      <Modal visible={shouldShow} transparent animationType="fade" onRequestClose={() => {}}>
        <Animatable.View
          ref={ref => {
            this.overlay = ref;
          }}
          animation="fadeIn"
          duration={700}
          useNativeDriver
          style={main.overlay}
        />
        <View style={main.container}>
          <Animatable.View
            ref={ref => {
              this.picker = ref;
            }}
            animation="slideInUp"
            easing="ease-out-expo"
            duration={600}
            useNativeDriver
            style={main.pickerWrapper}
          >
            <View style={main.pickerWrapper}>
              <View style={main.buttonsWrapper}>
                <View style={main.closeButton}>
                  <TouchableOpacity onPress={this.handleClosePicker}>
                    <Icon
                      style={main.closeButtonIcon}
                      name="CLOSE"
                      fontSize={15}
                      color={colors.GREY_DARK}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {Platform.OS === PlatformType.IOS ? (
                <Picker
                  selectedValue={this.state.selectedItem}
                  style={main.picker}
                  onValueChange={item => this.setState({ selectedItem: item })}
                >
                  {this.props.data.map((item, index) => (
                    <Picker.Item
                      key={`${item.code}-${index.toString()}`}
                      label={item.name}
                      value={item.code}
                    />
                  ))}
                </Picker>
              ) : (
                this.androidPickerRender()
              )}

              <View style={main.continueButtonWrapper}>
                <GeneralButton onPress={this.handleChoseItem} text={buttonText} />
              </View>
            </View>
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}
