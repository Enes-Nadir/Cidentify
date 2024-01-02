import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import HomeScreen from '../../screens/HomeScreen';
import CareerScreen from '../../screens/CareerScreen';
import ProfileScreen from '../../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={screenOpt} >
      <Tab.Screen name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused})=> {
          return <Ionicons name={"home-outline"}
            size={40}
          />
        }
      }}
       />
      <Tab.Screen name="Career" 
      component={CareerScreen}
      options={{
        tabBarIcon: ({focused})=> {
          return <Ionicons name={"book-outline"}
            size={40}
          />
        }
      }}
       />
      <Tab.Screen name="Messages" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused})=> {
          return <Ionicons name={"mail-outline"}
            size={40}
          />
        }
      }}
       />
      <Tab.Screen name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarIcon: ({focused})=> {
          return <Ionicons name={"person-outline"}
            size={40}
          />
        }
      }}
       />
    </Tab.Navigator>
  );
}

const screenOpt = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70
  }
}

export default BottomTab;