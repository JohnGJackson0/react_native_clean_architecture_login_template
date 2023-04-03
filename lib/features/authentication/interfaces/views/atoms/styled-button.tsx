import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const StyledButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  buttonStyle,
  labelStyle,
  testID,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      testID={testID}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonBackground,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 55,
  },
  label: {
    fontSize: 16,
    color: colors.buttonLabel,
    fontWeight: 'bold',
  },
});

export default StyledButton;
