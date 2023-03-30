import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import {ConfirmCodeInput} from './molecules/ConfirmCodeInput';
import StyledButton from './atoms/styled-button';
import Overlay from './atoms/Overlay';
import StyledInput from './atoms/styled-text-input';
import {useAtom} from 'jotai';
import {
  dispatchConfirmResetUseCaseAtom,
  errorAtom,
  isConfirmedAtom,
  isLoadingAtom,
} from '../state/resetPasswordConfirm';
import StyledLoader from './atoms/styled-loader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledErrorText from './atoms/styled-error-text';
import StyledSuccessText from './atoms/styled-success-text';

type PasswordResetVerificationProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordResetVerification'
>;

const PasswordResetVerification: React.FC<PasswordResetVerificationProps> = ({
  route,
}) => {
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading] = useAtom(isLoadingAtom);
  const [, dispatchConfirmReset] = useAtom(dispatchConfirmResetUseCaseAtom);
  const [error] = useAtom(errorAtom);
  const [isConfirmed] = useAtom(isConfirmedAtom);

  const onPress = () => {
    dispatchConfirmReset({
      email: route.params.email,
      newPassword: password,
      confimCode: confirm,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading && <StyledLoader />}
      <Overlay>
        <ConfirmCodeInput setConfirm={setConfirm} confirm={confirm} />
        <StyledInput
          labelText="New Password*"
          placeholder={'Enter Password'}
          testID="password-input"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <StyledButton testID="submit" label={'Submit'} onPress={onPress} />
      </Overlay>
      <StyledErrorText>{error.toString()}</StyledErrorText>
      {isConfirmed && (
        <StyledSuccessText>Password has been reset!</StyledSuccessText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '20%',
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default PasswordResetVerification;
