import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Confirm from '../../features/authentication/confirm/presentation/Confirm';
import SignUp from '../../features/authentication/signup/presentation/SignUp';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import Home from '../../features/home/presentation/Home';

export type RootStackParamList = {
  SignUp: undefined;
  Confirm: {email: string; password: string};
  Home: undefined;
};

export const AppStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const jwt = useSelector((state: RootState) => state.app.jwtToken);
  return (
    <Stack.Navigator
      initialRouteName={jwt !== '' ? 'Home' : 'SignUp'}
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
  );
};
