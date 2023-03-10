import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import {useAtom} from 'jotai';
import {
  dispatchSignUpUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  signedUpUserAtom,
} from '../state/signUp';
import AtomActivityIndicator from './atoms/atom-activity-indicator';

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
      {isLoading && <AtomActivityIndicator />}
      <>
        <AtomText>Sign Up</AtomText>
        <TextInput
          testID="email-input"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          testID="password-input"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity
          testID="submit"
          onPress={onSignUpPressed}
          style={styles.button}>
          <AtomText>Submit</AtomText>
        </TouchableOpacity>
      </>
      {error !== '' && <AtomErrorText>{error}</AtomErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
  signUpContainer: {
    padding: 20,
    marginTop: '30%',
    flex: 1,
  },
  button: {
    alignSelf: 'center',
  },
  signUp: {
    alignSelf: 'center',
    fontSize: 35,
    marginBottom: 30,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SignUp;
