import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { CareerStackNavigator } from './AppNavigator';


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
    tabBarActiveTintColor: 'purple',
    tabBarInactiveTintColor: '#9C27B0', 
    headerShown: false,
    tabBarLabel: () => null,
    
  });

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Career" component={CareerStackNavigator} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
  );
};

export default BottomTabNavigator;
