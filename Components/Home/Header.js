import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import {  } from 'react-native-web'
 
const Header= () => {
  return (
    <View style={styles.container}>
     <TouchableOpacity>
      <Image 
        style={styles.logo}
        source={require("../../assets/Logo.png")}
      />
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        width: '100%', 
        height: 100,
    },

    logo:{
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
})


export default Header;