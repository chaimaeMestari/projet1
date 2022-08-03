//Frame 7

import * as React from 'react';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Alert from './Alert';



const Custombutton2 = ({onPress,text }) => {
  return(
    <Pressable onPress={onPress} style={styles.container2} >
      <Text style={styles.text2} > {text} </Text>
    </Pressable>      
  )
}

const Password2Form = ({navigation}) => {
  const [password, setPassword] = React.useState(null);
  const [passwordVerify, setPasswordVerify] = React.useState(null);
  const [alert, setAlert] = React.useState();

  const handleSuccess = async (res) => {
    setPassword(null);
    setPasswordVerify(null);
    console.log(res);
    // Set the access token
    await SecureStore.setItemAsync(`access_demo1234`, res.tokens.access.value);
  };

  // Handle the form submission by calling Userfront.signup()
  const handleSubmit = async () => {
    // Reset the alert to empty
    setAlert(null);
    // Verify that the passwords match
    if (password !== passwordVerify) {
      return setAlert('Passwords must match');
    }

    try {
      // Call Userfront.signup()
      const res = await Userfront.signup({
        method: 'password',
        password,
        redirect: false,
      });
      handleSuccess(res);
    } catch (error) {
      console.log(error);
      setAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>New password  </Text>
      <SafeAreaView>
        <Alert message={alert} />
        <Text style={styles.paragraph2}> Enter your new password  {"\n"}{"\n"} </Text>
        <Text style={styles.paragraph3} > New password </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          textContentType="password"
        />
        <Text style={styles.paragraph3} > {"\n"} Confirm password </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPasswordVerify}
          value={passwordVerify}
          textContentType="password"
          placeholder="Re-type password"
        />
        <Text> {"\n"} </Text>
        <Custombutton2 text="Save password" onPress={()=>navigation.navigate("Login")}/>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
 paragraph: {
    marginBottom: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'rgb(130, 210, 185)',
  },
  paragraph2: {
    fontWeight: 'bold',
  },
  paragraph3: {
    color: 'rgb(130, 210, 185)',
    fontWeight: 'bold',
   },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: 55
  },
  container2: {
    backgroundColor: 'rgb(130, 210, 185)',
    width: '100%',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius:5,
    alignSelf: 'center',
  },
  text2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});


export default Password2Form;
