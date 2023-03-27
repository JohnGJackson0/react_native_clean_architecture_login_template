import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigators/Navigator';
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
import Overlay from './atoms/Overlay';

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
        <Overlay>
          <StyledInput
            testID="email-input"
            placeholder="Enter Email"
            onChangeText={setEmail}
            value={email}
          />

          <View style={styles.resetPasswordButton}>
            <StyledButton label="Reset Password" onPress={OnResetPressed} />
          </View>
        </Overlay>
      </>
      <StyledErrorText>{error}</StyledErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  resetContainer: {
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: '20%',
    flex: 1,
  },
  resetPasswordButton: {
    marginTop: 20,
  },
});

export default ResetPassword;
