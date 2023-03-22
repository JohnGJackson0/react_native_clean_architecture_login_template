import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
import StyledTitle from './atoms/styled-title';
import {useAtom} from 'jotai';
import StyledErrorText from './atoms/styled-error-text';
import StyledLoader from './atoms/styled-loader';
import {
  dispatchResetPasswordUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  isSubmittedAtom,
} from '../state/resetPassword';

type ResetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;

const ResetPassword: React.FC<ResetPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [, dispatchResetPassword] = useAtom(dispatchResetPasswordUseCaseAtom);
  const [error] = useAtom(errorAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSubmitted] = useAtom(isSubmittedAtom);

  const OnResetPressed = async () => {
    dispatchResetPassword({email});
  };

  useEffect(() => {
    if (isSubmitted === true) {
      navigation.navigate('PasswordResetVerification', {email: email});
    }
  }, [isSubmitted, navigation, email]);

  return (
    <View style={styles.resetContainer}>
      {isLoading && <StyledLoader />}
      <>
        <StyledTitle>Reset Your Password</StyledTitle>

        <StyledInput
          testID="email-input"
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />

        <StyledButton label="Reset Password" onPress={OnResetPressed} />
      </>
      {error !== '' && <StyledErrorText>{error}</StyledErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  resetContainer: {
    padding: 20,
    marginTop: '30%',
    flex: 1,
  },
});

export default ResetPassword;
