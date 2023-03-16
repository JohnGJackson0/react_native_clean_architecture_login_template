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
import StyledTitle from './atoms/styled-title';

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

  return (
    <View style={styles.signUpContainer}>
      {isLoading && <StyledLoader />}
      <>
        <StyledTitle>Sign Up</StyledTitle>

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

        <StyledButton
          testID="submit"
          label="submit"
          onPress={onSignUpPressed}
        />
      </>
      {error !== '' && <StyledErrorText>{error}</StyledErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    padding: 20,
    marginTop: '30%',
    flex: 1,
  },
});

export default SignUp;
