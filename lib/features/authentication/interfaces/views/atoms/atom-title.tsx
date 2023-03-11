import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface AtomTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const AtomTitle: React.FC<AtomTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 34,
    margin: 10,
    color: '#333',
    fontFamily: 'System',
  },
});

export default AtomTitle;
