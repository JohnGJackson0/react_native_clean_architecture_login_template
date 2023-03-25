import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import StyledButton from './atoms/styled-button';
import {RootStackParamList} from '../navigators/Navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<WelcomeProps> = ({navigation}) => {
  const handleLoginPressed = () => {
    navigation.navigate('Login');
  };
  const handleSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../../assets/Logo_A.png')}
      />

      <View style={styles.authOverlay}>
        <View style={styles.loginContainer}>
          <StyledButton label="Login" onPress={handleLoginPressed} />
        </View>
        <View style={styles.signUpContainer}>
          <StyledButton label="Sign Up" onPress={handleSignUpPressed} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loginContainer: {
    margin: 20,
  },
  signUpContainer: {
    margin: 20,
  },
  authOverlay: {
    marginTop: '30%',
    backgroundColor: colors.overlay,
    margin: 20,
    borderRadius: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
});

export default Welcome;
