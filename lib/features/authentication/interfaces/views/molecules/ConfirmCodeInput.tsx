import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StyledTextInput from '../atoms/styled-text-input';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';

type ConfirmCodeInputProps = {
  setConfirm: Dispatch<SetStateAction<string>>;
  confirm: string;
};

export const ConfirmCodeInput: React.FC<ConfirmCodeInputProps> = ({
  confirm,
  setConfirm,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the confirmation code</Text>
      <StyledTextInput
        testID="confirm-input"
        placeholder={'Enter Confirm Code'}
        onChangeText={setConfirm}
        value={confirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: colors.inputLabelColor,
    marginBottom: 6,
    marginTop: 9,
  },
});
