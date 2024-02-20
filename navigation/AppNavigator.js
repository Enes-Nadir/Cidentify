import { createStackNavigator } from '@react-navigation/stack';
import CareerScreen from '../screens/CareerScreen';
import CareerAssessment from '../screens/Career/CareerAssessment';
import CareerMonitoring from '../screens/Career/CareerMonitoring';
import AcademicImprovement from '../screens/Career/AcademicImprovement';
import ExtracurricularActivities from '../screens/Career/ExtracurricularActivities';
import Application from '../screens/Career/Application';
import CareerTest from '../screens/Career/AssesmentScreens/CareerTest';
import GoalSetting from '../screens/Career/AssesmentScreens/GoalSetting';
import Roadmap from '../screens/Career/AssesmentScreens/Roadmap';
import ActionPlan from '../screens/Career/AssesmentScreens/ActionPlan';
import SchoolTranscripts from '../screens/Career/AcademicImprovement/SchoolTranscripts';
import ExamPreparation from '../screens/Career/AcademicImprovement/ExamPreparation';
import EnglishProficiency from '../screens/Career/AcademicImprovement/EnglishProficiency';
import SubjectList from '../screens/Career/AcademicImprovement/SubjectList';
import OlympiadParticipation from '../screens/Career/AcademicImprovement/OlympiadParticipation';
import OnlineCompetitions from '../screens/Career/AcademicImprovement/OnlineCompetitions';
import OnlineCourse from '../screens/Career/AcademicImprovement/OnlineCourse';
import Extracurricular from '../screens/Career/Extracurricular Activities/Extracurricular';
import ClubActivities from '../screens/Career/Extracurricular Activities/ClubActivities';
import Portfolio from '../screens/Career/Extracurricular Activities/Portfolio';


const Stack = createStackNavigator();

export const CareerStackNavigator = () => {
  return (
    <Stack.Navigator       
    screenOptions={{
        headerShown: false, // Show the header
        gestureEnabled: true, // Enable swipe gesture
        gestureResponseDistance: { horizontal: 5},
    }}
  >
      <Stack.Screen name="CareerScreen" component={CareerScreen} />
      <Stack.Screen name="CareerMonitoring" component={CareerMonitoring} />
      <Stack.Screen name="CareerAssessment" component={CareerAssessment} />
      <Stack.Screen name="AcademicImprovement" component={AcademicImprovement} />
      <Stack.Screen name="ExtracurricularActivities" component={ExtracurricularActivities} />
      <Stack.Screen name="Application" component={Application} />
      {/* Career Assesment Screens */}
      <Stack.Screen name="CareerTest" component={CareerTest} />
      <Stack.Screen name="GoalSetting" component={GoalSetting} />
      <Stack.Screen name="Roadmap" component={Roadmap} />
      <Stack.Screen name="ActionPlan" component={ActionPlan} />
      {/* Academic Improvement Screens */}
      <Stack.Screen name="SchoolTranscripts" component={SchoolTranscripts} />
      <Stack.Screen name="ExamPreparation" component={ExamPreparation} />
      <Stack.Screen name="EnglishProficiency" component={EnglishProficiency} />
      <Stack.Screen name="SubjectList" component={SubjectList} />
      {/* <Stack.Screen name="BooksToRead" component={BooksToRead} /> */}
      <Stack.Screen name="OlympiadParticipation" component={OlympiadParticipation} />
      <Stack.Screen name="OnlineCompetitions" component={OnlineCompetitions} />
      <Stack.Screen name="OnlineCourse" component={OnlineCourse} />
      {/* Extracurricular Activities Screens */}
      <Stack.Screen name="Extracurricular" component={Extracurricular} />
      <Stack.Screen name="Club Activities" component={ClubActivities} />
      <Stack.Screen name="Portfolio" component={Portfolio} />
      {/* <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Leadership" component={Leadership} />
      <Stack.Screen name="Internship" component={Internship} />
      <Stack.Screen name="Skills " component={Skills} />
      <Stack.Screen name="Seminar" component={Seminar} />
      <Stack.Screen name="UniversityVisit" component={UniversityVisit} />
      <Stack.Screen name="Educational Trip" component={EducationalTrip} />
      <Stack.Screen name="Work On Projects" component={WorkOnProjects} />
      <Stack.Screen name="Corresponding" component={Corresponding} /> */}


    </Stack.Navigator>
  );
};
