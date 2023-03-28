import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
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
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import Overlay from './atoms/Overlay';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatchSignUp] = useAtom(dispatchSignUpUseCaseAtom);
  const [error] = useAtom(errorAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom);

  const onLoginPressed = async () => {
    dispatchSignUp({email, password});
  };

  const handleSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  const handleResetPasswordPressed = () => {
    navigation.navigate('ResetPassword');
  };

  useEffect(() => {
    if (isSignedIn === true) {
      setIsSignedIn(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [isSignedIn, setIsSignedIn, navigation]);

  return (
    <View style={styles.loginContainer}>
      {isLoading && <StyledLoader />}
      <Overlay>
        <StyledInput
          labelText="Email*"
          testID="email-input"
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />

        <StyledInput
          labelText="Password*"
          placeholder={'Enter Password'}
          testID="password-input"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <StyledButton
          buttonStyle={styles.loginButton}
          testID="login"
          label="Login"
          onPress={onLoginPressed}
        />
      </Overlay>

      {<StyledErrorText>{error}</StyledErrorText>}

      <View style={styles.signUpButtonContainer}>
        <StyledButtonText label="Sign Up" onPress={handleSignUpPressed} />
      </View>
      <View style={styles.resetPasswordButtonContainer}>
        <StyledButtonText
          label="Forgot Password"
          onPress={handleResetPasswordPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: colors.background,
    padding: 20,
    flex: 1,
    paddingTop: '20%',
  },
  signUpButtonContainer: {
    marginTop: 5,
  },
  resetPasswordButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    marginTop: 20,
  },
});

export default Login;
