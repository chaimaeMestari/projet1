//Frame 4

import * as React from 'react';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

import Axios from "axios";
import {RegisterContext} from "../App"
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



const RegisterForm = ({navigation}) => {
  /*const {height}= useWindowDimensions();
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordVerify, setPasswordVerify] = React.useState(null);
  const [alert, setAlert] = React.useState();*/
  const {user, setUser} = React.useContext(RegisterContext)

  /*const handleSuccess = async (res) => {
    setEmail(null);
    setPassword(null);
    setPasswordVerify(null);
    console.log(res);

    // Set the access token
    await SecureStore.setItemAsync(`access_demo1234`, res.tokens.access.value);
  };*/

  // Handle the form submission by calling Userfront.signup()
  /*const handleSubmit = async () => {
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
        email,
        password,

        redirect: false,
      });
      handleSuccess(res);
    } catch (error) {
      console.log(error);
      setAlert(error.message);
    }
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}> {"\n"}Register  </Text>
      <Text style={styles.paragraph2} >Please enter your information to continue {"\n"}{"\n"} </Text>
      <Text style={styles.paragraph3} > Email </Text>
      <SafeAreaView>
        <Alert message={alert} />
        <TextInput
          style={styles.input}
          onChange={(e) => setUser({...user, email: e.target.value})}
          value={user.email}
          placeholder="Email address"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Text style={styles.paragraph3} > {"\n"} Password </Text>
        <TextInput
          style={styles.input}
          onChange={e => setUser({...user, password: e.target.password})}
          value={user.password}
          placeholder="Password"
          textContentType="password"
        />
        <Text style={styles.paragraph3} > {"\n"} Confirm your password </Text>
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="Re-type password" />
        <Text style={styles.paragraph4} > {"\n"} by signing up, you agree to the terms and conditions and the privacy policy  {'\n'} {"\n"} </Text>
        
        <Custombutton2 text='Register' onPress={()=>navigation.navigate("Step 1/3")}  /> 
        
        <View style={{flexDirection: 'row'}} >
        <Text style={styles.paragraph4}> {"\n"}{"\n"} Already have an account ? Log in now       {"\n"}{"\n"}        </Text>
        <Custombutton3 text='Log in' onPress={()=>navigation.navigate("Login")} />
        </View>
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
   paragraph4: {
     textAlign: 'center',
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

export default RegisterForm;
