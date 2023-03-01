import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface AtomTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const AtomText: React.FC<AtomTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'System',
  },
});

export default AtomText;
