//Frame 12

import * as React from 'react';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable, Image } from 'react-native';

import AddPicture from './addpicture.png';
import {RegisterContext} from "../App"
import axios from "axios"


const Custombutton2 = ({onPress,text }) => {
  return(
    <Pressable onPress={onPress} style={styles.container2} >
      <Text style={styles.paragraph2} > {text} </Text>
    </Pressable>      
  )
}



const ProfileForm3 = ({navigation}) => {
  const {user, setUser} = React.useContext(RegisterContext)

  const handleSubmit = event => {
    event.preventDefault()
    //navigation.navigate("Menu")
    alert(JSON.stringify(user))
    axios.post("https://backoffice.socializus.com/api/auth/register", {
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      city: user.city,
      gender: user.gender,
      account_type: user.account_type,
      language: user.language,
      avatar: user.avatar
    })
    .then(user => alert(JSON.stringify(user)))
    .catch(err => alert(JSON.stringify(err)))
  }

  return (
    <View style={styles.container}>
        <View style={styles.container3} >
          <Text style={styles.paragraph}> Create profile {'\n'}{'\n'} </Text> 
        </View>
      
        <SafeAreaView>
          <Image source={AddPicture} onLoad={e => setUser({...user, avatar: e.target.uri})} style={styles.logo} resizeMode="contain"  />
         <Text style={styles.paragraph3} > {'\n'}{'\n'} We do not want fake users, please add a photo to your profile picture to use this app {'\n'}{'\n'} </Text>
          <Custombutton2 text="Save"  onPress={handleSubmit} />
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  container2: {
    backgroundColor: 'rgb(130, 210, 185)',
    width: '40%',
    padding: 8,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius:5,
    alignSelf: 'center',
  },
  container3: {
    backgroundColor: 'rgb(130, 210, 185)',
    height: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  paragraph2: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  paragraph3: {
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  logo: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
},
});

export default ProfileForm3;
