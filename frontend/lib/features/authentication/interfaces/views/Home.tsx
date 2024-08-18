import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import StyledText from './atoms/styled-text';
import StyledErrorText from './atoms/styled-error-text';
import {
  dispatchLoginSanityUseCaseAtom,
  dispatchLogoutUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  userDataAtom,
} from '../state/home';
import {useAtom} from 'jotai';
import StyledButton from './atoms/styled-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledLoader from './atoms/styled-loader';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [, dispatchLoginSanity] = useAtom(dispatchLoginSanityUseCaseAtom);
  const [, dispatchLogout] = useAtom(dispatchLogoutUseCaseAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [userData] = useAtom(userDataAtom);
  const [error] = useAtom(errorAtom);

  useEffect(() => {
    dispatchLoginSanity();
  }, [dispatchLoginSanity]);

  const handleLogout = async () => {
    dispatchLogout();
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      {isLoading && <StyledLoader />}
      {userData?.email !== undefined && (
        <StyledText>{userData?.email}</StyledText>
      )}
      {userData?.verifiedEmail === true && (
        <StyledText>Your Email has been verified.</StyledText>
      )}
      {userData?.verifiedEmail === false && (
        <StyledText>Please verify your email.</StyledText>
      )}
      <StyledButton label="Logout" onPress={handleLogout} />
      {error !== '' && <StyledErrorText>{error}</StyledErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Home;
