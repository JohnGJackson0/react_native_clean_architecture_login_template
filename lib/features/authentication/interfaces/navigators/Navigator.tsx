import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Confirm from '../views/Confirm';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import SplashScreen from '../views/SplashScreen';

export type RootStackParamList = {
  SignUp: undefined;
  Confirm: {email: string; password: string};
  Home: undefined;
};

export const AppStack = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    userLoggedIn();
  }, []);

  const userLoggedIn = async () => {
    const resp = await AppIOCContainer.get(
      'VerifyStoredAuthTokenUseCase',
    ).execute();

    E.fold(
      _error => {
        setIsUserLoggedIn(false);
      },
      (value: boolean) => {
        setIsUserLoggedIn(value);
      },
    )(resp);
  };
  return (
    <>
      {isUserLoggedIn === null ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          initialRouteName={isUserLoggedIn ? 'Home' : 'SignUp'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Confirm"
            component={Confirm}
            initialParams={{email: '', password: ''}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </>
  );
};
