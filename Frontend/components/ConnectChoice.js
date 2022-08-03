//Frame 2

import * as React from 'react';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import Logo from './logo_Socializus.png'; 


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



const ChoiceScreen = ({navigation}) => {
  const{height}= useWindowDimensions();
  
  return(
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height*0.3}]} resizeMode="contain" />
      <Text> {"\n"} {"\n"} {"\n"} </Text>
      <View style={{flexDirection: 'row'}} >
      <Custombutton3 text='Log in' onPress={()=>navigation.navigate("Register")} />
      <Custombutton2 text='Register' onPress={()=>navigation.navigate("Login")}  />
      
      </View>
      <Text style={styles.paragraph4} > {"\n"}{"\n"}{"\n"}16043 active members including 222 online
      {"\n"}306 activities with 3000 participants {"\n"}  
          </Text> 
          
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  container2: {
    backgroundColor: 'rgb(130, 210, 185)',
    width: '%',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius:50,
    alignSelf: 'center',
    borderColor: 'black',
    borderLeftRadius: 1,
  },
  container3: {
    backgroundColor: 'white',
    width: '10',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius:60,
    alignSelf: 'center',
    borderTopLeftRadius: 1,
  },
  text2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  text3: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
});


export default ChoiceScreen;