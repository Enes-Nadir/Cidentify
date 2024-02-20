// Portfolio
import React, { useState, useEffect  } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DocumentPicker from 'react-native-document-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Portfolio = (props) => {
  const [portfolioFormVisible, setPortfolioFormVisible] = useState(false);
  const [portfolioType, setPortfolioType] = useState('');
  const [participationGradeLevel, setParticipationGradeLevel] = useState('');
  const [timingOfParticipation, setTimingOfParticipation] = useState('');
  const [hoursSpentPerWeek, setHoursSpentPerWeek] = useState('');
  const [weeksSpentPerYear, setWeeksSpentPerYear] = useState('');
  const [savedForms, setSavedForms] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFormIndex, setEditingFormIndex] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);


  useEffect(() => {
    const loadSavedForms = async () => {
      try {
        const savedFormsString = await AsyncStorage.getItem('portfolioForms');
        if (savedFormsString) {
          const savedFormsArray = JSON.parse(savedFormsString);
          if (Array.isArray(savedFormsArray)) {
            setSavedForms(savedFormsArray);
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved forms');
      }
    };
    loadSavedForms();
  }, []);

  const handlePortfolioSave = async () => {
    const form = { portfolioType, participationGradeLevel, timingOfParticipation, hoursSpentPerWeek, weeksSpentPerYear };
    if (!portfolioType.trim()) {
      Alert.alert('Error', 'PortfolioType is required');
      return;
    }
    let updatedForms = isEditMode && editingFormIndex !== null
      ? savedForms.map((item, index) => index === editingFormIndex ? form : item)
      : [...savedForms, form];
    try {
      await AsyncStorage.setItem('portfolioForms', JSON.stringify(updatedForms));
      setSavedForms(updatedForms);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the form');
    }
  };

  const openDetailsModal = (formIndex) => {
    setSelectedForm(savedForms[formIndex]);
    setIsDetailsModalVisible(true);
  };


  const resetForm = () => {
    setPortfolioType('');
    setParticipationGradeLevel('');
    setTimingOfParticipation('');
    setHoursSpentPerWeek('');
    setWeeksSpentPerYear('');
    setIsEditMode(false);
    setEditingFormIndex(null);
    setPortfolioFormVisible(false);
  };

  const openNewForm = () => {
    resetForm();
    setPortfolioFormVisible(true);
  };
  const editForm = (formIndex) => {
    const formToEdit = savedForms[formIndex];
    // Assuming the form object has these properties. Adjust according to your form structure.
    setPortfolioType(formToEdit.portfolioType);
    setParticipationGradeLevel(formToEdit.participationGradeLevel);
    setTimingOfParticipation(formToEdit.timingOfParticipation);
    setHoursSpentPerWeek(formToEdit.hoursSpentPerWeek);
    setWeeksSpentPerYear(formToEdit.weeksSpentPerYear);
    setIsEditMode(true); // Set edit mode to true
    setEditingFormIndex(formIndex); // Set the current editing form's index
    setPortfolioFormVisible(true);
    setIsDetailsModalVisible(false);
  };
  
  const deleteForm = async (formIndex) => {
    const updatedForms = savedForms.filter((_, index) => index !== formIndex);
    setSavedForms(updatedForms);
    try {
      await AsyncStorage.setItem('clubActivitiesForms', JSON.stringify(updatedForms));
      setIsDetailsModalVisible(false); // Close the details modal after deleting
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the form');
    }
  };
  
  const addNewForm = () => {
    // Clear all input fields for the new form
    setPortfolioType('');
    setParticipationGradeLevel('');
    setTimingOfParticipation('');
    setHoursSpentPerWeek('');
    setWeeksSpentPerYear('');
    setIsEditMode(false); // Ensure we are not in edit mode
    setEditingFormIndex(null); // Reset editing index
    setPortfolioFormVisible(true); // Show the form modal
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.plainText, DocumentPicker.types.excel, DocumentPicker.types.word],
      });
      setFileInfo(res);
      const form = { ...selectedForm, fileUri: res.uri };
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  

  return (
    <View style={styles.background}>
    <View style={styles.headerRow}>
      <BackButton />
      <Text style={styles.modalTitle} numberOfLines={1} ellipsizeMode="tail">
      Portfolio
      </Text>
      <View style={{ width: 50 }} />
    </View>

    {savedForms.length === 0 && (
      <View style={styles.noFormsContainer}>
        <Text style={styles.noFormsText}>No forms saved</Text>
      </View>
    )}

    <ScrollView style={styles.scrollViewContainer}>
      {savedForms.map((form, index) => (
        <TouchableOpacity key={index}
            onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
          <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>Form {index + 1}</Text>
            <Text style={styles.buttonSubtitle}>Subject/Course: {form.portfolioType || '---'}</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={24} color="white" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.addButton} onPress={openNewForm}>
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>
    </View>

      <Modal
        visible={portfolioFormVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.backButton} onPress={() => setPortfolioFormVisible(false)}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>        
            <Text style={styles.modalTitle}>Portfolio Form</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>PortfolioType</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPortfolioType}
              value={portfolioType}
              placeholder="Club Type"
            />
          <Text style={styles.label}>Participation Grade Level</Text>
            <TextInput
              style={styles.input}
              onChangeText={setParticipationGradeLevel}
              value={participationGradeLevel}
              placeholder="Participation Grade Level"
            />
          <Text style={styles.label}>Timing Of Participation</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTimingOfParticipation}
              value={timingOfParticipation}
              placeholder="Timing Of Participation"
            />
          <Text style={styles.label}>Hours Spent Per Week</Text>
            <TextInput
              style={styles.input}
              onChangeText={setHoursSpentPerWeek}
              value={hoursSpentPerWeek}
              placeholder="Hours Spent Per Week"
            />
          <Text style={styles.label}>Weeks Spent Per Year</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWeeksSpentPerYear}
              value={weeksSpentPerYear}
              placeholder="Weeks Spent Per Year"
            />
            <TouchableOpacity onPress={selectFile}>
            <Text>Choose File</Text>
            </TouchableOpacity>

          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={handlePortfolioSave}>
            <Text style={styles.saveButtonText}>Save Form</Text>
          </TouchableOpacity>
        </View>
      </Modal>

 {/* Details Modal */}
 <Modal
        visible={isDetailsModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsDetailsModalVisible(false)}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Form Details</Text>
          {selectedForm && (
            <ScrollView>
              <Text style={styles.fieldLabel}>PortfolioType:</Text>
              <Text style={styles.fieldValue}>{selectedForm.portfolioType || '---'}</Text>
              
              <Text style={styles.fieldLabel}>Participation Grade Level:</Text>
              <Text style={styles.fieldValue}>{selectedForm.participationGradeLevel || '---'}</Text>
              
              <Text style={styles.fieldLabel}>Timing Of Participation:</Text>
              <Text style={styles.fieldValue}>{selectedForm.timingOfParticipation || '---'}</Text>
              
              <Text style={styles.fieldLabel}>Hours Spent Per Week:</Text>
              <Text style={styles.fieldValue}>{selectedForm.hoursSpentPerWeek || '---'}</Text>
              
              <Text style={styles.fieldLabel}>Weeks Spent Per Year:</Text>
              <Text style={styles.fieldValue}>{selectedForm.weeksSpentPerYear || '---'}</Text>
              
              {selectedForm && fileInfo && (
            <View>
                <Text style={styles.fieldLabel}>Selected File:</Text>
                <Text style={styles.fieldValue}>{fileInfo.name}</Text>
                {/* If you want to display the file, you'll need to handle it depending on the file type */}
            </View>
            )}

              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => editForm(savedForms.indexOf(selectedForm))}
              >
                <Text style={styles.editButtonText}>Edit Form</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteForm(savedForms.indexOf(selectedForm))}
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
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    scrollViewContainer: {
      marginTop: 10,
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
      elevation: 3, 
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
    formButton: {
    backgroundColor: '#8A2BE2', 
    padding: 15, 
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10, 
    width: '90%', 
    alignSelf: 'center', 
    shadowOpacity: 0.3, 
    shadowRadius: 5,
    elevation: 3,
    },
    formButtonText: {
      color: 'white', 
      fontSize: 18, 
      fontWeight: '600', 
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
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      zIndex: 10,
      bottom: 20,
      right: 20, 
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
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
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
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',  
      textAlign: 'center',
      margin: 30,
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
      alignSelf: 'center',
      width: '90%',
      marginBottom: 10,
      backgroundColor: '#8A2BE2',
    },
    editButton: {
        backgroundColor: 'blue', 
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        width: '90%',
        marginTop: 10, 
      },
      editButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
      },      
    saveButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
    fieldLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333', 
      marginTop: 10,
    },
    fieldValue: {
      fontSize: 16,
      color: '#666', 
      marginBottom: 10,
    },
    errorText: {
      color: 'red', 
      textAlign: 'center', 
      marginBottom: 10, 
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
  



export default Portfolio;
