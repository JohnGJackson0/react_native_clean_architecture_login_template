import React, {Dispatch, SetStateAction} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../../../tests/lib/features/authentication/interfaces/theme/colors';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import StyledText from '../atoms/styled-text';

type ConfirmCodeInputProps = {
  setConfirm: Dispatch<SetStateAction<string>>;
  confirm: string;
};

export const ConfirmCodeInput: React.FC<ConfirmCodeInputProps> = ({
  confirm,
  setConfirm,
}) => {
  const window = Dimensions.get('window');
  const NUM_OF_CELLS = 6;
  const CONTAINER_MARGIN = 15;

  const width = window.width / NUM_OF_CELLS - CONTAINER_MARGIN;

  return (
    <View style={styles.container}>
      <StyledText style={styles.label}>
        Please enter the one time verification code that was sent to your email
      </StyledText>
      <CodeField
        value={confirm}
        onChangeText={setConfirm}
        cellCount={6}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({symbol, isFocused}) => (
          <Text
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              {width: width, height: width},
            ]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.inputLabelColor,
    marginBottom: 16,
    marginTop: 9,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.primary,
  },
});
