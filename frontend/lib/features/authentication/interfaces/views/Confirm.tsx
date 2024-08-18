import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HEADER_HEIGHT, RootStackParamList} from '../navigators/Navigator';
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
import StyledText from './atoms/styled-text';
import {isConfirmedAtom} from '../state/resetPasswordConfirm';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';

type ConfirmProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

// TODO resubmit on wrong confirm code
const Confirm: React.FC<ConfirmProps> = props => {
  const [, dispatchConfirm] = useAtom(dispatchConfirmUserAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSuccessful, setIsSuccessful] = useAtom(successAtom);
  const [error] = useAtom(errorAtom);
  const [confirm, setConfirm] = useState('');
  const [isConfirmed] = useAtom(isConfirmedAtom);

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
        <StyledTitle style={styles.title}>Confirm Email</StyledTitle>
        <ConfirmCodeInput setConfirm={setConfirm} confirm={confirm} />
        <KeyboardAvoidingView
          keyboardVerticalOffset={HEADER_HEIGHT}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          style={styles.confirmButton}>
          <StyledButton testID="submit" label={'Confirm'} onPress={onPress} />
        </KeyboardAvoidingView>

        {isConfirmed && (
          <StyledText>
            One time verification was confirmed Successfully!
          </StyledText>
        )}
        <StyledErrorText>{error.toString()}</StyledErrorText>
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
    padding: 20,
    backgroundColor: colors.background,
  },
  confirmText: {
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
  confirmButton: {
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 5,
  },
  title: {
    marginBottom: 60,
  },
});

export default Confirm;
