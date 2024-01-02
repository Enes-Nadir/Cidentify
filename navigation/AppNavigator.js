import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicImprovement from '../screens/Career/AcademicImprovement';
import Application from '../screens/Career/Application';
import CareerAssessment from '../screens/Career/CareerAssessment';
import CareerMonitoring from '../screens/Career/CareerMonitoring';
import ExtracurricularActivities from '../screens/Career/ExtracurricularActivities';
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CareerMonitoring" component={CareerMonitoring} />
      <Stack.Screen name="CareerAssessment" component={CareerAssessment} />
      <Stack.Screen name="AcademicImprovement" component={AcademicImprovement} />
      <Stack.Screen name="ExtracurricularActivities" component={ExtracurricularActivities} />
      <Stack.Screen name="Application" component={Application} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
