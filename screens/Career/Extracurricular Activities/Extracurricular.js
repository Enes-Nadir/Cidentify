import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../../../Components/Home/BackButton';

const Extracurricular = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [positionDescription, setPositionDescription] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [allActivities, setAllActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);


  useEffect(() => {
    const loadActivities = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem('@ExtracurricularActivities');
        if (savedActivities !== null) {
          setAllActivities(JSON.parse(savedActivities));
        }
      } catch (e) {
        console.error('Failed to load activities from AsyncStorage:', e);
      }
    };

    loadActivities();
  }, []);

  const handleSaveActivity = async () => {
    if (!selectedActivityType || !positionDescription || !organisationName || !activityDescription) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    let updatedActivities;
    if (editingIndex !== null) {
      updatedActivities = allActivities.map((item, index) =>
        index === editingIndex
          ? {
              ...item,
              selectedActivityType,
              positionDescription,
              organisationName,
              activityDescription,
            }
          : item
      );
    } else {
      const newActivityEntry = {
        selectedActivityType,
        positionDescription,
        organisationName,
        activityDescription,
      };
      updatedActivities = [...allActivities, newActivityEntry];
    }

    try {
      await AsyncStorage.setItem('@ExtracurricularActivities', JSON.stringify(updatedActivities));
      setAllActivities(updatedActivities);
      setModalVisible(false);
      resetForm();
    } catch (e) {
      console.error('Error saving activities to AsyncStorage:', e);
    }
  };

  const resetForm = () => {
    setSelectedActivityType('');
    setPositionDescription('');
    setOrganisationName('');
    setActivityDescription('');
    setEditingIndex(null);
  };

  const openDetailsModal = (index) => {
    setSelectedForm(allActivities[index]);
    setIsDetailsModalVisible(true);
  };

  const editForm = (index) => {
    const formToEdit = allActivities[index];
    setSelectedActivityType(formToEdit.selectedActivityType);
    setPositionDescription(formToEdit.positionDescription);
    setOrganisationName(formToEdit.organisationName);
    setActivityDescription(formToEdit.activityDescription);
    setEditingIndex(index);
    setIsDetailsModalVisible(false); // Close the details modal
    setModalVisible(true); // Open the modal for editing immediately
  };
  
  const confirmDeleteForm = (index) => {
    // Show confirmation alert before deleting
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteForm(index), style: "destructive" },
      ]
    );
  };
  

  const deleteForm = async (index) => {
    const updatedActivities = allActivities.filter((_, i) => i !== index);
    setAllActivities(updatedActivities);
    setIsDetailsModalVisible(false); // Close the details modal
    try {
      await AsyncStorage.setItem('@ExtracurricularActivities', JSON.stringify(updatedActivities));
    } catch (e) {
      console.error('Error deleting activity from AsyncStorage:', e);
    }
  };

 
  
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.header}></Text>
      <Text style={styles.header}>Extracurricular Activities</Text>

      
      <ScrollView style={styles.scoresList}>
        {/* Display saved scores or a message if no scores are saved */}
        {allActivities.length > 0 ? (
    allActivities.map((activity, index) => (
      <TouchableOpacity key={index} onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
        <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>Form {index + 1}</Text>
          <Text style={styles.buttonSubtitle}>Activity: {activity.selectedActivityType}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={24} color="white" />
      </TouchableOpacity>
    ))
  ) : (
    <View style={styles.noFormsContainer}>
      <Text style={styles.noFormsText}>No activities saved</Text>
    </View>
  )}
      </ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
      </View>

 {/* Modal for adding new scores */}
        <Modal 
        visible={modalVisible} 
        animationType="slide" 
        onRequestClose={() => setModalVisible(false)}
        >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="always"
          extraHeight={10}
          extraScrollHeight={150}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add Extracurricular Activity</Text>
              <Picker
                selectedValue={selectedActivityType}
                onValueChange={(itemValue) => setSelectedActivityType(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                >
                <Picker.Item label="Please select an Activity Type" value="" />
                <Picker.Item label="Academic" value="Academic" />
                <Picker.Item label="Art" value="Art" />
                <Picker.Item label="Athletics: Club" value="Athletics: Club" />
                <Picker.Item label="Athletics: JV/Varsity" value="Athletics: JV/Varsity" />
                <Picker.Item label="Career-Oriented" value="Career-Oriented" />
                <Picker.Item label="Community Service (Volunteer)" value="Community Service (Volunteer)" />
                <Picker.Item label="Computer/Technology" value="Computer/Technology" />
                <Picker.Item label="Cultural" value="Cultural" />
                <Picker.Item label="Dance" value="Dance" />
                <Picker.Item label="Debate/Speech" value="Debate/Speech" />
                <Picker.Item label="Environmental" value="Environmental" />
                <Picker.Item label="Family Responsibilities" value="Family Responsibilities" />
                <Picker.Item label="Foreign Exchange" value="Foreign Exchange" />
                <Picker.Item label="Journalism/Publication" value="Journalism/Publication" />
                <Picker.Item label="Junior R.O.T.C." value="Junior R.O.T.C." />
                <Picker.Item label="Music: Instrumental" value="Music: Instrumental" />
                <Picker.Item label="Music: Vocal" value="Music: Vocal" />
                <Picker.Item label="Other Club/Activity" value="Other Club/Activity" />
                <Picker.Item label="Religious" value="Religious" />
                <Picker.Item label="Research" value="Research" />
                <Picker.Item label="Robotics" value="Robotics" />
                <Picker.Item label="School Spirit" value="School Spirit" />
                <Picker.Item label="Science/Math" value="Science/Math" />
                <Picker.Item label="Student Govt./Politics" value="Student Govt./Politics" />
                <Picker.Item label="Theater/Drama" value="Theater/Drama" />
                <Picker.Item label="Work (paid)" value="Work (paid)" />
                </Picker>


            <Text style={styles.label}>Position / Leadership Description</Text>
            <TextInput
              placeholder="Position / Leadership"
              value={positionDescription}
              onChangeText={setPositionDescription}
              style={styles.input}
            />
            <Text style={styles.label}>Organisation Name</Text>
            <TextInput
              placeholder="Organisation Name"
              value={organisationName}
              onChangeText={setOrganisationName}
              style={styles.input}
            />
            <Text style={styles.label}>Please describe this activity, including what you accomplished and any recognition you received, etc.</Text>
            <TextInput
              placeholder="Please describe this activity, including what you accomplished and any recognition you received, etc."
              value={activityDescription}
              onChangeText={setActivityDescription}
              style={styles.input}
              multiline={true}
            />
            
            <TouchableOpacity
            onPress={() => {
                if (selectedActivityType && positionDescription && organisationName && activityDescription) {
                handleSaveActivity();
                } else {
                Alert.alert('Missing Information', 'Please fill in all required fields.');
                }
            }}
            style={styles.saveButton}
            >
            <Text style={styles.saveButtonText}>Save Form</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>    
        </Modal>
  {/* Details Modal */}
    <Modal
      visible={isDetailsModalVisible}
      animationType="slide"
    >
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.backButton} onPress={() => setIsDetailsModalVisible(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.modalTitle}>Form Details</Text>
      {selectedForm && (
        <ScrollView>
          <Text style={styles.fieldLabel}>Activity Type:</Text>
          <Text style={styles.fieldValue}>{selectedForm.selectedActivityType || '---'}</Text>
          
          <Text style={styles.fieldLabel}>Position Description:</Text>
          <Text style={styles.fieldValue}>{selectedForm.positionDescription || '---'}</Text>
          
          <Text style={styles.fieldLabel}>Organisation Name:</Text>
          <Text style={styles.fieldValue}>{selectedForm.organisationName || '---'}</Text>
          
          <Text style={styles.fieldLabel}>Activity Description:</Text>
          <Text style={styles.fieldValue}>{selectedForm.activityDescription || '---'}</Text>
          
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => editForm(allActivities.indexOf(selectedForm))}
          >
            <Text style={styles.editButtonText}>Edit Form</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDeleteForm(allActivities.indexOf(selectedForm))}
        >
          <Text style={styles.deleteButtonText}>Delete Form</Text>
        </TouchableOpacity>
        </ScrollView>
      )}
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
    modalContainer: {
      padding: 20,
      marginTop: 50,
    },
    noFormsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50, // Adjust as needed
    },
    noFormsText: {
      fontSize: 20,
      color: '#666',
    },
    input: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      zIndex: 10,
      bottom: 20,
      right: 20, 
    },
    buttonContainer: {
      flexDirection: 'row',
      backgroundColor: '#8A2BE2', 
      padding: 15,
      marginHorizontal:20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      width: "90%",
      elevation: 3, // for Android shadow
      // iOS shadow properties
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    icon: {
      marginRight: 20,
    },
    textContainer: {
      flex: 1,
    },
    buttonTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonSubtitle: {
      color: 'white',
      fontSize: 15,
    },  
    addButton: {
      width: 60, 
      height: 60,
      borderRadius: 30, 
      backgroundColor: '#8A2BE2', 
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3, 
    },
    addButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: 'purple',
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 15,
      margin: 20,
      alignItems: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
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
    noScoresContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    noScoresText: {
      color: 'gray',
      fontSize: 18,
    },  
    pickerItem: {
      color: '#000', // Set the color of the items in the dropdown
    },
    header: {
      paddingTop: 10,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    scoresList: {
      marginTop: 40,
    },
    scoreEntry: {
      backgroundColor: '#ffffff',
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },  
    testType: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 5,
    },
    //Modal Styles ------
    modalView: {
      backgroundColor: 'white',
      padding: 10,
      width: '100%',
      height: '100%',
      borderRadius: 20,
      elevation: 5,
    },
    fieldLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333', 
      marginTop: 10,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',  
      textAlign: 'center',
      margin: 30,
    },
    editButton: {
      backgroundColor: 'blue', 
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      width: '90%',
      marginTop: 30, 
    },
    editButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },      
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      width: '90%',
      marginTop: 20, // Adjust as needed
    },
    deleteButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },    
  });
  
  export default Extracurricular;
  