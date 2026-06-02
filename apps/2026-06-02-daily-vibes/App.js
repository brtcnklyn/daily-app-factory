import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MoodPickerScreen from './src/screens/MoodPickerScreen';
import VibeResultScreen from './src/screens/VibeResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MoodPicker" component={MoodPickerScreen} />
        <Stack.Screen name="VibeResult" component={VibeResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
