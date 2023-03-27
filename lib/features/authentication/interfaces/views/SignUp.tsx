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
import StyledButtonText from './atoms/styled-button-text';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import Overlay from './atoms/Overlay';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const [, dispatchSignUp] = useAtom(dispatchSignUpUseCaseAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [signedUpUser] = useAtom(signedUpUserAtom);
  const [error] = useAtom(errorAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = async () => {
    dispatchSignUp({email: email, password: password});
  };

  useEffect(() => {
    if (signedUpUser?.email !== '' || signedUpUser?.password !== '') {
      navigation.navigate('Confirm', {
        email: signedUpUser?.email,
        password: signedUpUser?.password,
      });
    }
  }, [email, navigation, password, signedUpUser]);

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.signUpContainer}>
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

        <View style={styles.signUpButton}>
          <StyledButton
            testID="submit"
            label="SignUp"
            onPress={onSignUpPressed}
          />
        </View>
      </Overlay>

      <View style={styles.errorContainer}>
        {error !== '' && <StyledErrorText>{error}</StyledErrorText>}
      </View>
      <View style={styles.loginButtonContainer}>
        <StyledButtonText label="Log In" onPress={handleLogIn} />
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
  loginButtonContainer: {
    marginTop: 20,
  },
  errorContainer: {
    height: 60,
    marginVertical: 10,
    marginTop: 20,
  },
  signUpButton: {
    marginTop: 20,
  },
});

export default SignUp;
