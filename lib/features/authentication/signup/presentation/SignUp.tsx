import React, {useEffect, useState} from 'react';
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
import {RootState} from '../../../../core/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../core/ui/Navigator';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
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
      {loading === 'pending' && (
        <View style={styles.loading} testID="loading">
          <ActivityIndicator size="large" />
        </View>
      )}
      <>
        <Text style={styles.signUp}>Sign Up</Text>
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
          onPress={onPress}
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </>
      {errorMessage.toString() !== '' && <Text>{errorMessage.toString()}</Text>}
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
