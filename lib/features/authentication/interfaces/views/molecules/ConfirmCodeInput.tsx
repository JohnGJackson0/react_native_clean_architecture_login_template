import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import StyledTextInput from '../atoms/styled-text-input';
import StyledText from '../atoms/styled-text';

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
      <StyledText>Enter the confirmation code</StyledText>
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
    marginHorizontal: 20,
  },
});
