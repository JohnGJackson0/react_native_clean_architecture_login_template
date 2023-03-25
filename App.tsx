import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './lib/features/authentication/interfaces/navigators/Navigator';
import {Provider as JotaiProvider} from 'jotai';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <JotaiProvider>
        <SafeAreaView style={styles.container}>
          <AppStack />
        </SafeAreaView>
      </JotaiProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
});

export default App;
