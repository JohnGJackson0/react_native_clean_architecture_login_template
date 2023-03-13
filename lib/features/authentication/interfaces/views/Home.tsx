import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';
import {
  dispatchLoginSanityUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  userDataAtom,
} from '../state/home';
import {useAtom} from 'jotai';

function Home(): JSX.Element {
  const [, dispatchLoginSanity] = useAtom(dispatchLoginSanityUseCaseAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [userData] = useAtom(userDataAtom);
  const [error] = useAtom(errorAtom);

  useEffect(() => {
    dispatchLoginSanity();
  }, [dispatchLoginSanity]);

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
      {error !== '' && <AtomErrorText>{error}</AtomErrorText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Home;
