import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CareerAssessment = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/Background.jpg')}
      style={styles.background}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Career')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.buttonContainer}>
        <AssessmentButton title="Career Test" subtitle="There is no empty fields" />
        <AssessmentButton title="Goal Setting" subtitle="There is no empty fields" />
        <AssessmentButton title="Roadmap" subtitle="Not finished yet" />
        <AssessmentButton title="Action Plan" subtitle="7 empty fields" />
        <AssessmentButton title="Webinar" subtitle="14 empty fields" />
      </ScrollView>
    </ImageBackground>
  );
};


const AssessmentButton = ({ title, subtitle }) => (
  <View style={styles.assessmentButton}>
    <Text style={styles.buttonTitle}>{title}</Text>
    <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    <TouchableOpacity style={styles.detailButton}>
      <Text style={styles.detailButtonText}>View Detail Page</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backButton: {
    margin: 20,
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
    backgroundColor: '#00BCD4', // Color for the detail button
    padding: 10,
    borderRadius: 5,
    // Style for the detail button
  },
  detailButtonText: {
    color: 'white',
    textAlign: 'center',
    // Style for the detail button text
  },
  // ... other styles
});

export default CareerAssessment;
