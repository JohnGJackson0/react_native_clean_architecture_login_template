import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {store} from './lib/features/authentication/signup/presentation/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './lib/features/splashScreen/presentation/SplashScreen';
import SignUp from './lib/features/authentication/signup/presentation/SignUp';
import configureDI from './lib/core/ioc/container';

export const persistor = persistStore(store);
export const AppIOCContainer = configureDI();

function App(): JSX.Element {
  return (
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <SignUp />
        </SafeAreaView>
      </Provider>
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
