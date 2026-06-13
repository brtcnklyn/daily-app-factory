import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import ChallengeScreen from './src/screens/ChallengeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          cardStyle: { backgroundColor: '#F0EFFF' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'VibeCheck ✨' }}
        />
        <Stack.Screen
          name="Challenge"
          component={ChallengeScreen}
          options={{ title: "Today's Challenge" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'Past Vibes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
