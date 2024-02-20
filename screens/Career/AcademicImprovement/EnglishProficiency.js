import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../../../Components/Home/BackButton';

const EnglishProficiency = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState('Please Select Test');
  const [scores, setScores] = useState({
    ScoreSpeaking: '',
    ScoreWriting: '',
    ScoreOverall: '',
    ScoreReading: '',
    ScoreListening: '',
  });
  const [allScores, setAllScores] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const savedScores = await AsyncStorage.getItem('@languageTestScores');
        if (savedScores !== null) {
          setAllScores(JSON.parse(savedScores));
        }
      } catch (e) {
        console.error('Failed to load scores from AsyncStorage:', e);
      }
    };

    loadScores();
  }, []);

  const handleEditScore = (index) => {
    const scoreToEdit = allScores[index];
    setSelectedTest(scoreToEdit.testType);
    setScores({
      ScoreSpeaking: scoreToEdit.ScoreSpeaking,
      ScoreWriting: scoreToEdit.ScoreWriting,
      ScoreOverall: scoreToEdit.ScoreOverall,
      ScoreReading: scoreToEdit.ScoreReading,
      ScoreListening: scoreToEdit.ScoreListening,
    });
    setEditingIndex(index);
    setModalVisible(true);
  };

  const confirmDeleteScore = (index) => {
    Alert.alert(
      "Delete Score",
      "Are you sure you want to delete this score?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteScore(index), style: "destructive" },
      ]
    );
  };
      
  const handleDeleteScore = (index) => {
    const updatedScores = allScores.filter((_, i) => i !== index);
    setAllScores(updatedScores);
    AsyncStorage.setItem('@languageTestScores', JSON.stringify(updatedScores)).catch(e => {
      console.error('Error saving scores to AsyncStorage:', e);
    });
  };

  const handleSaveScores = async () => {
    if (!scores.ScoreSpeaking || !scores.ScoreWriting || !scores.ScoreOverall || !scores.ScoreReading || !scores.ScoreListening) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
  
    let updatedScores;
    if (editingIndex !== null) {
      updatedScores = allScores.map((item, index) => index === editingIndex ? { ...item, ...scores, testType: selectedTest } : item);
    } else {
      const newScoreEntry = { testType: selectedTest, ...scores };
      updatedScores = [...allScores, newScoreEntry];
    }
  
    try {
      await AsyncStorage.setItem('@languageTestScores', JSON.stringify(updatedScores));
      setAllScores(updatedScores);
      setModalVisible(false);
      setScores({
        ScoreSpeaking: '',
        ScoreWriting: '',
        ScoreOverall: '',
        ScoreReading: '',
        ScoreListening: '',
      });
      setEditingIndex(null);
    } catch (e) {
      console.error('Error saving scores to AsyncStorage:', e);
    }
  };
  const renderScoreInputs = () => {
    return (
      <>
        <Text style={styles.label}>Score Speaking</Text>
        <TextInput
          placeholder="Score Speaking"
          value={scores.ScoreSpeaking}
          onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreSpeaking: text }))}
          style={styles.input}
        />
        <Text style={styles.label}>Score Writing</Text>
        <TextInput
          placeholder="Score Writing"
          value={scores.ScoreWriting}
          onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreWriting: text }))}
          style={styles.input}
        />
        <Text style={styles.label}>Score Overall</Text>
        <TextInput
          placeholder="Score Overall"
          value={scores.ScoreOverall}
          onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreOverall: text }))}
          style={styles.input}
        />
        <Text style={styles.label}>Score Reading</Text>
        <TextInput
          placeholder="Score Reading"
          value={scores.ScoreReading}
          onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreReading: text }))}
          style={styles.input}
        />
        <Text style={styles.label}>Score Listening</Text>
        <TextInput
          placeholder="Score Listening"
          value={scores.ScoreListening}
          onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreListening: text }))}
          style={styles.input}
        />
      </>
    );
  };
  
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.header}></Text>
      <Text style={styles.header}>Language Test Scores</Text>

      <ScrollView style={styles.scoresList}>
        {/* Display saved scores or a message if no scores are saved */}
        {allScores.length > 0 ? (
          allScores.map((item, index) => (
            <View key={index} style={styles.scoreEntry}>
              <Text style={styles.testType}>{item.testType}</Text>
              <Text>Speaking: {item.ScoreSpeaking}</Text>
              <Text>Writing: {item.ScoreWriting}</Text>
              <Text>Overall: {item.ScoreOverall}</Text>
              <Text>Reading: {item.ScoreReading}</Text>
              <Text>Listening: {item.ScoreListening}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleEditScore(index)} style={{ marginRight: 10 }}>
                  <Ionicons name="create-outline" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDeleteScore(index)}>
                  <Ionicons name="trash-bin-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noScoresContainer}>
            <Text style={styles.noScoresText}>No scores saved</Text>
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
              <Text style={styles.modalTitle}>Add English Proficiency Score</Text>
              <Picker
                selectedValue={selectedTest}
                onValueChange={(itemValue) => setSelectedTest(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Please Select Test" value="Please Select Test" />
                <Picker.Item label="Ielts" value="Ielts" />
                <Picker.Item label="Toefl" value="Toefl" />
                <Picker.Item label="Igcse English score" value="Igcse English score" />
                <Picker.Item label="Duolingo" value="Duolingo" />
                <Picker.Item label="KET" value="KET" />
                <Picker.Item label="PET" value="PET" />
                <Picker.Item label="FCE" value="FCE" />
                <Picker.Item label="CAE" value="CAE" />
              </Picker>

              {renderScoreInputs()}

              <TouchableOpacity
                onPress={() => {
                  // Check if all inputs have been entered
                  if (
                    scores.ScoreSpeaking &&
                    scores.ScoreWriting &&
                    scores.ScoreOverall &&
                    scores.ScoreReading &&
                    scores.ScoreListening
                  ) {
                    handleSaveScores(); // If all required fields are filled, proceed to save
                  } else {
                    Alert.alert('Missing Information', 'Please fill in all required fields.');
                  }
                }}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Save Score</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>    
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
      marginBottom: 10,
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
    modalTitle: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
  
  export default EnglishProficiency;
  