import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {LoginSanityThunk} from '../slices/homeSlice';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.home.loading);

  const errorMessage = useSelector((state: RootState) => state.home.error);

  const loginSanity = useSelector((state: RootState) => state.home.loginSanity);

  const userAuthToken = useSelector((state: RootState) => state.app.jwtToken);

  useEffect(() => {
    dispatch(
      // @ts-ignore
      LoginSanityThunk({
        jwtToken: userAuthToken,
      }),
    );
  }, [dispatch, userAuthToken]);

  return (
    <View style={styles.container}>
      {loading === 'pending' && <AtomActivityIndicator />}
      {loginSanity.email !== '' && <AtomText>{loginSanity.email}</AtomText>}
      {loginSanity.verifiedEmail === true && (
        <AtomText>Your Email has been verified.</AtomText>
      )}
      {loginSanity.verifiedEmail === false && (
        <AtomText>Please verify your email.</AtomText>
      )}
      {errorMessage !== '' && <AtomErrorText>{errorMessage}</AtomErrorText>}
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
