import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

interface ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

const StyledLoader: React.FC<ActivityIndicatorProps> = ({
  size = 'large',
  color = colors.loadingIndicator,
}) => {
  return (
    <ActivityIndicator
      style={styles.container}
      size={size}
      color={color}
      testID="loading"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
});

export default StyledLoader;
