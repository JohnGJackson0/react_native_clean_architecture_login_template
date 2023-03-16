import React from 'react';
import {StyleSheet, View} from 'react-native';
import StyledLoader from '../atoms/styled-loader';

function SplashScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <StyledLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
