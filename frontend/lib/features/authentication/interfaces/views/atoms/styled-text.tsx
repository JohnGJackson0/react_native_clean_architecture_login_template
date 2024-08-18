import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface TextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const StyledText: React.FC<TextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'System',
    margin: 5,
  },
});

export default StyledText;
