import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUserThunk} from './signUpSlice';
import {RootState} from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp(): JSX.Element {
  const dispatch = useDispatch();
  const signedUpUser = useSelector(
    (state: RootState) => state.signUp.signedUpUser,
  );

  const loading = useSelector((state: RootState) => state.signUp.loading);

  const errorMessage = useSelector((state: RootState) => state.signUp.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    // version conflict
    // @ts-ignore
    dispatch(signUpUserThunk({email, password}));
  };

  const clearAsyncStorage = () => {
    AsyncStorage.clear();
  };

  return (
    <View style={styles.signUpContainer}>
      {loading === 'pending' && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {signedUpUser?.email === '' || signedUpUser === undefined ? (
        <>
          <Text style={styles.signUp}>Sign Up</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Sign Up Success {signedUpUser?.email}</Text>
          <TouchableOpacity onPress={clearAsyncStorage}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </>
      )}
      {errorMessage.toString() !== '' && <Text>{errorMessage.toString()}</Text>}
    </View>
  );
}

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
