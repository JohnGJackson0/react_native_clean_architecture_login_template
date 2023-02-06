import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function SplashScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
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
