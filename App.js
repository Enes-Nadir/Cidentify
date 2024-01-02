import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AppNavigator from './navigation/AppNavigator';


export default function App() {
  return (
    <NavigationContainer>
          <BottomTabNavigator />
    </NavigationContainer>
  );
}
