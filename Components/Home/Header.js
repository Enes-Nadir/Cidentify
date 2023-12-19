import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import {  } from 'react-native-web'
 
const Header= () => {
  return (
    <View style={StyleSheet.container}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    iconsContainer: {
        flexDirection: 'row',
    },

    logo:{
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
})


export default Header;