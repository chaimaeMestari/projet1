//Frame 10

import * as React from 'react';
import { Text, SafeAreaView, TextInput, View, StyleSheet, Pressable } from 'react-native';

import {RegisterContext} from "../App"



const Custombutton2 = ({onPress,text }) => {
  return(
    <Pressable onPress={onPress} style={styles.container2} >
      <Text style={styles.paragraph2} > {text} </Text>
    </Pressable>      
  )
}


const ProfileForm1 = ({navigation}) => {
  const {user, setUser} = React.useContext(RegisterContext)
  
  return (
    <View style={styles.container}>
        <View style={styles.container3} >
          <Text style={styles.paragraph}> Create profile {'\n'}{'\n'} </Text> 
        </View>
      
        <SafeAreaView style={styles.container4} >
          <Text style={styles.paragraph3} > {"\n"}{'\n'}{'\n'} First Name </Text>
          <TextInput
            style={styles.input}
            value={user.first_name}
            onChange={e => setUser({...user, first_name: e.target.value})}
            placeholder="Enter your first name "
            textContentType='string'
          />
          <Text style={styles.paragraph3} > {"\n"}{'\n'}{'\n'} Last Name </Text>
          <TextInput
            style={styles.input}
            value={user.last_name}
            onChange={e => setUser({...user, last_name: e.target.value})}
            placeholder="Enter your first name "
            textContentType='string'
          />
          <Text style={styles.paragraph3} > {"\n"}{'\n'}{'\n'} Account Type </Text>
          <TextInput
            style={styles.input}
            value={user.account_type}
            onChange={e => setUser({...user, account_type: e.target.value})}
            placeholder="Enter your account type "
            textContentType='string'
          />
          <Text style={styles.paragraph3} > {"\n"}{'\n'}{'\n'} Gender </Text>
          <TextInput
            style={styles.input}
            value={user.gender}
            onChange={e => setUser({...user, gender: e.target.value})}
            placeholder="Enter your gender"
            textContentType='string'
          />
          <Text> {"\n"} </Text>
          <Custombutton2 text="Continue"  onPress={()=>navigation.navigate("Step 2/3")} />
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
  container4: {
    marginTop: 100,
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
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    height: 55
  }, 
});

export default ProfileForm1;
