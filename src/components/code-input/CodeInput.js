import React from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { main } from './style';
import KeyboardTypes from '../../enum/KeyboardTypes';

const CodeInput = ({ length, title, value, onChange, style, inputStyle }) => {
  const customOnChangeText = newVal => {
    if (newVal.length > length) {
      return;
    }
    if (newVal.length === length) {
      Keyboard.dismiss();
    }
    onChange(newVal);
  };

  const renderCharacters = () => {
    const characters = [];
    for (let i = 0; i < length; i++) {
      const key = `code-character-${i}`;
      characters.push(
        <View key={key} style={[main.characterBox, !value[i] && main.characterUnderline]}>
          <Text style={main.character}>{value[i]}</Text>
        </View>
      );
    }
    return characters;
  };

  return (
    <View style={[main.container, style]}>
      {!!title && <Text style={main.titleText}>{title}</Text>}
      <View style={[main.characterContainer, inputStyle]}>{renderCharacters()}</View>
      <View style={main.divider} />
      <TextInput
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onChangeText={customOnChangeText}
        keyboardType={KeyboardTypes.NUMBER}
        style={main.textInput}
      />
    </View>
  );
};

CodeInput.propTypes = {
  length: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  inputStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
CodeInput.defaultProps = {
  length: 6,
  title: undefined,
  value: '',
  style: {},
  inputStyle: {},
};

export default CodeInput;
