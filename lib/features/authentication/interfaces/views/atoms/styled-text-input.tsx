import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';

interface StyledTextInputProps extends TextInputProps {
  placeholder: string;
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
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="grey"
      style={[styles.input, inputStyle]}
      secureTextEntry={secure}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
});

export default StyledTextInput;
