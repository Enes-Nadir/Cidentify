import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const screenWidth = Dimensions.get('window').width;

const PersonProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require('../../assets/Avatar.png')} 
          style={styles.profileImage}
        />

        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.locationContainer}>
           <Icon name="map-marker" size={20} color="#000" />
           <Text style={styles.locationText}>New York</Text>
           <Text style={styles.locationText}> / </Text> 
           <Text style={styles.locationText}>USA</Text>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Align content to the top
    alignItems: 'center',
    padding: 40,
    marginLeft: 5,

  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8, // Set width to 80% of screen width
    alignSelf: 'center', // Center the container horizontally
    height: 100,
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 100,
    borderRadius: 50,
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
