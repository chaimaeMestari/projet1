//Frame 6

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

const Custombutton3 = ({onPress,text }) => {
  return(
    <Pressable onPress={onPress} style={styles.container3} >
      <Text style={styles.text3} > {text} </Text>
    </Pressable>      
  )
}


const VerificationForm = ({navigation}) => {
  const [password, setPassword] = React.useState(null);
  const [alert, setAlert] = React.useState();

  const handleSuccess = async (res) => {
    setPassword(null);
    console.log(res);

    // Set the access token
    await SecureStore.setItemAsync(`access_demo1234`, res.tokens.access.value);

    // To read the access token (in the future)
    // await SecureStore.getItemAsync(`access_demo1234`);

    // Redirect as desired, see https://reactnative.dev/docs/navigation#react-navigation
  };

  // Handle the form submission by calling Userfront.signup()
  const handleSubmit = async () => {
    // Reset the alert to empty
    setAlert(null);
    // Verify that the passwords match

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
      <Text style={styles.paragraph}>Forgot password ? </Text>
      <SafeAreaView>
        <Alert message={alert} />
        <Text style={styles.paragraph2}>Enter the verification code that you have received on your email {"\n"}{"\n"} </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Verification code"
          keyboardType="verification-code"
          textContentType="verificationCode"
        />
        <Text> {"\n"} </Text>
        <Custombutton2 text="Confirm"  onPress={()=>navigation.navigate("New password")} />
        
        <Text style={styles.paragraph3}> {"\n"}{"\n"} Didn’t receive the verification code ? Please check your spam       {"\n"} </Text>
        <Custombutton3 text='Resend' onPress={()=>navigation.navigate("Verification")} />
       
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
    fontWeight: 'bold',
    textAlign: 'center',
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
  container3: {
    backgroundColor: 'white',
    width: '10',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius:30,
    alignSelf: 'center',
  },
  text2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  text3: {
    color: 'rgb(130, 210, 185)',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default VerificationForm;
