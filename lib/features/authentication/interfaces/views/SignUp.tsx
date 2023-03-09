import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';
import {useAtom} from 'jotai';
import * as E from 'fp-ts/Either';
import {
  SignUpUser,
  UserSignUpLoading,
  UserSignedUp,
  userSignUpError,
} from '../state/signUp';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const [userSignUpResult, setSignUpUserResult] = useAtom(UserSignedUp);
  const [signUpLoading, setSignUpLoading] = useAtom(UserSignUpLoading);
  const [signUpError, setSignUpError] = useAtom(userSignUpError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = async () => {
    setSignUpLoading(true);
    let getSignUp;
    try {
      getSignUp = await SignUpUser(email, password);
    } catch (e: unknown) {
      setSignUpError((e ?? 'Unknown Error').toString());
      setSignUpLoading(false);
      return;
    }

    E.fold(
      error => {
        if (typeof error === 'string') {
          setSignUpError(error);
          setSignUpLoading(false);
        }
      },
      (value: UserSignUpDTO) => {
        setSignUpUserResult(value);
        setSignUpLoading(false);
      },
    )(getSignUp);
  };

  useEffect(() => {
    if (userSignUpResult?.email !== '' || userSignUpResult?.password !== '') {
      navigation.navigate('Confirm', {
        email: userSignUpResult?.email,
        password: userSignUpResult?.password,
      });
    }
  }, [email, navigation, password, userSignUpResult]);

  return (
    <View style={styles.signUpContainer}>
      {signUpLoading === true && (
        <View style={styles.loading}>
          <AtomActivityIndicator size="large" />
        </View>
      )}
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
      {signUpError !== '' && <AtomErrorText>{signUpError}</AtomErrorText>}
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
