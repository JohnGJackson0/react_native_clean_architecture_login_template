import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

interface ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

const StyledLoader: React.FC<ActivityIndicatorProps> = ({
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default StyledLoader;
