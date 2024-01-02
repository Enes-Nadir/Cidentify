import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import  Header  from '../Components/Home/Header'
import PersonProfile from '../Components/Home/Person'
import DashboardComponent from '../Components/Home/Dashboard'



const HomeScreen = () => {
  return ( 
    <SafeAreaView style={styles.container}>
    <Header/>
    <ScrollView>
        <PersonProfile/>
        <DashboardComponent />
        </ScrollView>
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
   
})

export default HomeScreen