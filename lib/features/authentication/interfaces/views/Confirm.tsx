import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import {setUserTokens} from '../slices/appSlice';
import AtomText from './atoms/atom-text';
import AtomErrorText from './atoms/atom-error-text';
import AtomActivityIndicator from './atoms/atom-activity-indicator';
import AtomTitle from './atoms/atom-title';
import AtomTextInput from './atoms/atom-input';
import AtomButton from './atoms/atom-button';
import {
  dispatchConfirmUserAtom,
  errorAtom,
  isLoadingAtom,
  tokensAtom,
} from '../state/confirm';
import {useAtom} from 'jotai';
import {useDispatch} from 'react-redux';

type ConfirmProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

// TODO resubmit on wrong confirm code
const Confirm: React.FC<ConfirmProps> = props => {
  const [, dispatchConfirm] = useAtom(dispatchConfirmUserAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [userTokens] = useAtom(tokensAtom);
  const [error] = useAtom(errorAtom);
  const [confirm, setConfirm] = useState('');

  const dispatch = useDispatch();

  const onPress = () => {
    dispatchConfirm({
      email: props.route.params.email,
      password: props.route.params.password,
      confirmCode: confirm,
    });
  };

  useEffect(() => {
    if (userTokens?.jwt !== '') {
      dispatch(
        setUserTokens({
          jwtToken: userTokens?.jwt,
          refreshToken: userTokens?.refresh,
        }),
      );
      props.navigation.replace('Home');
    }
  }, [userTokens, dispatch, props.navigation]);

  return (
    <View style={styles.container}>
      {isLoading && <AtomActivityIndicator />}

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
        {error.toString() !== '' && (
          <AtomErrorText>{error.toString()}</AtomErrorText>
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
