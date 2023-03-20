import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
import StyledTitle from './atoms/styled-title';
import StyledButtonText from './atoms/styled-button-text';
import {useAtom} from 'jotai';
import {
  dispatchSignUpUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  isSignedInAtom,
} from '../state/login';
import StyledErrorText from './atoms/styled-error-text';
import StyledLoader from './atoms/styled-loader';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatchSignUp] = useAtom(dispatchSignUpUseCaseAtom);
  const [error] = useAtom(errorAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSignedIn] = useAtom(isSignedInAtom);

  const onLoginPressed = async () => {
    dispatchSignUp({email, password});
  };

  const handleSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    if (isSignedIn === true) {
      navigation.navigate('Home');
    }
  }, [isSignedIn, navigation]);

  return (
    <View style={styles.loginContainer}>
      {isLoading && <StyledLoader />}
      <>
        <StyledTitle>Log In</StyledTitle>

        <StyledInput
          testID="email-input"
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />

        <StyledInput
          placeholder={'Enter Password'}
          testID="password-input"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <StyledButton testID="login" label="Login" onPress={onLoginPressed} />
      </>
      <View style={styles.signUpButtonContainer}>
        <StyledButtonText label="Sign Up" onPress={handleSignUpPressed} />
      </View>
      {error !== '' && <StyledErrorText>{error}</StyledErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    marginTop: '30%',
    flex: 1,
  },
  signUpButtonContainer: {
    marginTop: 20,
  },
});

export default Login;
