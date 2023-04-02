import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import Confirm from '../views/Confirm';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import SplashScreen from '../views/molecules/SplashScreen';
import Login from '../views/Login';
import ResetPassword from '../views/ResetPassword';
import PasswordResetVerification from '../views/PasswordResetVerification';
import Welcome from '../views/Welcome';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';

export type RootStackParamList = {
  SignUp: undefined;
  Confirm: {email: string; password: string};
  Home: undefined;
  Login: undefined;
  ResetPassword: undefined;
  PasswordResetVerification: {email: string};
  Welcome: undefined;
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
          initialRouteName={isUserLoggedIn ? 'Home' : 'Login'}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.title,
            headerTitleStyle: {
              fontSize: 33,
            },
          }}>
          <Stack.Screen
            name="Confirm"
            component={Confirm}
            initialParams={{email: '', password: ''}}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: 'Sign up'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{title: 'Reset Password'}}
          />
          <Stack.Screen
            initialParams={{email: ''}}
            name="PasswordResetVerification"
            component={PasswordResetVerification}
            options={{title: 'Password Reset Confirm'}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#000000',
              },
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};
