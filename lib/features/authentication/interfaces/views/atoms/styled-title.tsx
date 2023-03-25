import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface TextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const StyledTitle: React.FC<TextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 34,
    margin: 10,
    color: colors.title,
    fontFamily: 'System',
  },
});

export default StyledTitle;
