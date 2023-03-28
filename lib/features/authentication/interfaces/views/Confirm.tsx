import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledErrorText from './atoms/styled-error-text';
import StyledTitle from './atoms/styled-title';
import StyledButton from './atoms/styled-button';
import {
  dispatchConfirmUserAtom,
  errorAtom,
  isLoadingAtom,
  successAtom,
} from '../state/confirm';
import {useAtom} from 'jotai';
import StyledLoader from './atoms/styled-loader';
import {ConfirmCodeInput} from './molecules/ConfirmCodeInput';

type ConfirmProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

// TODO resubmit on wrong confirm code
const Confirm: React.FC<ConfirmProps> = props => {
  const [, dispatchConfirm] = useAtom(dispatchConfirmUserAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSuccessful, setIsSuccessful] = useAtom(successAtom);
  const [error] = useAtom(errorAtom);
  const [confirm, setConfirm] = useState('');

  const onPress = () => {
    dispatchConfirm({
      email: props.route.params.email,
      password: props.route.params.password,
      confirmCode: confirm,
    });
  };

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [isSuccessful, setIsSuccessful, props.navigation]);

  return (
    <View style={styles.container}>
      {isLoading && <StyledLoader />}

      <>
        <StyledTitle style={styles.confirmText}>Confirm Email</StyledTitle>
        <ConfirmCodeInput setConfirm={setConfirm} confirm={confirm} />
        <StyledButton testID="submit" label={'Submit'} onPress={onPress} />
        {error.toString() !== '' && (
          <StyledErrorText>{error.toString()}</StyledErrorText>
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
