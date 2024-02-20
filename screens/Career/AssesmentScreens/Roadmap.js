// Roadmap.js
import React, { useState, useEffect  } from 'react';
import { Alert, Modal, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from '../../../Components/Home/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';






const Roadmap = (props) => {

  const [roadmapFormVisible, setroadmapFormVisible] = useState(false);


  // New state variables
  const [selectedForm, setSelectedForm] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  // Function to open the details modal
  const openDetailsModal = (formIndex) => {
    setSelectedForm(savedroadmapForms[formIndex]);
    setIsDetailsModalVisible(true);
  };


{/* ------------------------------ roadmap Setting ------------------------------ */}
const [currentClass, setCurrentClass] = useState('');
const [dreamSubjects, setdreamSubjects] = useState([{ dreamSubject: '' }]);
const [studys, setStudy] = useState([{ study: '' }]);
const [dreamUnis, setDreamUni] = useState([{ dreamUni: '' }]);
const [dailys, setDaily] = useState([{ daily: '' }]);
const [exams, setExams] = useState([{ exam: '' }]);
const [globalTests, setGlobalTest] = useState([{ globalTest: '' }]);
const [internships, setInternship] = useState([{ internship: '' }]);
const [olympiads, setOlympiads] = useState([{ olympiad: '' }]);
const [targets, setTarget] = useState([{ target: '' }]);

    
  // Handle form data change
  const closeroadmapModalWithoutSaving = () => {
    setroadmapFormVisible(false);
    setdreamSubjects([{ dreamSubject: '' }]);
    };

    const closeDetailsModalVisible = () => {
        setIsDetailsModalVisible(false);
        };

    useEffect(() => {
      const loadsavedroadmapForms = async () => {
        try {
          const savedroadmapFormsString = await AsyncStorage.getItem('savedroadmapForms');
      if (savedroadmapFormsString) {
        const savedroadmapFormsArray = JSON.parse(savedroadmapFormsString);
        if (Array.isArray(savedroadmapFormsArray)) {
          setsavedroadmapForms(savedroadmapFormsArray);
        }
      }
        } catch (error) { }
      };
  
      loadsavedroadmapForms();
    }, []);

    // Array to store each saved form
  const [savedroadmapForms, setsavedroadmapForms] = useState([]);

  const handleroadmapSave = async () => {
    const newForm = {
        currentClass,dreamSubjects,studys,dreamUnis,dailys,exams,globalTests,internships,olympiads,targets,
        createdAt: new Date().toLocaleString() // This will store the current date and time

    };

    if (!currentClass.trim()) {
      Alert.alert('Error', 'Specific roadmap is required', [{ text: 'OK' }]);
      return;
    }
      setsavedroadmapForms(currentForms => {
    const updatedForms = [...currentForms, newForm];
// Save the updated forms to AsyncStorage
AsyncStorage.setItem('savedroadmapForms', JSON.stringify(updatedForms))
.catch(error => {
  console.error('Failed to save forms to AsyncStorage', error);
});

return updatedForms;
});
      setroadmapFormVisible(false);
      setroadmap4('');
      
  };

    {/*To clean forms! */}
    const deleteForm = async (formIndex) => {
        const updatedForms = savedroadmapForms.filter((_, index) => index !== formIndex);
        setsavedroadmapForms(updatedForms);
        try {
          await AsyncStorage.setItem('savedroadmapForms', JSON.stringify(updatedForms));
          setIsDetailsModalVisible(false); // Close the details modal after deleting
        } catch (error) {
          console.error('Failed to delete the form:', error);
        }
      };
      
    {/*To clean forms! */}

    {/* To open new form with new input */}

    const openNewForm = () => {
      setroadmapFormVisible(true);
      setdreamSubjects([{ dreamSubject: '' }]);
      setStudy([{ study: '' }]);
      setDreamUni([{ dreamUni: '' }]);
      setDaily([{ daily: '' }]);
      setExams([{ exam: '' }]);
      setGlobalTest([{ globalTest: '' }]);
      setInternship([{ internship: '' }]);
      setOlympiads([{ olympiad: '' }]);
      setTarget([{ target: '' }]);
    };  

     {/* ------------------------------ */}


  {/* FOR BUTTON ADDITION SPECIFIC FOR ALL */}

    const addDreamSubject = () => {
        setdreamSubjects([...dreamSubjects, { dreamSubject: '' }]);
      };
      const addStudy = () => {
        setStudy([...studys, { study: '' }]);
      };
      const addDreamUni = () => {
          setDreamUni([...dreamUnis, { dreamUni: '' }]);
        };
        const addDaily = () => {
          setDaily([...dailys, { daily: '' }]);
        };
        const addExams = () => {
          setExams([...exams, { exam: '' }]);
        };
        const addGlobalTest = () => {
          setGlobalTest([...globalTests, { globalTest: '' }]);
        };
        const addInternship = () => {
          setInternship([...internships, { internship: '' }]);
          setOlympiads([...olympiads, { olympiad: '' }]);
          setTarget([...targets, { target: '' }]);
        };
        const addOlympiads = () => {
          setOlympiads([...olympiads, { olympiad: '' }]);
        };
        const addTarget = () => {
          setTarget([...targets, { target: '' }]);
        };

   {/* ---- FOR BUTTON ADDITION SPECIFIC FOR ALL ---- */}

      
    {/*DREAM SUBJECT */}
      const handleDreamSubjectChange = (text, index) => {
        const updateddreamSubjects = dreamSubjects.map((item, i) => {
          if (i === index) {
            return { ...item, dreamSubject: text };
          }
          return item;
        });
        setdreamSubjects(updateddreamSubjects);
      };
    {/*DREAM SUBJECT */}

     {/* STUDY */}
     const handleStudyChange = (text, index) => {
      const updatedstudys = studys.map((item, i) => {
        if (i === index) {
          return { ...item, study: text };
        }
        return item;
      });
      setStudy(updatedstudys);
    };
  {/* STUDY */}

   {/*DREAM UNI */}
   const handleDreamUniChange = (text, index) => {
    const updatedDreamUniChange = dreamUnis.map((item, i) => {
      if (i === index) {
        return { ...item, dreamUni: text };
      }
      return item;
    });
    setDreamUni(updatedDreamUniChange);
  };
{/*DREAM UNI */}

 {/*DREAM SUBJECT */}
 const handleDailyChange = (text, index) => {
  const updatedDailyChange = dailys.map((item, i) => {
    if (i === index) {
      return { ...item, daily: text };
    }
    return item;
  });
  setDaily(updatedDailyChange);
};
{/*DREAM SUBJECT */}

 {/* EXAMS */}
 const handleExamChange = (text, index) => {
  const updatedExam = exams.map((item, i) => {
    if (i === index) {
      return { ...item, exam: text };
    }
    return item;
  });
  setExams(updatedExam);
};
{/* EXAMS */}

 {/* GLOBAL TEST */}
 const handleGlobalTestChange = (text, index) => {
  const updatedGlobalTest = globalTests.map((item, i) => {
    if (i === index) {
      return { ...item, globalTest: text };
    }
    return item;
  });
  setGlobalTest(updatedGlobalTest);
};
{/* GLOBAL TEST */}

 {/* INTERNSHIP */}
 const handleInternshipsChange = (text, index) => {
  const updatedInternships = internships.map((item, i) => {
    if (i === index) {
      return { ...item, internship: text };
    }
    return item;
  });
  setInternship(updatedInternships);
};
{/* INTERNSHIP */}

 {/* OLYMPIADS */}
 const handleOlympiadsChange = (text, index) => {
  const updatedOlympiads = olympiads.map((item, i) => {
    if (i === index) {
      return { ...item, olympiad: text };
    }
    return item;
  });
  setOlympiads(updatedOlympiads);
};
{/* OLYMPIADS */}

 {/* TARGET */}
 const handleTargetChange = (text, index) => {
  const updatedTarget = targets.map((item, i) => {
    if (i === index) {
      return { ...item, target: text };
    }
    return item;
  });
  setTarget(updatedTarget);
};
{/* TARGET */}


    const classPickerItems = [
        { label: '8. Class', value: '8' },
        { label: '9. Class', value: '9' },
        { label: '10. Class', value: '10' },
        { label: '11. Class', value: '11' },
        { label: '12. Class', value: '12' },
      ];
    

  return (

    <View style={styles.background}>
      <BackButton />
      <Text style={styles.modalTitle}>Roadmap Setting</Text>
      

    {/* Check if savedroadmapForms array is empty and display message */}
        {savedroadmapForms.length === 0 && (
      <View style={styles.noFormsContainer}>
        <Text style={styles.noFormsText}>No forms saved</Text>
      </View>
    )}

        <ScrollView style={styles.scrollViewContainer}>
     {/* Display saved forms */}
     {savedroadmapForms.map((form, index) => (
      <TouchableOpacity key={index} 
          onPress={() => openDetailsModal(index)} style={styles.buttonContainer}>
      <FontAwesome5 name="file-alt" size={30} color="white" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.buttonTitle}>Form {index + 1}</Text>
        <Text style={styles.buttonSubtitle}>Date created: {form.createdAt || '---'}</Text>
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
            <Text style={styles.fieldLabel}>Your Current Class:</Text>
            <Text style={styles.fieldValue}>{selectedForm?.currentClass || '---'}</Text>
            
            <Text style={styles.fieldLabel}>Identify your dream subject which you will study at university:</Text>
                    {selectedForm?.dreamSubjects && selectedForm.dreamSubjects.length > 0 
               ? selectedForm.dreamSubjects.map((item, index) => (
                <Text key={index} style={styles.fieldValue}>
                    {item.dreamSubject || '---'}
                </Text>
              ))
            : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>I want to study in</Text>
                                  {selectedForm?.studys && selectedForm.studys.length > 0 
                            ? selectedForm.studys.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.study || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>I dream of getting in ... university</Text>
                                  {selectedForm?.dreamUnis && selectedForm.dreamUnis.length > 0 
                            ? selectedForm.dreamUnis.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.dreamUni || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>I have to study daily</Text>
                                  {selectedForm?.dailys && selectedForm.dailys.length > 0 
                            ? selectedForm.dailys.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.daily || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>IGCSE/AS/A Level & Local exams in</Text>
                                  {selectedForm?.exams && selectedForm.exams.length > 0 
                            ? selectedForm.exams.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.exam || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>I will take Sat/Act/Ielts/Toefl</Text>
                                  {selectedForm?.globalTests && selectedForm.globalTests.length > 0 
                            ? selectedForm.globalTests.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.globalTest || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>Internship</Text>
                                  {selectedForm?.internships && selectedForm.internships.length > 0 
                            ? selectedForm.internships.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.internship || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>Target Olympiads/Programs</Text>
                                  {selectedForm?.olympiads && selectedForm.olympiads.length > 0 
                            ? selectedForm.olympiads.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.olympiad || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
              <Text style={styles.fieldLabel}>Hit the target</Text>
                                  {selectedForm?.targets && selectedForm.targets.length > 0 
                            ? selectedForm.targets.map((item, index) => (
                              <Text key={index} style={styles.fieldValue}>
                                  {item.target || '---'}
                              </Text>
                            ))
                          : <Text style={styles.fieldValue}>---</Text>
              }            
            
                    
            <TouchableOpacity 
             style={styles.deleteButton} 
             onPress={() => deleteForm(savedroadmapForms.indexOf(selectedForm))}
            >
         <Text style={styles.deleteButtonText}>Delete Form</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </Modal>
      </GestureRecognizer>


      {/*---------------- Start of roadmap form Modal  ----------------*/}

      <GestureRecognizer
      onSwipeRight={closeroadmapModalWithoutSaving}
      >
      <Modal
      visible={roadmapFormVisible}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalView}>
      {/* Start of Modal Header <- */}
      <TouchableOpacity style={styles.backButton} onPress={closeroadmapModalWithoutSaving} > 
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Roadmap Setting Form</Text>
        {/* End of Modal Header <- */}
      <KeyboardAwareScrollView
          style={{ flex: 1 }}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps="always"
          extraHeight={10}
          extraScrollHeight={150}>

        <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.label}>Where am I?</Text>
        <RNPickerSelect
          onValueChange={(value) => setCurrentClass(value)}
          items={classPickerItems}
          placeholder={{ label: "Please Select Your Current Class", value: null }}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Identify your dream subject which you will study at university.</Text>
            {dreamSubjects.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleDreamSubjectChange(text, index)}
                    value={item.dreamSubject}
                    multiline
                />
                {index === dreamSubjects.length - 1 && (
                    <TouchableOpacity onPress={addDreamSubject} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
            
          <Text style={styles.label}>I want to study in</Text>
            {studys.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleStudyChange(text, index)}
                    value={item.study}
                    multiline
                />
                {index === studys.length - 1 && (
                    <TouchableOpacity onPress={addStudy} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>I dream of getting in ... university.</Text>
            {dreamUnis.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleDreamUniChange(text, index)}
                    value={item.dreamUni}
                    multiline
                />
                {index === dreamUnis.length - 1 && (
                    <TouchableOpacity onPress={addDreamUni} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>I have to study daily</Text>
            {dailys.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleDailyChange(text, index)}
                    value={item.daily}
                    multiline
                />
                {index === dailys.length - 1 && (
                    <TouchableOpacity onPress={addDaily} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>IGCSE/AS/A Level & Local exams in</Text>
            {exams.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleExamChange(text, index)}
                    value={item.exam}
                    multiline
                />
                {index === exams.length - 1 && (
                    <TouchableOpacity onPress={addExams} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>I will take Sat/Act/Ielts/Toefl</Text>
            {globalTests.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleGlobalTestChange(text, index)}
                    value={item.globalTest}
                    multiline
                />
                {index === globalTests.length - 1 && (
                    <TouchableOpacity onPress={addGlobalTest} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>Internship</Text>
            {internships.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleInternshipsChange(text, index)}
                    value={item.internship}
                    multiline
                />
                {index === internships.length - 1 && (
                    <TouchableOpacity onPress={addInternship} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>Target Olympiads/Programs</Text>
            {olympiads.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleOlympiadsChange(text, index)}
                    value={item.olympiad}
                    multiline
                />
                {index === olympiads.length - 1 && (
                    <TouchableOpacity onPress={addOlympiads} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
          <Text style={styles.label}>Hit the target</Text>
            {targets.map((item, index) => (
                <View key={index} style={styles.goalInputContainer}>
                <TextInput
                    style={styles.inputroadmap}
                    onChangeText={(text) => handleTargetChange(text, index)}
                    value={item.target}
                    multiline
                />
                {index === targets.length - 1 && (
                    <TouchableOpacity onPress={addTarget} style={styles.addingButton}>
                    <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                )}
                </View>
          ))}
        </ScrollView>
        </KeyboardAwareScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleroadmapSave}>
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
    picker: {
        height: 50,
        width: '100%',
        padding: 70,
      },    
      goalInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      addingButton: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#8A2BE2',
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontSize: 24,
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
    inputroadmap: {
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
      marginBottom: 10,
      fontWeight: 'bold',
      marginTop: 10,
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

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  
  

export default Roadmap;
