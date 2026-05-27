import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import HomeScreen    from './src/screens/HomeScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerStyle:      { backgroundColor: '#FAF8FF', elevation: 0, shadowOpacity: 0 },
          headerTintColor:  '#2D1B69',
          headerTitleStyle: { fontWeight: '800', fontSize: 18 },
          tabBarActiveTintColor:   '#6C3CE1',
          tabBarInactiveTintColor: '#bbb',
          tabBarStyle: {
            backgroundColor: '#FAF8FF',
            borderTopColor: '#EDE7FF',
            borderTopWidth: 1,
            paddingBottom: 6,
            height: 60,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Spirit Buddy',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22 }}>🌟</Text>
            ),
          }}
        />
        <Tab.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{
            title: 'Daily Check-In',
            tabBarLabel: 'Check In',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22 }}>✨</Text>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'History',
            tabBarLabel: 'History',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 22 }}>📅</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
