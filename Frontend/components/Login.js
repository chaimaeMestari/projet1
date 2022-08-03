//Frame 3

import * as React from 'react';
import Userfront from '@userfront/core';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Alert from './Alert';


import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"


const Custombutton2 = ({onPress,text }) => {
  return(
    <Pressable onPress={onPress} style={styles.container2}  >
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



const LoginForm = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [alert, setAlert] = React.useState();

  const handleSuccess = async (res) => {
    setEmail(null);
    setPassword(null);
    console.log(res);

    // Set the access token
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
      <Text style={styles.paragraph}> {"\n"} Login {"\n"} </Text>
      <Text style={styles.paragraph2} > Please log in to continue {"\n"}{"\n"} </Text>
      <SafeAreaView>
        <Text style={styles.paragraph3} > Email </Text>
        <Alert message={alert} />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email address"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Text style={styles.paragraph3} > {"\n"} Password </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          textContentType="password"
        />
        <Text style={styles.paragraph4} > {"\n"} by loggin in, you agree to the terms and conditions and the privacy policy  {'\n'} {"\n"} </Text>

        
        <Custombutton2 text='Login' onPress={handleSubmit}  />  
        
        <View style={{flexDirection: 'row'}} >
        <Text style={styles.paragraph2}> {"\n"}{"\n"}Don't have an account ? Register now {"\n"}{"\n"} </Text>
        <Custombutton3 text='Register' onPress={()=>navigation.navigate("Register")} />
        </View>
        <View style={{flexDirection: 'row'}} >
        <Text style={styles.paragraph2} >{'\n'}Forgot your password ?             {'\n'} </Text>      
        <Custombutton3 text='Forgot Password'  onPress={()=>navigation.navigate("Email confirm")}  /> 
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
    fontSize: 16, 
  },
  text3: {
    color: 'rgb(130, 210, 185)',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default LoginForm;
