import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';
import {
  dispatchLoginSanityUseCaseAtom,
  dispatchLogoutUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  userDataAtom,
} from '../state/home';
import {useAtom} from 'jotai';
import AtomButton from './atoms/atom-button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';

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
      {isLoading && <AtomActivityIndicator />}
      {userData?.email !== undefined && <AtomText>{userData?.email}</AtomText>}
      {userData?.verifiedEmail === true && (
        <AtomText>Your Email has been verified.</AtomText>
      )}
      {userData?.verifiedEmail === false && (
        <AtomText>Please verify your email.</AtomText>
      )}
      <AtomButton label="Logout" onPress={handleLogout} />
      {error !== '' && <AtomErrorText>{error}</AtomErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Home;
