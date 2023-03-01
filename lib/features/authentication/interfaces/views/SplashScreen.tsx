import React from 'react';
import {StyleSheet, View} from 'react-native';
import AtomActivityIndicator from './atoms/atom-activity-indicator';

function SplashScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <AtomActivityIndicator />
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
