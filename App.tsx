import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './lib/features/authentication/interfaces/navigators/Navigator';
import {Provider as JotaiProvider} from 'jotai';
import {colors} from './tests/lib/features/authentication/interfaces/theme/colors';

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
    backgroundColor: colors.background,
  },
});

export default App;
