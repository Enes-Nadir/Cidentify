import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import  Header  from '../Components/Home/Header'
import PersonProfile from '../Components/Home/Person'
import  ProgressBar  from '../Components/Home/ProgressBar'
import * as Progress from 'react-native-progress'
import BottomTabs, { bottomTabIcons } from '../Components/Home/BottomTabs'


const HomeScreen = () => {
  return ( 
    <SafeAreaView style={styles.container}>
        <Header/>
        <PersonProfile/>
        <BottomTabs icons={bottomTabIcons}/>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center', // Center children horizontally
        justifyContent: 'flex-start', // Align children to the top
    },
})

export default HomeScreen