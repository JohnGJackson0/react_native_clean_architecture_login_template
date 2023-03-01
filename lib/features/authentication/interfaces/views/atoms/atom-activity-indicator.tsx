import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

interface AtomActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

const AtomActivityIndicator: React.FC<AtomActivityIndicatorProps> = ({
  size = 'large',
  color = '#000000',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} testID="loading" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AtomActivityIndicator;
