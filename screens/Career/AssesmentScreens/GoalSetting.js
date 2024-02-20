// CareerTest.js
import React, { useState, useEffect  } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';




const GoalSetting = (props) => {

  const [goalSettingFormVisible, setgoalSettingFormVisible] = useState(false);

  // New state variables
  const [selectedForm, setSelectedForm] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  // Function to open the details modal
  const openDetailsModal = (formIndex) => {
    setSelectedForm(savedGoalForms[formIndex]);
    setIsDetailsModalVisible(true);
  };


{/* ------------------------------ Goal Setting ------------------------------ */}
const [goal1, setgoal1] = useState('');
const [goal2, setgoal2] = useState('');
const [goal3, setgoal3] = useState('');
const [goal4, setgoal4] = useState('');
const [goal5, setgoal5] = useState('');
const [goal6, setgoal6] = useState('');
const [goal7, setgoal7] = useState('');
const [goal8, setgoal8] = useState('');
const [goal9, setgoal9] = useState('');
const [goal10, setgoal10] = useState('');
const [goal11, setgoal11] = useState('');
const [goal12, setgoal12] = useState('');

    
  // Handle form data change
  const closeGoalModalWithoutSaving = () => {
    setgoalSettingFormVisible(false);
    };

    const closeDetailsModalVisible = () => {
        setIsDetailsModalVisible(false)
        };

    useEffect(() => {
      const loadsavedGoalForms = async () => {
        try {
          const savedGoalFormsString = await AsyncStorage.getItem('savedGoalForms');
      if (savedGoalFormsString) {
        const savedGoalFormsArray = JSON.parse(savedGoalFormsString);
        if (Array.isArray(savedGoalFormsArray)) {
          setsavedGoalForms(savedGoalFormsArray);
        }
      }
        } catch (error) { }
      };
  
      loadsavedGoalForms();
    }, []);

    // Array to store each saved form
  const [savedGoalForms, setsavedGoalForms] = useState([]);

  const handleGoalSave = async () => {
    const newForm = {
        goal1,goal2,goal3,goal4,goal5,goal6,goal7,goal8,goal9,goal10,goal11,goal12
    };

    if (!goal1.trim()) {
      Alert.alert('Error', 'Specific goal is required', [{ text: 'OK' }]);
      return;
    }
      setsavedGoalForms(currentForms => {
    const updatedForms = [...currentForms, newForm];
// Save the updated forms to AsyncStorage
AsyncStorage.setItem('savedGoalForms', JSON.stringify(updatedForms))
.catch(error => {
  console.error('Failed to save forms to AsyncStorage', error);
});

return updatedForms;
});
      setgoalSettingFormVisible(false);
      setgoal4('');
      
  };

    {/*To clean forms! */}
    const deleteForm = async (formIndex) => {
        const updatedForms = savedGoalForms.filter((_, index) => index !== formIndex);
        setsavedGoalForms(updatedForms);
        try {
          await AsyncStorage.setItem('savedGoalForms', JSON.stringify(updatedForms));
          setIsDetailsModalVisible(false); // Close the details modal after deleting
        } catch (error) {
          console.error('Failed to delete the form:', error);
        }
      };
      
    {/*To clean forms! */}
  return (
    <View style={styles.background}>
      <BackButton />
      <Text style={styles.modalTitle}>Goal Setting</Text>
      

    {/* Check if savedGoalForms array is empty and display message */}
        {savedGoalForms.length === 0 && (
      <View style={styles.noFormsContainer}>
        <Text style={styles.noFormsText}>No forms saved</Text>
      </View>
    )}

        <ScrollView style={styles.scrollViewContainer}>
     {/* Display saved forms */}
     {savedGoalForms.map((form, index) => (
      <TouchableOpacity key={index} 
          onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
      <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.buttonTitle}>Form {index + 1}</Text>
        <Text style={styles.buttonSubtitle}>Specific goal: {form.goal1 || '---'}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={24} color="white" style={{marginLeft: 20,}}/>
    </TouchableOpacity>

      ))}

      </ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setgoalSettingFormVisible(true)}>
          <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
        </View>

     
       {/* Details Modal */}
       
      <GestureRecognizer
      onSwipeRight={closeDetailsModalVisible}
      >
       <Modal
        visible={isDetailsModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsDetailsModalVisible(false)}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Form Details</Text>
          <ScrollView>
            {/* Display the details of the selected form */}
            <Text style={styles.fieldLabel}>Write your specific goal:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal1 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Be specific about when you will catch your goal:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal2 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>How will you know when you reach your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal3 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Why is this goal meaningful for you?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal4 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>What steps are required in order to realize your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal5 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>What barriers will prevent you from realizing your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal6 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>How will you deal with the barriers?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal7 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>What will your checkpoints be? (end of day, end of week tracking)</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal8 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Who will help you stay the path with your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal9 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>What accomplishments along the way will ensure that you reach your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal10 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>How will you deal with the distractions that prevent you from reaching your goal?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal11 || '---'}</Text>
            
            <Text style={styles.fieldLabel}>What must you do each day to make it happen?</Text>
            <Text style={styles.fieldValue}>{selectedForm?.goal12 || '---'}</Text>
                    
            <TouchableOpacity 
             style={styles.deleteButton} 
             onPress={() => deleteForm(savedGoalForms.indexOf(selectedForm))}
            >
         <Text style={styles.deleteButtonText}>Delete Form</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </Modal>
      </GestureRecognizer>


      {/*---------------- Start of Goal Setting Modal  ----------------*/}

      <GestureRecognizer
      onSwipeRight={closeGoalModalWithoutSaving}
      >
      <Modal
      visible={goalSettingFormVisible}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalView}>
      {/* Start of Modal Header <- */}

      <TouchableOpacity style={styles.backButton} onPress={closeGoalModalWithoutSaving} > 
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Goal Setting Form</Text>

        {/* End of Modal Header <- */}
      <KeyboardAwareScrollView
          style={{ flex: 1 }}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="always"
          extraHeight={10}
          extraScrollHeight={150}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.label}>Write your specific goal</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal1(text)}
            multiline
          />
          <Text style={styles.label}>Be specific about when you will catch your goal</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal2(text)}
            multiline
          />
          <Text style={styles.label}>How will you know when you reach your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal3(text)}
            multiline
          />
          <Text style={styles.label}>Why is this goal meaningful for you?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal4(text)}
            multiline
          />
          <Text style={styles.label}>What steps are required in order to realize your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal5(text)}
            multiline
          />
          <Text style={styles.label}>What barriers will prevent you from realizing your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal6(text)}
            multiline
          />
          <Text style={styles.label}>How will you deal with the barriers?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal7(text)}
            multiline
          />
          <Text style={styles.label}>What will your checkpoints be? (end of day, end of week tracking)</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal8(text)}
            multiline
          />
          <Text style={styles.label}>Who will help you stay the path with your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal9(text)}
            multiline
          />
          <Text style={styles.label}>What accomplishments along the way will ensure that you reach your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal10(text)}
            multiline
          />
          <Text style={styles.label}>How will you deal with the distractions that prevent you from reaching your goal?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal11(text)}
            multiline
          />
          <Text style={styles.label}>What must you do each day to make it happen?</Text>
          <TextInput
            style={styles.inputgoal}
            onChangeText={(text)=>setgoal12(text)}
            multiline
          />
        </ScrollView>
        </KeyboardAwareScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleGoalSave}>
            <Text style={styles.saveButtonText}>Save Form</Text>
          </TouchableOpacity>
          
       </View>
      </Modal>
      </GestureRecognizer>
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
    inputgoal: {
        height: 100, 
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
  

export default GoalSetting;
