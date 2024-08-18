import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HEADER_HEIGHT, RootStackParamList} from '../navigators/Navigator';
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
import StyledTitle from './atoms/styled-title';
import ButtonLabel from './molecules/LabelButton';

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
    <KeyboardAvoidingView
      keyboardVerticalOffset={HEADER_HEIGHT}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={styles.loginContainer}>
      {isLoading && <StyledLoader />}

      <StyledTitle style={styles.signInTitle}>Sign in</StyledTitle>

      <StyledInput
        labelText="Email"
        testID="email-input"
        placeholder="Enter Email"
        onChangeText={setEmail}
        value={email}
      />

      <StyledInput
        labelText="Password"
        placeholder={'Enter Password'}
        testID="password-input"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <View style={styles.forgotPassword}>
        <StyledButtonText
          label="Forgot Password?"
          onPress={handleResetPasswordPressed}
        />
      </View>

      <StyledButton
        buttonStyle={styles.loginButton}
        testID="login"
        label="Sign in"
        onPress={onLoginPressed}
      />
      {<StyledErrorText>{error}</StyledErrorText>}

      <View style={styles.signUpButtonContainer}>
        <ButtonLabel
          label="Don't Have an account yet?"
          buttonLabel="Sign up"
          onPress={handleSignUpPressed}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: '20%',
  },
  signInTitle: {
    marginBottom: 40,
  },
  signUpButtonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    alignSelf: 'center',
  },
  resetPasswordButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 3,
  },
});

export default Login;
