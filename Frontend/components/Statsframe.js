//Frame 2

import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, useWindowDimensions } from 'react-native';
import Logo from './logo_Socializus.png'; 



const StatsScreen = () => {
  const{height}= useWindowDimensions();
  
  return(
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height*0.3}]} resizeMode="contain" />
      <Text style={styles.text} > {"\n"}{"\n"}{"\n"}21022 members  
        {"\n"}221 Online 
        {"\n"}306 activities
        {"\n"}3000 participants  </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  }, 
  logo: {
  width: '80%',
  height: 100,
  },
  text: {
  fontSize: 25,
  fontWeight: "bold",
  textAlign: 'center',  
  },
});



export default StatsScreen;