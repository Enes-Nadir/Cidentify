// CareerTest.js
import React, { useState, useEffect } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Calendar } from 'react-native-calendars';
import GestureRecognizer from 'react-native-swipe-gestures';

const ActionPlan = () => {
  const [actionPlanFormVisible, setActionPlanFormVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [obstacles, setObstacles] = useState('');
  const [opportunities, setOpportunities] = useState('');
  const [action, setAction] = useState('');
  const [who, setWho] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [savedForms, setSavedForms] = useState([]);

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
      } catch (error) {
        console.error('Failed to load forms from AsyncStorage', error);
      }
    };
    loadSavedForms();
  }, []);

  const handleActionSave = async () => {
    if (!action.trim()) {
      Alert.alert('Error', 'Action required!', [{ text: 'OK' }]);
      return;
    }
    const newForm = { obstacles, opportunities, action, who, dateCompleted, createdAt: new Date().toISOString() };
    const updatedForms = [...savedForms, newForm];
    try {
      await AsyncStorage.setItem('savedForms', JSON.stringify(updatedForms));
      setSavedForms(updatedForms);
      setActionPlanFormVisible(false);
      setWho('');
    } catch (error) {
      console.error('Failed to save forms to AsyncStorage', error);
    }
  };

  const deleteForm = async (formIndex) => {
    const updatedForms = savedForms.filter((_, index) => index !== formIndex);
    try {
      await AsyncStorage.setItem('savedForms', JSON.stringify(updatedForms));
      setSavedForms(updatedForms);
      setIsDetailsModalVisible(false);
    } catch (error) {
      console.error('Failed to delete the form:', error);
    }
  };

  const openDetailsModal = (formIndex) => {
    setSelectedForm(savedForms[formIndex]);
    setIsDetailsModalVisible(true);
  };

  const handleSwipeRight = () => {
    setIsDetailsModalVisible(false);
    setActionPlanFormVisible(false);
  };

  const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 };

  return (
    <View style={styles.background}>
      <BackButton />
      <Text style={styles.modalTitle}>Action Plan</Text>
      {savedForms.length === 0 && (
        <View style={styles.noFormsContainer}>
          <Text style={styles.noFormsText}>No forms saved</Text>
        </View>
      )}
      <ScrollView style={styles.scrollViewContainer}>
        {savedForms.map((form, index) => (
          <TouchableOpacity key={index} onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
            <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>Form {index + 1}</Text>
              <Text style={styles.buttonSubtitle}>Date of Form created: {new Date(form.createdAt).toLocaleDateString()}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setActionPlanFormVisible(true)}>
          <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
      </View>

      {/* Details Modal */}
      <GestureRecognizer onSwipeRight={handleSwipeRight} config={config} style={{ flex: 1 }}>
        <Modal visible={isDetailsModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.backButton} onPress={() => setIsDetailsModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Form Details</Text>
            <ScrollView>
              <Text style={styles.fieldLabel}>Obstacles:</Text>
              <Text style={styles.fieldValue}>{selectedForm?.obstacles || '---'}</Text>
              <Text style={styles.fieldLabel}>Opportunities:</Text>
              <Text style={styles.fieldValue}>{selectedForm?.opportunities || '---'}</Text>
              <Text style={styles.fieldLabel}>Action:</Text>
              <Text style={styles.fieldValue}>{selectedForm?.action || '---'}</Text>
              <Text style={styles.fieldLabel}>Who will do it?</Text>
              <Text style={styles.fieldValue}>{selectedForm?.who || '---'}</Text>
              <Text style={styles.fieldLabel}>What date will this be completed?</Text>
              <Text style={styles.fieldValue}>{selectedForm?.dateCompleted ? new Date(selectedForm.dateCompleted).toLocaleDateString() : '---'}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteForm(savedForms.indexOf(selectedForm))}>
                <Text style={styles.deleteButtonText}>Delete Form</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </GestureRecognizer>

      {/* FORM MODAL */}
<GestureRecognizer onSwipeRight={handleSwipeRight} config={config} style={{ flex: 1 }}>
  <Modal visible={actionPlanFormVisible} animationType="slide" transparent={true}>
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.backButton} onPress={() => setActionPlanFormVisible(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Action Plan Form</Text>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="always"
        extraHeight={10}
        extraScrollHeight={150}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Obstacles</Text>
          <TextInput style={styles.input} onChangeText={setObstacles} />
          <Text style={styles.label}>Opportunities</Text>
          <TextInput style={styles.input} onChangeText={setOpportunities} />
          <Text style={styles.label}>Action</Text>
          <TextInput style={styles.input} onChangeText={setAction} />
          <Text style={styles.label}>Who will do it?</Text>
          <TextInput style={styles.input} onChangeText={setWho} />
          <Text style={styles.label}>What date will this be completed?</Text>
          {/* Date Selection */}
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setDateCompleted(new Date().toISOString())}>
            <Text style={styles.datePickerText}>
              {dateCompleted ? new Date(dateCompleted).toLocaleDateString() : 'Select a Date'}
            </Text>
          </TouchableOpacity>
          {/* Remove conditional rendering for showDatePicker */}
          <Calendar
            current={dateCompleted || new Date()}
            minDate={'2012-05-10'}
            maxDate={'2030-05-30'}
            onDayPress={(day) => {
              setDateCompleted(day.dateString);
            }}
            monthFormat={'yyyy MM'}
            hideExtraDays={true}
            firstDay={1}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            markingType={'single'}
            markedDates={{
              [dateCompleted]: {selected: true, marked: true, selectedColor: 'blue'},
            }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleActionSave}>
          <Text style={styles.saveButtonText}>Save Form</Text>
        </TouchableOpacity>
      </View>
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
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 6,
      },
      datePickerText: {
        fontSize: 18,
      },
  });
  

export default ActionPlan;
