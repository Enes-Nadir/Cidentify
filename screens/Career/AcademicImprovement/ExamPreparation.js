import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../../../Components/Home/BackButton';

const ExamPreparation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState('PSAT 8/9');
  const [scores, setScores] = useState({
    ScoreEng: '',
    ScoreMath: '',
    ScoreScience: '',
    ScoreOverall: '',
  });
  const [allScores, setAllScores] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const savedScores = await AsyncStorage.getItem('@testScores');
        if (savedScores !== null) {
          setAllScores(JSON.parse(savedScores));
        }
      } catch (e) {
        console.error('Failed to load scores from AsyncStorage:', e);
      }
    };

    loadScores();
  }, []);

   // Editing TEST ------------

   const handleEditScore = (index) => {
    const scoreToEdit = allScores[index];
    setSelectedTest(scoreToEdit.testType);
    setScores({
      ScoreEng: scoreToEdit.ScoreEng,
      ScoreMath: scoreToEdit.ScoreMath,
      ScoreScience: scoreToEdit.ScoreScience || '',
      ScoreOverall: scoreToEdit.ScoreOverall,
    });
    setEditingIndex(index); // Set the current editing index
    setModalVisible(true); // Show the modal for editing
  };

  //Deleting Test ----
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
    AsyncStorage.setItem('@testScores', JSON.stringify(updatedScores)).catch(e => {
      console.error('Error saving scores to AsyncStorage:', e);
    });
  };



  const handleSaveScores = async () => {
    // Validation remains the same
    if (!scores.ScoreEng || !scores.ScoreMath || (selectedTest === 'ACT' || selectedTest === 'IMAT' ? !scores.ScoreScience : false) || !scores.ScoreOverall) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
  
    let updatedScores;
    if (editingIndex !== null) {
      // Update existing score
      updatedScores = allScores.map((item, index) => index === editingIndex ? { ...item, ...scores, testType: selectedTest } : item);
    } else {
      // Add new score
      const newScoreEntry = { testType: selectedTest, ...scores };
      updatedScores = [...allScores, newScoreEntry];
    }
  
    try {
      await AsyncStorage.setItem('@testScores', JSON.stringify(updatedScores));
      setAllScores(updatedScores); // Update the local state with new scores list
      setModalVisible(false); // Close the modal
      // Reset states
      setScores({ ScoreEng: '', ScoreMath: '', ScoreScience: '', ScoreOverall: '' });
      setEditingIndex(null); // Reset editing index
    } catch (e) {
      console.error('Error saving scores to AsyncStorage:', e);
    }
  };
  


  const renderScoreInputs = () => {
    return (
      <>
      <Text style={styles.label}>Score Eng</Text>
      <TextInput
        placeholder="Score Eng"
        value={scores.ScoreEng}
        onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreEng: text }))}
        style={styles.input}
      />
      <Text style={styles.label}>Score Math</Text>
      <TextInput
        placeholder="Score Math"
        value={scores.ScoreMath}
        onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreMath: text }))}
        style={styles.input}
      />
      { (selectedTest === 'ACT' || selectedTest === 'IMAT') && (
        <>
          <Text style={styles.label}>Score Science</Text>
          <TextInput
            placeholder="Score Science"
            value={scores.ScoreScience}
            onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreScience: text }))}
            style={styles.input}
          />
        </>
      )}
      <Text style={styles.label}>Score Overall</Text>
      <TextInput
        placeholder="Score Overall"
        value={scores.ScoreOverall}
        onChangeText={(text) => setScores((prev) => ({ ...prev, ScoreOverall: text }))}
        style={styles.input}
      />
    </>
    );
  };


  return (

    <View style={styles.container}>
    <BackButton />
    <Text style={styles.header}></Text>
    <Text style={styles.header}>Test Scores</Text>

    {/* Placeholder for displaying saved scores */}
    <ScrollView style={styles.scoresList}>
    {/* Display saved scores or a message if no scores are saved */}
{allScores.length > 0 ? (
allScores.map((item, index) => (
  <View key={index} style={styles.scoreEntry}>
    <Text style={styles.testType}>{item.testType}</Text>
    <Text>Eng: {item.ScoreEng}</Text>
    <Text>Math: {item.ScoreMath}</Text>
    {item.ScoreScience ? <Text>Science: {item.ScoreScience}</Text> : null}
    <Text>Overall: {item.ScoreOverall}</Text>
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

      
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
      <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="always"
          extraHeight={10}
          extraScrollHeight={150}>
      <ScrollView>
        <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Add Score</Text>
        </View>
        <View style={styles.modalContainer}>
          <Picker
            selectedValue={selectedTest}
            onValueChange={(itemValue) => setSelectedTest(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}          
            >
            <Picker.Item label="PSAT 8/9" value="PSAT 8/9" />
            <Picker.Item label="PSAT 10" value="PSAT 10" />
            <Picker.Item label="SAT" value="SAT" />
            <Picker.Item label="ACT" value="ACT" />
            <Picker.Item label="IMAT" value="IMAT" />
          </Picker>

          {renderScoreInputs()}

          <TouchableOpacity
  onPress={() => {
    // Check if all inputs have been entered
    const { ScoreEng, ScoreMath, ScoreScience, ScoreOverall } = scores;
    if (ScoreEng && ScoreMath && (selectedTest === 'ACT' || selectedTest === 'IMAT' ? ScoreScience : true) && ScoreOverall) {
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

export default ExamPreparation;
