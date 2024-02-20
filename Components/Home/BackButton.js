import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 20,
    marginTop: 40,
    width: 44, 
    height: 44, 
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'absolute', 
    zIndex: 1, 
  },
});

export default BackButton;
