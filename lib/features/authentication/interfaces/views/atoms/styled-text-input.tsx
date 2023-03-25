import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface StyledTextInputProps extends TextInputProps {
  placeholder: string;
  labelText?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  secure?: boolean;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  inputStyle,
  secure,
  labelText,
  ...rest
}) => {
  return (
    <>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        secureTextEntry={secure}
        placeholderTextColor={colors.inputPlaceholderTextColor}
        selectionColor={colors.inputCursorColor}
        {...rest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBackgroundColor,
    borderColor: colors.inputBorderColor,
    color: colors.inputTextColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  label: {
    color: colors.inputLabelColor,
    marginBottom: 6,
    marginTop: 9,
  },
});

export default StyledTextInput;
