import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: '#bbb',
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 4,
            height: 65,
            backgroundColor: '#fff',
            borderTopColor: '#f0f0f0',
          },
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'My Pet',
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>🐾</Text>,
          }}
        />
        <Tab.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{
            title: 'Check In',
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>✨</Text>,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Stats',
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>📊</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
