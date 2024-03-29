import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../Components/Home/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';



const CareerScreen = ({ navigation }) => {
  
  return (
    <ImageBackground 
        source={require('../assets/Background.jpg')} 
        style={styles.background}
      >
    <SafeAreaView style={styles.container}>
      
      <Header />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
           <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <Ionicons name="speedometer-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Career Monitoring</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CareerAssessment')}
        >
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <Ionicons name="clipboard-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Career Assessment</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AcademicImprovement')}
        >
         <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <Ionicons name="school-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Academic Improvement</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ExtracurricularActivities')}
        >
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <Ionicons name="football-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Extracurricular Activities</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ApplicationScreen')}
        >
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
          <Ionicons name="checkmark-done-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Application</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden', // Ensures the gradient doesn't bleed outside the border radius
    marginBottom: 30,

  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 18,
  },
});


export default CareerScreen;
