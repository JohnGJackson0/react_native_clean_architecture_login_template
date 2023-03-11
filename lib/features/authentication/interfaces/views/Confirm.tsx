import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {confirmUserThunk} from '../slices/confirmSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import {setUserTokens} from '../slices/appSlice';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';
import AtomTitle from './atoms/atom-title';
import AtomTextInput from './atoms/atom-input';
import AtomButton from './atoms/atom-button';

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
      {loading === 'pending' && <AtomActivityIndicator />}

      <>
        <AtomTitle style={styles.confirmText}>Confirm Email</AtomTitle>
        <AtomText>Please confirm your email.</AtomText>
        <AtomTextInput
          testID="confirm-input"
          placeholder={'Enter Confirm Code'}
          onChangeText={setConfirm}
          value={confirm}
        />
        <AtomButton testID="submit" label={'Submit'} onPress={onPress} />
        {errorMessage.toString() !== '' && (
          <AtomErrorText>{errorMessage.toString()}</AtomErrorText>
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
    padding: 20,
    marginTop: '30%',
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
