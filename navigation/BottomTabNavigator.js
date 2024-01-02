import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CareerScreen from '../screens/CareerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AcademicImprovement from '../screens/Career/AcademicImprovement';
import Application from '../screens/Career/Application';
import CareerAssessment from '../screens/Career/CareerAssessment';
import CareerMonitoring from '../screens/Career/CareerMonitoring';
import ExtracurricularActivities from '../screens/Career/ExtracurricularActivities';


const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Career') {
        iconName = focused ? 'book' : 'book-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  });

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Career" component={CareerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="CareerMonitoring" component={CareerMonitoring} options={{ tabBarButton: () => null, tabBarVisible: false }} />
      <Tab.Screen name="CareerAssessment" component={CareerAssessment} options={{ tabBarButton: () => null, tabBarVisible: false }} />
      <Tab.Screen name="AcademicImprovement" component={AcademicImprovement} options={{ tabBarButton: () => null, tabBarVisible: false }} />
      <Tab.Screen name="ExtracurricularActivities" component={ExtracurricularActivities} options={{ tabBarButton: () => null, tabBarVisible: false }} />
      <Tab.Screen name="Application" component={Application} options={{ tabBarButton: () => null, tabBarVisible: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
