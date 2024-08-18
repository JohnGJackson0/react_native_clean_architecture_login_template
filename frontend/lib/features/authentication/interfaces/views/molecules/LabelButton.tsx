import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import StyledText from '../atoms/styled-text';

interface ButtonLabelProps {
  label: string;
  buttonLabel: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const LabelButton: React.FC<ButtonLabelProps> = ({
  onPress,
  label,
  buttonLabel,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <StyledText style={styles.buttonText}>{buttonLabel}</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
  },
  textContainer: {
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'center',
  },
  button: {},
  buttonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default LabelButton;
