import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface ErrorTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const StyledErrorText: React.FC<ErrorTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.error,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});

export default StyledErrorText;
