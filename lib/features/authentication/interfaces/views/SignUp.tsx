import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledErrorText from './atoms/styled-error-text';
import {useAtom} from 'jotai';
import {
  dispatchSignUpUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  signedUpUserAtom,
} from '../state/signUp';
import StyledLoader from './atoms/styled-loader';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import StyledTitle from './atoms/styled-title';
import ButtonLabel from './molecules/LabelButton';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const [, dispatchSignUp] = useAtom(dispatchSignUpUseCaseAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [signedUpUser, setSignedUpUser] = useAtom(signedUpUserAtom);
  const [error] = useAtom(errorAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = async () => {
    dispatchSignUp({email: email, password: password});
  };

  useEffect(() => {
    if (signedUpUser?.email !== '' || signedUpUser?.password !== '') {
      setSignedUpUser({email: '', password: ''});
      navigation.navigate('Confirm', {
        email: signedUpUser?.email,
        password: signedUpUser?.password,
      });
    }
  }, [email, navigation, password, signedUpUser, setSignedUpUser]);

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.signUpContainer}>
      {isLoading && <StyledLoader />}

      <StyledTitle style={styles.signUpTitle}>Sign Up</StyledTitle>

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

      <View style={styles.signUpButton}>
        <StyledButton
          testID="submit"
          label="Sign up"
          onPress={onSignUpPressed}
        />
      </View>

      <StyledErrorText>{error}</StyledErrorText>

      <View style={styles.loginButtonContainer}>
        <ButtonLabel
          label="Already Have an account?"
          buttonLabel="Log in"
          onPress={handleLogIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: '20%',
    flex: 1,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpTitle: {
    marginBottom: 40,
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    alignSelf: 'center',
  },
});

export default SignUp;
