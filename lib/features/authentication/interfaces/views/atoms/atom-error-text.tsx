import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface AtomErrorTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const AtomErrorText: React.FC<AtomErrorTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FF3B30',
    fontFamily: 'System',
  },
});

export default AtomErrorText;
