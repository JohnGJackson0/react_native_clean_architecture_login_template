import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {LoginSanityThunk} from '../slices/homeSlice';

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
      {loading === 'pending' && <ActivityIndicator />}
      <Text>Welcome!</Text>
      {loginSanity.email !== '' && <Text>{loginSanity.email}</Text>}
      {loginSanity.verifiedEmail === true && (
        <Text>Your Email has been verified.</Text>
      )}
      {loginSanity.verifiedEmail === false && (
        <Text>Please verify your email.</Text>
      )}
      {errorMessage !== '' && <Text>{errorMessage}</Text>}
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
