import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { main, text } from './style';

export const PickerInput = props => (
  <View>
    <View style={main.pickerInputContainer}>
      <Text
        style={[text.pickerInput, main.container, !props.value && text.placeholderColor]}
        onPress={props.onPress}
      >
        {props.value || props.placeholder}
      </Text>
      <Text onPress={props.onPress} style={text.pickerInput}>
        >
      </Text>
    </View>
    <Text style={text.validation}>{props.error}</Text>
  </View>
);

PickerInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  error: PropTypes.string,
};

PickerInput.defaultProps = {
  error: '',
};
