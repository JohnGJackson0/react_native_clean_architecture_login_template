import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    console.log('pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUp}>Sign Up</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
  signUpContainer: {
    padding: 20,
    marginTop: '30%',
  },
  button: {
    alignSelf: 'center',
  },
  signUp: {
    alignSelf: 'center',
    fontSize: 35,
    marginBottom: 30,
  },
});

export default App;
