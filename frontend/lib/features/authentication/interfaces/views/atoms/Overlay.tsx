import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

type OverlayProps = {
  children: ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({children}) => {
  return <View style={styles.overlayContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: colors.overlay,
    borderRadius: 20,
    padding: 20,
  },
});

export default Overlay;
