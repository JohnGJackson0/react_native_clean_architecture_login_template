import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../views/SignUp';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import Home from '../views/Home';
import Confirm from '../views/Confirm';

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
