import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { main, emailForm } from './style';
import { colors } from '../../theme';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import FormTextInput from '../../components/form-text-input';

const EmailForm = ({ handleChange, values, errors }) => {
  return (
    <View style={emailForm.form}>
      <Text style={main.inputLabel}>Email Address</Text>
      <FormTextInput
        autoCapitalize="none"
        error={errors.email}
        handleChange={handleChange('email')}
        placeholder={translate(TranslationEnum.EMAIL_PLACEHOLDER)}
        value={values.email}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        textStyle={main.inputText}
        placeholderTextColor={colors.WHITE_ALPHA_60}
      />
    </View>
  );
};

EmailForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default EmailForm;
