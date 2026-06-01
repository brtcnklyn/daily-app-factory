import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0d0d1f',
            borderTopColor: '#1a1a2e',
            borderTopWidth: 1,
            height: 64,
            paddingBottom: 10,
            paddingTop: 6,
          },
          tabBarActiveTintColor: '#7c3aed',
          tabBarInactiveTintColor: '#374151',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>✨</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Add Event"
          component={AddEventScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>➕</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22, color }}>🏆</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
