import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PersonProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require('../../assets/Avatar.png')} 
          style={styles.avatar}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.locationContainer}>
            <Image source={require('../../assets/Location.png')} style={styles.locationIcon}/>
            <Text style={styles.locationText}>New York</Text> 
            <Text> /</Text> 
            <Text style={styles.locationText}> USA</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color for the entire screen
    justifyContent: 'flex-start', // Align content to the top
    marginLeft: 80,
    width: 300,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8, // Set width to 80% of screen width
    alignSelf: 'center', // Center the container horizontally
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 70,
    borderRadius: 90, // Make it a circle
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    marginTop: 4, // Added margin to separate the name and location text
  },
  locationContainer: {
    flexDirection: 'row', // To align children in a row
    alignItems: 'center',
  },
  locationIcon: {
    width: 20, // Set your desired width
    height: 20, // Set your desired height
    marginRight: 4, // Add some margin if needed
  },
});

export default PersonProfile;
