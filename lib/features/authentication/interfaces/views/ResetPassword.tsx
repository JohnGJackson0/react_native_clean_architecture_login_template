import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HEADER_HEIGHT, RootStackParamList} from '../navigators/Navigator';
import StyledButton from './atoms/styled-button';
import StyledInput from './atoms/styled-text-input';
import {useAtom} from 'jotai';
import StyledErrorText from './atoms/styled-error-text';
import StyledLoader from './atoms/styled-loader';
import {
  dispatchResetPasswordUseCaseAtom,
  errorAtom,
  isLoadingAtom,
  isSubmittedAtom,
} from '../state/resetPassword';
import {colors} from '../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import StyledTitle from './atoms/styled-title';
import StyledText from './atoms/styled-text';

type ResetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;

const ResetPassword: React.FC<ResetPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [, dispatchResetPassword] = useAtom(dispatchResetPasswordUseCaseAtom);
  const [error] = useAtom(errorAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [isSubmitted, setIsSubmitted] = useAtom(isSubmittedAtom);

  const OnResetPressed = async () => {
    dispatchResetPassword({email});
  };

  useEffect(() => {
    if (isSubmitted === true) {
      setIsSubmitted(false);
      navigation.navigate('PasswordResetVerification', {email: email});
    }
  }, [isSubmitted, navigation, email, setIsSubmitted]);

  return (
    <View style={styles.resetContainer}>
      {isLoading && <StyledLoader />}
      <>
        <StyledTitle style={styles.forgotPassword}>
          Forgot Password?
        </StyledTitle>
        <StyledText>
          We will send a one time password reset confirmation code to the email
        </StyledText>
        <StyledText>Please enter your registered email</StyledText>
        <StyledInput
          testID="email-input"
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />

        <KeyboardAvoidingView
          keyboardVerticalOffset={HEADER_HEIGHT}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          style={styles.resetPasswordButton}>
          <StyledButton label="Reset Password" onPress={OnResetPressed} />
        </KeyboardAvoidingView>
      </>
      <StyledErrorText>{error}</StyledErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  resetContainer: {
    backgroundColor: colors.background,
    padding: 20,
    flex: 1,
  },
  resetPasswordButton: {
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 5,
  },
  forgotPassword: {
    marginBottom: 40,
  },
});

export default ResetPassword;
