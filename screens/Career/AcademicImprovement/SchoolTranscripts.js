import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet  } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import BackButton from '../../../Components/Home/BackButton';
import { Alert } from 'react-native';





const SchoolTranscripts = () => { 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState('9');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');
  const [grades, setGrades] = useState([]);

  const [editingCourse, setEditingCourse] = useState(null); 


  const handleSaveGrade = () => {
    if (!course.trim() || !grade.trim()) {
      alert('Please enter a course name and grade.');
      return;
    }
  
    // Calculate the existingIndex by searching for an existing grade entry
    const existingIndex = grades.findIndex(g => g.course === course && g.year === selectedYear && g.semester === selectedSemester);
  
    let updatedGrades;
    if (existingIndex >= 0) {
      // If an existing entry is found, update the grade
      updatedGrades = grades.map((g, index) => index === existingIndex ? { ...g, grade: grade } : g);
    } else {
      // If no existing entry, add a new grade entry
      const newGradeEntry = {
        year: selectedYear,
        semester: selectedSemester,
        course: course,
        grade: grade,
      };
      updatedGrades = [...grades, newGradeEntry];
    }
  
    setGrades(updatedGrades);
    setModalVisible(false);
    setCourse('');
    setGrade('');
    saveGradesLocally(updatedGrades);
  };
  

const saveGradesLocally = async (grades) => {
  try {
    const jsonValue = JSON.stringify(grades);
    await AsyncStorage.setItem('@grades', jsonValue);
    console.log('Saved to storage:', jsonValue); // Debug log to confirm save
  } catch (e) {
    console.error('Error saving to AsyncStorage:', e); // Error log
  }
};

useEffect(() => {
  const loadGradesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@grades');
      console.log('Loaded from storage:', jsonValue); // Debug log to confirm load
      if (jsonValue != null) {
        const loadedGrades = JSON.parse(jsonValue);
        setGrades(loadedGrades);
      }
    } catch (e) {
      console.error('Error reading from AsyncStorage:', e); // Error log
    }
  };

  loadGradesFromStorage();
}, []);

// Editing COURSES ------------

const handleEditCourse = (courseName) => {
  setEditingCourse(courseName); // Set the course to be edited
  const courseToEdit = grades.find(grade => grade.course === courseName);
  setSelectedYear(courseToEdit.year);
  setSelectedSemester(courseToEdit.semester);
  setCourse(courseToEdit.course);
  setGrade(courseToEdit.grade);
  setModalVisible(true); // Open the modal for editing
};

// Function to update the edited course
const updateEditedCourse = () => {
  const updatedGrades = grades.map(gradeEntry => {
    if (gradeEntry.course === editingCourse) {
      return {
        ...gradeEntry,
        year: selectedYear,
        semester: selectedSemester,
        course: course,
        grade: grade
      };
    }
    return gradeEntry;
  });
  setGrades(updatedGrades);
  saveGradesLocally(updatedGrades);
  setModalVisible(false);
  setEditingCourse(null);
};


// DELETING COURSES ------------

