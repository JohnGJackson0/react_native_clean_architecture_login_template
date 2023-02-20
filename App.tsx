import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {store} from './lib/core/ui/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './lib/features/splashScreen/presentation/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './lib/core/ui/Navigator';

export const persistor = persistStore(store);

function App(): JSX.Element {
  return (
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <AppStack />
          </SafeAreaView>
        </Provider>
      </NavigationContainer>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
});

export default App;
