// CareerTest.js
import React, { useState, useEffect  } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';




const CareerTest = (props) => {

  const [careerTestFormVisible, setcareerTestFormVisible] = useState(false);

  // New state variables
  const [selectedForm, setSelectedForm] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  // Function to open the details modal
  const openDetailsModal = (formIndex) => {
    setSelectedForm(savedForms[formIndex]);
    setIsDetailsModalVisible(true);
  };


  const [interests, setInterests] = useState('');
  const [subjectToStudy, setSubjectToStudy] = useState('');
  const [subjectSelection, setSubjectSelection] = useState('');
  const [universityToStudy, setUniversityToStudy] = useState('');
  const [countryToStudy, setCountryToStudy] = useState('');
  const [entranceExams, setEntranceExams] = useState('');
  const [languageToStudy, setLanguageToStudy] = useState('');
  const [clubsToParticipate, setClubsToParticipate] = useState('');
  const [internship, setInternship] = useState('');
  const [traitsOfPerson, setTraitsOfPerson] = useState('');
  const [readingBook, setReadingBook] = useState('');
  const [remarks, setRemarks] = useState('');
  const [mappSummary, setMappSummary] = useState('');

    
  // Handle form data change
  const closeCareerModalWithoutSaving = () => {
    setcareerTestFormVisible(false);
    };

    useEffect(() => {
      const loadSavedForms = async () => {
        try {
          const savedFormsString = await AsyncStorage.getItem('savedForms');
      if (savedFormsString) {
        const savedFormsArray = JSON.parse(savedFormsString);
        if (Array.isArray(savedFormsArray)) {
          setSavedForms(savedFormsArray);
        }
      }
        } catch (error) { }
      };
  
      loadSavedForms();
    }, []);

    // Array to store each saved form
  const [savedForms, setSavedForms] = useState([]);

  const handleCareerSave = async () => {
    const newForm = {
      interests, subjectToStudy, subjectSelection, universityToStudy, 
      countryToStudy, entranceExams, languageToStudy, clubsToParticipate, 
      internship, traitsOfPerson, readingBook, remarks, mappSummary
    };

    if (!universityToStudy.trim()) {
      Alert.alert('Error', 'University to Study is required', [{ text: 'OK' }]);
      return;
    }
      setSavedForms(currentForms => {
    const updatedForms = [...currentForms, newForm];
// Save the updated forms to AsyncStorage
AsyncStorage.setItem('savedForms', JSON.stringify(updatedForms))
.catch(error => {
  console.error('Failed to save forms to AsyncStorage', error);
});

return updatedForms;
});
      setcareerTestFormVisible(false);
      setUniversityToStudy('');
      
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
      <BackButton />
      <Text style={styles.modalTitle}>Career Test</Text>
      

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
        <Text style={styles.buttonSubtitle}>University to Study: {form.universityToStudy || '---'}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={24} color="white" style={{marginLeft: 20,}}/>
    </TouchableOpacity>

      ))}

      </ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setcareerTestFormVisible(true)}>
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
          <ScrollView>
            {/* Display the details of the selected form */}
            <Text style={styles.fieldLabel}>Interests:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.interests || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Subject to Study at University:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.subjectToStudy || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Subject Selection:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.subjectSelection || '---'}</Text>
            
            <Text style={styles.fieldLabel}>University to Study:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.universityToStudy || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Country to Study:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.countryToStudy || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Entrance Exams:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.entranceExams || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Language to Study:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.languageToStudy || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Clubs to Participate:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.clubsToParticipate || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Internship:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.internship || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Traits of the Person:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.traitsOfPerson || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Reading Book:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.readingBook || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Remarks:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.remarks || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Mapp Summary:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.mappSummary || '---'}</Text>         

            <TouchableOpacity 
             style={styles.deleteButton} 
             onPress={() => deleteForm(savedForms.indexOf(selectedForm))}
            >
             <Text style={styles.deleteButtonText}>Delete Form</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>


      {/* FORM MODAL */}
    <Modal
      visible={careerTestFormVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalView}>
      {/* Start of Modal Header <- */}
      <TouchableOpacity style={styles.backButton} onPress={closeCareerModalWithoutSaving}> 
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Career Test Form</Text>

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

          <Text style={styles.label}>Interests</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInterests(text)}
          />
          <Text style={styles.label}>Subject to Study at University</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setSubjectToStudy(text)}
          />
          <Text style={styles.label}>Subject Selection</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setSubjectSelection(text)}
          />
          <Text style={styles.label}>University to Study</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setUniversityToStudy(text)}
          />
          <Text style={styles.label}>Country to Study</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setCountryToStudy(text)}
          />
          <Text style={styles.label}>Entrance Exams</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setEntranceExams(text)}
          />
          <Text style={styles.label}>Language to Study</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setLanguageToStudy(text)}
          />
          <Text style={styles.label}>Clubs to Participate</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setClubsToParticipate(text)}
          />
          <Text style={styles.label}>Internship</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setInternship(text)}
          />
          <Text style={styles.label}>Traits of the Person</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setTraitsOfPerson(text)}
          />
          <Text style={styles.label}>Reading Book</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setReadingBook(text)}
          />
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setRemarks(text)}
          />
        <Text style={styles.label}>Mapp Summary</Text>
          <TextInput
            style={styles.inputLarge}
            onChangeText={(text)=>setMappSummary(text)}
            multiline
          />
        </ScrollView>
        </KeyboardAwareScrollView>
        <View style={{paddingTop: 10 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleCareerSave}>
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
  

export default CareerTest;
