import { View, Text, SafeAreaView, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import  Header  from '../Components/Home/Header'
import PersonProfile from '../Components/Home/Person'
import DashboardComponent from '../Components/Home/Dashboard'



const HomeScreen = () => {
  return ( 
    <SafeAreaView style={styles.container}>
    <ImageBackground 
        source={require('../assets/Background.jpg')} 
        style={styles.background}
      >
      <Header/>
    <ScrollView contentContainerStyle={styles.scrollView}>
        <PersonProfile/>
        <DashboardComponent />
        </ScrollView>
    </ImageBackground>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
   
})

export default HomeScreen