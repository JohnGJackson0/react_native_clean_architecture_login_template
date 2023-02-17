import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Confirm from '../../features/authentication/confirm/presentation/Confirm';
import SignUp from '../../features/authentication/signup/presentation/SignUp';

export type RootStackParamList = {
  SignUp: undefined;
  Confirm: {email: string; password: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => (
  <Stack.Navigator
    initialRouteName="SignUp"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="Confirm"
      component={Confirm}
      initialParams={{email: '', password: ''}}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
