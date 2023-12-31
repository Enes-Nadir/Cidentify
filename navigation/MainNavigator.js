// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AcademicImprovement from '../screens/Career/AcademicImprovement';
import Application from '../screens/Career/Application';
import CareerAssessment from '../screens/Career/CareerAssessment';
import CareerMonitoring from '../screens/Career/CareerMonitoring';
import ExtracurricularActivities from '../screens/Career/ExtracurricularActivities';


const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={BottomTabNavigator} />
      {/*  other screens outside the bottom tabs */}
      <Stack.Screen name="CareerMonitoring" component={CareerMonitoring} />
      <Stack.Screen name="CareerAssessment" component={CareerAssessment} />
      <Stack.Screen name="AcademicImprovement" component={AcademicImprovement} />
      <Stack.Screen name="ExtracurricularActivities" component={ExtracurricularActivities} />
      <Stack.Screen name="Application" component={Application} />
      {/* ... other screens */}
    </Stack.Navigator>
    
  );
};

export default MainNavigator;
