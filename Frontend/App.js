import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"



import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Statsframe from './components/Statsframe';
import Password1Form from './components/Forgotpassword1';
import Password2Form from './components/Forgotpassword2';
import VerificationForm from './components/Verification';
import ChoiceScreen from './components/ConnectChoice';
import ProfileForm1 from './components/ProfileForm1';
import ProfileForm2 from './components/ProfileForm2';
import ProfileForm3 from './components/ProfileForm3';




const Stack= createNativeStackNavigator();
const RegisterContext = React.createContext();


export { RegisterContext }

export default function App() {
  const [user, setUser] = React.useState({
    nickname: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    account_type: "",
    city: "",
    language: "",
    avatar: "image.png",
  });
  console.log(user)
  return (
     
    <NavigationContainer>
      <RegisterContext.Provider value= {{user, setUser}}>
      <Stack.Navigator headerMode="none" initialRouteName="Login" >
        <Stack.Screen name='Login' component={LoginForm} />
        <Stack.Screen name='Register' component={RegisterForm} />
        <Stack.Screen name='Step 1/3' component={ProfileForm1} />
        <Stack.Screen name='Step 2/3' component={ProfileForm2} />
        <Stack.Screen name='Step 3/3' component={ProfileForm3} />
        <Stack.Screen name='Home' component={Statsframe} /> 
        <Stack.Screen name='New password' component={Password2Form} /> 
        <Stack.Screen name='Email confirm' component={Password1Form} /> 
        <Stack.Screen name='Verification' component={VerificationForm} /> 
      </Stack.Navigator>
      </RegisterContext.Provider>
    </NavigationContainer>
  );
}


