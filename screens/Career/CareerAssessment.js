import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import BackButton from '../../Components/Home/BackButton';

const CareerAssessment = ({ navigation }) => { 
 

  return (
    <ImageBackground
      source={require('../../assets/Background.jpg')}
      style={styles.background}
    >

    <BackButton style={styles.backButton} />

 
       <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.buttonContainer}>
        <AssessmentButton
          title="Career Test"
          subtitle="There is no empty fields"
          onPress={() => navigation.navigate('CareerTest')} 
        />
        <AssessmentButton
          title="Goal Setting"
          subtitle="There is no empty fields"
          onPress={() => navigation.navigate('GoalSetting')} 
        />
        <AssessmentButton
          title="Roadmap"
          subtitle="There is no empty fields"
          onPress={() => navigation.navigate('Roadmap')}
        />
        <AssessmentButton
          title="Action Plan"
          subtitle="There is no empty fields"
          onPress={() => navigation.navigate('ActionPlan')} 
        />
        <AssessmentButton
          title="Webinar"
          subtitle="There is no empty fields"
          onPress={() => setwebinarVisible(true)} 
        />
        
      </ScrollView>

    </ImageBackground>
  );
};

const AssessmentButton = ({ title, subtitle, onPress }) => (
  <View style={styles.assessmentButton}>
    <Text style={styles.buttonTitle}>{title}</Text>
    <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    <TouchableOpacity style={styles.detailButton} onPress={onPress}>
      <Text style={styles.detailButtonText}>View Detail Page</Text>
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContainer: {
    marginTop: 80,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 20,
    // Style for the button container
  },
  assessmentButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    // Style for each button
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // Style for the title text
  },
  buttonSubtitle: {
    fontSize: 14,
    // Style for the subtitle text
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: '#8A2BE2', 
    padding: 10,
    borderRadius: 5,
// Style for the detail button
  },
  detailButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  // Career Test Modal CSS -------------------------
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 28,
    paddingLeft: 20,
  },
  modalHeader: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically in the row
    marginBottom: 20, // Add some margin at the bottom
  },    
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    elevation: 5,
  },
  scrollView: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  inputLarge: {
    height: 150, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    },
    
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#00BCD4',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center', // Center the button
    width: '90%', // Adjust width as needed
    marginBottom: 10, 
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // ... other styling as needed
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
    backgroundColor: '#00BCD4', // Your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 30,
  },

  // ----------------------------
});

export default CareerAssessment;
