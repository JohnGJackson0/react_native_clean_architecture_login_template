import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
import StyledTitle from './atoms/styled-title';
import StyledButtonText from './atoms/styled-button-text';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPressed = async () => {
    console.log('Login pressed');
  };

  const handleSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.loginContainer}>
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
