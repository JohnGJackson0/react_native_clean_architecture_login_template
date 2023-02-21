import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Home(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
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

export default Home;
