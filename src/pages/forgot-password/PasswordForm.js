import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { main, passwordForm } from './style';
import { colors } from '../../theme';
import { translate } from '../../utils/Translator';
import TranslationEnum from '../../enum/TranslationEnum';
import FormTextInput from '../../components/form-text-input';
import CodeInput from '../../components/code-input';

const PasswordForm = ({ handleChange, values, errors }) => {
  return (
    <View style={passwordForm.form}>
      <View>
        <CodeInput
          value={values.code}
          onChange={handleChange('code')}
          title={translate(TranslationEnum.ENTER_6_DIGIT_CODE)}
          inputStyle={passwordForm.codeInput}
        />
        <Text style={[main.inputLabel, passwordForm.passwordLabel]}>
          {translate(TranslationEnum.PASSWORD_PLACEHOLDER)}
        </Text>
        <FormTextInput
          secureTextEntry
          autoCapitalize="none"
          error={errors.password || translate(TranslationEnum.MUST_CONTAIN_PASSWORD)}
          handleChange={handleChange('password')}
          placeholder={translate(TranslationEnum.NEW_PASSWORD_PLACEHOLDER)}
          value={values.password}
          textStyle={main.inputText}
          placeholderTextColor={colors.WHITE_ALPHA_60}
        />
        <Text style={[main.inputLabel, passwordForm.repeatPasswordLabel]}>
          {translate(TranslationEnum.REPEAT_PASSWORD_PLACEHOLDER)}
        </Text>
        <FormTextInput
          secureTextEntry
          autoCapitalize="none"
          error={errors.confirmPassword}
          handleChange={handleChange('confirmPassword')}
          placeholder={translate(TranslationEnum.REPEAT_NEW_PASSWORD_PLACEHOLDER)}
          value={values.confirmPassword}
          textStyle={main.inputText}
          placeholderTextColor={colors.WHITE_ALPHA_60}
        />
      </View>
    </View>
  );
};

PasswordForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default PasswordForm;
