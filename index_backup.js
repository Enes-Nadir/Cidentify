import { AppRegistry } from 'react-native';
import App from './App'; // Adjust this path to where your main App component is located
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
