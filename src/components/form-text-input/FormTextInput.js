import React from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { text } from './style';
import colors from '../../theme/colors';

export const FormTextInput = props => (
  <View>
    <TextInput
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={props.autoCapitalize}
      style={[text.input, props.textStyle]}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={props.handleChange}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      textContentType={props.textContentType}
      autoCompleteType={props.autoCompleteType}
      editable={props.editable}
      maxLength={props.maxLength}
    />
    <Text style={text.validation}>{props.error}</Text>
  </View>
);

FormTextInput.propTypes = {
  autoCapitalize: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholderTextColor: PropTypes.string,
  editable: PropTypes.bool,
  maxLength: PropTypes.number,
};

FormTextInput.defaultProps = {
  autoCapitalize: 'none',
  error: '',
  keyboardType: 'default',
  secureTextEntry: false,
  textContentType: 'none',
  autoCompleteType: 'off',
  textStyle: {},
  placeholderTextColor: colors.WHITE_ALPHA_50,
  editable: true,
  maxLength: 50,
};
