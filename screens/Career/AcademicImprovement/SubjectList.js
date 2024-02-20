import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';

const SubjectList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('Please Select Subject');
  const subjectOptions = [
    'Accounting', 'Art', 'Biology', 'Business', 'Chemistry', 'Computer Science',
    'English', 'IT', 'Mathematics', 'Music', 'PE', 'Physics'
  ];

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const savedSubjects = await AsyncStorage.getItem('@subjects');
        if (savedSubjects !== null) {
          setSubjects(JSON.parse(savedSubjects));
        }
      } catch (e) {
        console.error('Error loading subjects:', e);
      }
    };
    loadSubjects();
  }, []);

  const handleSaveSubject = async () => {
    if (!subjects.includes(selectedSubject) && selectedSubject !== 'Please Select Subject') {
      const newSubjects = [...subjects, selectedSubject];
      try {
        await AsyncStorage.setItem('@subjects', JSON.stringify(newSubjects));
        setSubjects(newSubjects);
        setModalVisible(false);
        setSelectedSubject('Please Select Subject');
      } catch (e) {
        console.error('Error saving subjects:', e);
      }
    }
  };

  const confirmDeleteSubject = (index) => {
    Alert.alert(
      "Delete Subject",
      "Are you sure you want to delete this subject?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteSubject(index), style: "destructive" },
      ]
    );
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
    AsyncStorage.setItem('@subjects', JSON.stringify(updatedSubjects)).catch(e => {
      console.error('Error saving subjects to AsyncStorage:', e);
    });
  };

  return (
    <View style={styles.container}>
       <BackButton />

      <Text style={styles.header}></Text>
      <Text style={styles.header}>Subject List</Text>

      <ScrollView style={styles.subjectList}>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.subjectItemContainer}>
            <Text style={styles.subjectIndex}>Subject {index + 1}</Text>
            <Text style={styles.subjectName}>{subject}</Text>
            <TouchableOpacity onPress={() => confirmDeleteSubject(index)}>
              <Ionicons name="trash-bin-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
  visible={modalVisible}
  transparent={false}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.backArrow}>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      </View>
      <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>Add Subject</Text>
    </View>

    <Picker
      selectedValue={selectedSubject}
      onValueChange={(itemValue, itemIndex) => setSelectedSubject(itemValue)}
      style={styles.picker}
    >
      {subjectOptions.map((option) => (
        <Picker.Item key={option} label={option} value={option} />
      ))}
    </Picker>
    <TouchableOpacity
      style={styles.saveButton}
      onPress={handleSaveSubject}
    >
      <Text style={styles.saveButtonText}>Save Subject</Text>
    </TouchableOpacity>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  subjectList: {
    width: '100%',
    marginTop: 40,
  },
  header: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#8A2BE2',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  picker: {
    width: 300,
    height: 200,
  },
  saveButton: {
    backgroundColor: '#8A2BE2', // Changed to purple
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
  subjectItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subjectName: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  modalTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Aligns items to the left
    width: '100%',
    padding: 20,  },
});

export default SubjectList;