const confirmDeleteCourse = (courseName) => {
  Alert.alert(
    'Confirm Deletion',
    `Are you sure you want to delete the course "${courseName}"?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteCourse(courseName) }
    ],
    { cancelable: false }
  );
};

const deleteCourse = (courseName) => {
  const updatedGrades = grades.filter(grade => grade.course !== courseName);
  setGrades(updatedGrades);
  saveGradesLocally(updatedGrades);
};

  

const renderSemesterCells = (courseName) => {
  let semesterCells = [];
  ['9', '10', '11', '12'].forEach(year => {
      ['1', '2', '3'].forEach(sem => {
          const key = `${year}-${sem}`;
          // Filter grades for the specific year, semester, and course
          const semGrades = grades.filter(g => g.year === year && g.semester === sem && g.course === courseName).map(g => g.grade);
          semesterCells.push(
              <Text key={key} style={styles.gradeText}>
                  {semGrades.join(", ") || "-"}
              </Text>
          );
      });
  });
  return semesterCells;
};

const courseNames = new Set(grades.map(g => g.course));


const renderCourseRows = () => {
  // Get a unique list of course names
  let courseNames = new Set();
  Object.values(grades).forEach(yearObj => {
    Object.values(yearObj).forEach(semObj => {
      Object.keys(semObj).forEach(courseName => {
        if (courseName.trim() !== '') {
          courseNames.add(courseName);
        }
      });
    });
  });
 return Array.from(courseNames).map(courseName => (
    <View key={courseName} style={styles.courseRow}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEditCourse(courseName)}>
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDeleteCourse(courseName)}>
          <Ionicons name="trash-bin-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.courseNameContainer}>
        <Text style={styles.courseName}>{courseName}</Text>
      </View>
    </View>
  ));
};

  
     
  const openModal = () => {
    setModalVisible(true);
  };


  return (
    <View style={styles.container}>
    <BackButton />
    
    <View style={styles.fixedColumn}>
  <Text style={styles.headerText}></Text>
  <Text style={styles.headerText}>Courses</Text>
  <ScrollView>
  {Array.from(courseNames).map(courseName => (
    <View key={courseName} style={styles.courseNameContainer}>
    <View style={styles.courseNameTextContainer}>
    <Text style={styles.courseNameText}>{courseName}</Text>
  </View>
  <View style={styles.iconContainer}>
    <TouchableOpacity style={styles.iconSpace} onPress={() => handleEditCourse(courseName)}>
      <Ionicons name="create-outline" size={24} color="blue" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => confirmDeleteCourse(courseName)}>
      <Ionicons name="trash-bin-outline" size={24} color="red" />
    </TouchableOpacity>
  </View>

</View>

  ))}
</ScrollView>
    </View>
    <ScrollView horizontal>
            <View>
              <View style={styles.scrollableHeaderRow}>
                {['Year - 9', 'Year - 10', 'Year - 11', 'Year - 12'].map((yearLabel, index) => (
                  <View key={index} style={styles.yearColumn}>
                    <Text style={styles.headerText}>{yearLabel}</Text>
                    <View style={styles.semesterRow}>
                      {['1', '2', '3'].map((sem) => (
                        <Text key={sem} style={styles.semesterText}>Sem - {sem}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              <ScrollView>
              {Array.from(courseNames).filter(name => name.trim() !== '').map(courseName => (
                <View key={courseName} style={styles.courseRow}>
                  {renderSemesterCells(courseName)}
                </View>
              ))}
              </ScrollView>
            </View>
          </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Ionicons name="add" size={35} color="white" />
        </TouchableOpacity>
     
    
      
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
      <Text style={styles.modalTitle}>Add/Edit Grade</Text>
        </View>

        <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedYear} onValueChange={(itemValue) => setSelectedYear(itemValue)}>
        <Picker.Item label="9th Year" value="9" />
        <Picker.Item label="10th Year" value="10" />
        <Picker.Item label="11th Year" value="11" />
        <Picker.Item label="12th Year" value="12" />
      </Picker>
    </View>

    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedSemester} onValueChange={(itemValue) => setSelectedSemester(itemValue)}>
        <Picker.Item label="Semester 1" value="1" />
        <Picker.Item label="Semester 2" value="2" />
        <Picker.Item label="Semester 3" value="3" />
      </Picker>
    </View>

    <Text style={styles.cellText}>Course Name</Text>
    <TextInput
      placeholder="Course Name"
      style={styles.input}
      onChangeText={setCourse}
      value={course}
    />
    
    <Text style={styles.cellText}>Grade</Text>
    <TextInput
      placeholder="Grade"
      style={styles.input}
      onChangeText={setGrade}
      value={grade}
    />

    <TouchableOpacity
      onPress={() => {
        if (course && grade) {
          handleSaveGrade();
        } else {
          alert('Please fill in all fields.');
        }
      }}
      style={styles.saveButton}
    >
      <Text style={styles.saveButtonText}>Save Grade</Text>
    </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        </Modal>
        
    </View>
  );
    }

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    },
    fixedColumn: {
        backgroundColor: '#fff', 
        width: 140,
      },
    fixedColumnHeader: {
        width: 190,
        padding: 10,
        backgroundColor: '#f7f7f7', 
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#ddd',
      },
      courseText: {
        padding: 10,
        width: 190,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        fontSize: 16, 
        paddingVertical: 15, 
      },    
    fixedColumnText: {
      width: 80,
      fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',    
        backgroundColor: '#d7d7d7',
    },
    yearColumn: {
        width: 240, 
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    semesterRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    },
    semesterText: {
     width: 80,
     textAlign: 'center',
     padding: 10,
     borderRightWidth: 1,
     borderColor: '#ddd',    
     backgroundColor: '#e7e7e7',
     fontWeight: '500',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        height: 69
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        zIndex: 10,
        bottom: 20,
        right: 20, 
      },
    addButton: {
        position: 'absolute', 
        right: 30, 
        bottom: 30, 
        backgroundColor: '#8A2BE2', 
        borderRadius: 28, 
        width: 56, 
        height: 56, 
        justifyContent: 'center', 
        alignItems: 'center', 
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4, 
        elevation: 5, 
      },    
    modalContainer: {
        flex: 1,
        paddingTop: 50, 
        backgroundColor: 'white',
      },
      iconContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'stretch',
      },
      modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        paddingHorizontal: 20,
      },
      modalTitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      },
      pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        margin: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 15,
        margin: 20,
        fontSize: 18,
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
    courseName: {
        width: 'auto',
        height: 120,
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        textAlign: 'right',
        borderBottomWidth: 1, 
        borderColor: '#ddd', 
      },
        gradeText: {
        flex: 1, 
        textAlign: 'center',
        padding: 10,
        borderLeftWidth: 1,
        borderColor: '#ddd',
      },
      courseRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        borderColor: '#ddd',
        height: 120,
        alignItems: 'center',
      },
      courseNameHeader: {
        width: 80,
      },
    yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },  
  courseSpacer: {
    height: 20, 
  },
  courseRowSpacer: {
    width: 150, 
    backgroundColor: 'transparent', 
  },
  scrollableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7', 
    marginTop: 31,
  },
  cellText: {
    fontWeight: 'bold', 
    flex: 1, 
    justifyContent: 'center', 
    padding: 10, 
  },
  courseNameContainer: {
        width: 'auto',
        height: 120,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        flex: 1, // Takes up the remaining space
        justifyContent: 'flex-start', // Aligns course name to the end (right)
        alignItems: 'center', // Centers content vertically
        flexDirection: 'row',
  },
  courseNameText: {
    fontWeight: 'bold',
  },
  courseNameTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  iconSpace: {
    marginVertical: 10,
  }
  
  });


export default SchoolTranscripts;
