import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import {ConfirmCodeInput} from './molecules/ConfirmCodeInput';
import StyledButton from './atoms/styled-button';
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
import StyledTitle from './atoms/styled-title';

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
      <StyledTitle style={styles.resetConfirmTitle}>
        Reset Confirmation
      </StyledTitle>

      <ConfirmCodeInput setConfirm={setConfirm} confirm={confirm} />
      <StyledInput
        labelText="Please enter a new password"
        placeholder={'Enter Password'}
        testID="password-input"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <View style={styles.confirmPasswordResetButton}>
        <StyledButton
          testID="submit"
          label={'Change Password'}
          onPress={onPress}
        />
      </View>

      <StyledErrorText>{error.toString()}</StyledErrorText>
      {isConfirmed && (
        <StyledSuccessText>Password has been reset!</StyledSuccessText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 10,
  },
  resetConfirmTitle: {marginBottom: 20},
  confirmPasswordResetButton: {
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 5,
  },
});

export default PasswordResetVerification;
