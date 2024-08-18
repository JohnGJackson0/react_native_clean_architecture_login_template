import React from 'react';
import {Text, StyleSheet, TextStyle, View} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface SuccessTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

const StyledSuccessText: React.FC<SuccessTextProps> = ({children, style}) => {
  return (
    <View style={styles.errorContainer}>
      {children !== '' && <Text style={[styles.text, style]}>{children}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.success,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  errorContainer: {
    height: 60,
    marginVertical: 10,
    marginTop: 20,
  },
});

export default StyledSuccessText;
