import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {confirmUserThunk} from './confirmSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../core/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../core/ui/Navigator';

type ConfirmProps = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

const Confirm: React.FC<ConfirmProps> = props => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState('');
  const confirmedUser = useSelector((state: RootState) => state.confirm);
  const onPress = () => {
    // version conflict
    // @ts-ignore
    dispatch(confirmUserThunk(props.email, props.password, confirm));
  };
  const loading = useSelector((state: RootState) => state.confirm.loading);

  const errorMessage = useSelector((state: RootState) => state.confirm.error);

  return (
    <View style={styles.container}>
      {loading === 'pending' && (
        <View style={styles.loading} testID="loading">
          <ActivityIndicator size="large" />
        </View>
      )}
      {confirmedUser?.tokens?.jwt === '' ? (
        <>
          <Text style={styles.confirmText}>Confirm Email</Text>
          <Text>Please confirm your email.</Text>
          <TextInput
            testID="confirm-input"
            style={styles.input}
            onChangeText={setConfirm}
            value={confirm}
          />
          <TouchableOpacity
            testID="submit"
            onPress={onPress}
            style={styles.button}>
            <Text>Submit</Text>
          </TouchableOpacity>
          {errorMessage.toString() !== '' && (
            <Text>{errorMessage.toString()}</Text>
          )}
        </>
      ) : (
        <>
          <Text>Logged In Successful</Text>
        </>
      )}
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
