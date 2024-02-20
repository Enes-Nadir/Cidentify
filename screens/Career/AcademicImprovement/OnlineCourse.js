// Online Course
import React, { useState, useEffect  } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';





const OnlineCourse= (props) => {

  const [onlineFormVisible, setOnlineFormVisible] = useState(false);

  // New state variables
    const [selectedForm, setSelectedForm] = useState(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingFormIndex, setEditingFormIndex] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
    const [subject, setSubject] = useState('');
    const [attendance, setAttendance] = useState('');
    const [university, setUniversity] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');

    



  // Function to open the details modal
  const openDetailsModal = (formIndex) => {
    if (formIndex >= 0 && formIndex < savedForms.length) {
      setSelectedForm(savedForms[formIndex]);
      setIsDetailsModalVisible(true);
    } else {
      console.error('Invalid form index:', formIndex);
    }
  };
  
  

    
  // Handle form data change
  const closecompetitionModalWithoutSaving = () => {
    setOnlineFormVisible(false);
    };


      
  const resetForm = () => {
    setSubject('');
    setAttendance('');
    setUniversity('');
    setDescription('');
    setIsEditMode(false);
    setEditingFormIndex(null);
    setOnlineFormVisible(false);
    setStartDate(new Date());
    setFinishDate(new Date());
    setShowStartDatePicker(false);
    setShowFinishDatePicker(false);

  };
  
    const openNewForm = () => {
      resetForm();
      setOnlineFormVisible(true);
      };
      

      useEffect(() => {
    const loadSavedForms = async () => {
      try {
        const savedFormsString = await AsyncStorage.getItem('savedForms');
        if (savedFormsString) {
          const savedFormsArray = JSON.parse(savedFormsString);
          setSavedForms(savedFormsArray);
        }
      } catch (error) {
        console.error('Failed to load savedForms:', error);
      }
    };

    loadSavedForms();
  }, []);

      

    //Editing FORM ---

    const editForm = (formIndex) => {
        const formToEdit = savedForms[formIndex];
        setSubject(formToEdit.subject);
        setAttendance(formToEdit.attendance);
        setUniversity(formToEdit.university);
        setYear(formToEdit.year);
        setDescription(formToEdit.description);
        setIsEditMode(true); // Set edit mode to true
        setEditingFormIndex(formIndex); // Set the current editing form's index
        setOnlineFormVisible(true);
        setIsDetailsModalVisible(false);
        setStartDate(new Date(formToEdit.startDate));
        setFinishDate(new Date(formToEdit.finishDate));

      };     
      

    // Array to store each saved form
  const [savedForms, setSavedForms] = useState([]);

  const handlecompetitionSave = async () => {
    const form = {
      subject, attendance, university, year, description, startDate: startDate.toISOString(), // or however you want to format it
      finishDate: finishDate.toISOString()
    };
  
    if (!subject.trim()) {
      Alert.alert('Error', 'competition Name is required', [{ text: 'OK' }]);
      return;
    }
  
    let updatedForms = [];
    if (isEditMode && editingFormIndex !== null) {
      // Update existing form
      updatedForms = [...savedForms];
      updatedForms[editingFormIndex] = form;
    } else {
      // Add new form
      updatedForms = [...savedForms, form];
    }
  
    try {
      await AsyncStorage.setItem('savedForms', JSON.stringify(updatedForms));
      setSavedForms(updatedForms);
      // Reset form, edit mode, and modal visibility
      resetForm();
    } catch (error) {
      console.error('Failed to save forms to AsyncStorage', error);
    }
    setShowStartDatePicker(false);
    setShowFinishDatePicker(false);
  };

  

  // Date function

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };
  
  const onFinishDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || finishDate;
    setShowFinishDatePicker(Platform.OS === 'ios');
    setFinishDate(currentDate);
  };
  
  

    {/*To clean forms! */}
    const deleteForm = async (formIndex) => {
      const updatedForms = savedForms.filter((_, index) => index !== formIndex);
      setSavedForms(updatedForms);
      try {
        await AsyncStorage.setItem('savedForms', JSON.stringify(updatedForms));
        setIsDetailsModalVisible(false); // Close the details modal after deleting
      } catch (error) {
        console.error('Failed to delete the form:', error);
      }
    };
    
  {/*To clean forms! */}

  return (

    <View style={styles.background}>
   <View style={styles.headerRow}>
  <BackButton />
  <Text style={styles.modalTitle} numberOfLines={1} ellipsizeMode="tail"> Online Course/Certificate </Text>
  <View style={{ width: 50 }} /> 
</View>


    {/* Check if savedForms array is empty and display message */}
        {savedForms.length === 0 && (
      <View style={styles.noFormsContainer}>
        <Text style={styles.noFormsText}>No forms saved</Text>
      </View>
    )}

        <ScrollView style={styles.scrollViewContainer}>
     {/* Display saved forms */}
     {savedForms.map((form, index) => (
      <TouchableOpacity key={index} 
          onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
      <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.buttonTitle}>Form {index + 1}</Text>
        <Text style={styles.buttonSubtitle}>Subject/Course: {form.subject || '---'}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={24} color="white" style={{marginLeft: 20,}}/>
    </TouchableOpacity>

      ))}

      </ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={openNewForm}>
          <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
        </View>

     
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
    {selectedForm && ( // Ensure selectedForm is checked before rendering its details
      <ScrollView>
        <Text style={styles.fieldLabel}>Subject/Course:</Text>
        <Text style={styles.fieldValue}>{selectedForm?.subject || '---'}</Text>
        
        <Text style={styles.fieldLabel}>Attendance Grade:</Text>
        <Text style={styles.fieldValue}>{selectedForm.attendance || '---'}</Text>
        
        <Text style={styles.fieldLabel}>University/College:</Text>
        <Text style={styles.fieldValue}>{selectedForm.university || '---'}</Text>
        
        <Text style={styles.fieldLabel}>Description:</Text>
        <Text style={styles.fieldValue}>{selectedForm.description || '---'}</Text>

        <Text style={styles.label}>Start Date</Text>
        <Text style={styles.input}>{new Date(selectedForm?.startDate).toDateString()}</Text>

        <Text style={styles.label}>Finish Date</Text>
        <Text style={styles.input}>{new Date(selectedForm?.finishDate).toDateString()}</Text>

        
        
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


      {/* FORM MODAL */}
    <Modal
      visible={onlineFormVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalView}>
      {/* Start of Modal Header <- */}
      <TouchableOpacity style={styles.backButton} onPress={closecompetitionModalWithoutSaving}> 
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}> Participation Form</Text>

        {/* End of Modal Header <- */}
      <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="always"
          extraHeight={10}
          extraScrollHeight={150}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.label}>Subject/Course</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setSubject(text)}
            value={subject}
          />
          <Text style={styles.label}>Attendance Grade</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setAttendance(text)}
            value={attendance}
          />
          <Text style={styles.label}>University/College</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setUniversity(text)}
            value={university}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setDescription(text)}
            value={description} 
          />
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <Text style={styles.label}>Start Date</Text>
                <Text style={styles.input}>{startDate.toDateString()}</Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onStartDateChange}
                />
              )}

              <TouchableOpacity onPress={() => setShowFinishDatePicker(true)}>
                <Text style={styles.label}>Finish Date</Text>
                <Text style={styles.input}>{finishDate.toDateString()}</Text>
              </TouchableOpacity>
              {showFinishDatePicker && (
                <DateTimePicker
                  value={finishDate}
                  mode="date"
                  display="default"
                  onChange={onFinishDateChange}
                />
              )}

        </ScrollView>
        </KeyboardAwareScrollView>
        <View style={{paddingTop: 10 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handlecompetitionSave}>
            <Text style={styles.saveButtonText}>Save Form</Text>
          </TouchableOpacity>
        </View>
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
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30, 
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
    backButton: {
      marginLeft: 20,
      marginTop: 40,
      width: 44, 
      height: 44, 
      alignItems: 'center',
      justifyContent: 'center', 
      attendance: 'absolute', 
      zIndex: 1, 
    },
    modalTitle: {
      fontSize: 20,
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


export default OnlineCourse;
