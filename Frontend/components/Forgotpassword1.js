//Frame 5

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


const Password1Form = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [alert, setAlert] = React.useState();



  const handleSuccess = async (res) => {
    setEmail(null);
    console.log(res);
    await SecureStore.setItemAsync(`access_demo1234`, res.tokens.access.value);
  };
    // Handle the form submission by calling Userfront.signup()
    const handleSubmit = async () => {
      // Reset the alert to empty
      setAlert(null);
     
    try {
      // Call Userfront.signup()
      const res = await Userfront.signup({
        method: 'password',
        email,
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
        <Text style={styles.paragraph2}>No worries ! Just enter the email associated with your account {"\n"}{"\n"} </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email address"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Text> {"\n"} </Text>
        <Custombutton2 text="Send" onPress={()=>navigation.navigate("Verification")} />
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

export default Password1Form;
