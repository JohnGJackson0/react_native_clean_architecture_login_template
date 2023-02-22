import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {confirmUserThunk} from '../slices/confirmSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import {setUserTokens} from '../slices/appSlice';

type ConfirmProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

// TODO resubmit on wrong confirm code
const Confirm: React.FC<ConfirmProps> = props => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState('');
  const confirmedUser = useSelector((state: RootState) => state.confirm);
  const onPress = () => {
    dispatch(
      // version conflict
      // @ts-ignore
      confirmUserThunk({
        email: props.route.params.email,
        password: props.route.params.password,
        confirmCode: confirm,
      }),
    );
  };
  const loading = useSelector((state: RootState) => state.confirm.loading);

  const errorMessage = useSelector((state: RootState) => state.confirm.error);

  useEffect(() => {
    if (confirmedUser?.tokens?.jwt !== '') {
      dispatch(
        setUserTokens({
          jwtToken: confirmedUser?.tokens?.jwt,
          refreshToken: confirmedUser?.tokens?.refresh,
        }),
      );
      props.navigation.replace('Home');
    }
  }, [confirmedUser, dispatch, props.navigation]);

  return (
    <View style={styles.container}>
      {loading === 'pending' && (
        <View style={styles.loading} testID="loading">
          <ActivityIndicator size="large" />
        </View>
      )}

      <>
        <Text style={styles.confirmText}>Confirm Email</Text>
        <Text>Please confirm your email.</Text>
        <TextInput
          testID="confirm-input"
          style={styles.input}
          onChangeText={setConfirm}
          value={confirm}
        />
        <TouchableOpacity
          testID="submit"
          onPress={onPress}
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
        {errorMessage.toString() !== '' && (
          <Text>{errorMessage.toString()}</Text>
        )}
      </>
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
    alignContent: 'center',
  },
  confirmText: {
    alignSelf: 'center',
    fontSize: 35,
    marginBottom: 30,
  },
  button: {
    alignSelf: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Confirm;
