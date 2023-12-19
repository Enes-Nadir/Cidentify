import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  // Progress is a number between 0 and 1, representing the completion percentage
  const filledBarWidth = progress * 100; // Convert to percentage

  return (
    <View style={styles.container}>
      <View style={[styles.filledBar, { width: `${filledBarWidth}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20, // Height of the progress bar
    width: '100%', // Width of the progress bar
    backgroundColor: '#e0e0e0', // Background color of the progress bar
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures the inner bar stays within the container
  },
  filledBar: {
    height: '100%',
    minWidth: 5, // Ensures that the filled bar is always visible
    backgroundColor: '#4caf50',
    borderRadius: 10,
  },
});

export default ProgressBar;
