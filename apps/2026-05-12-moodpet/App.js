import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import HabitsScreen from './src/screens/HabitsScreen';
import StatsScreen from './src/screens/StatsScreen';
import { AppProvider } from './src/store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#7C3AED',
              tabBarInactiveTintColor: '#9CA3AF',
              tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                elevation: 12,
                shadowColor: '#7C3AED',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                height: 60,
                paddingBottom: 8,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '600',
              },
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Text style={{ fontSize: 22 }}>🐾</Text>
                ),
                tabBarLabel: 'My Pet',
              }}
            />
            <Tab.Screen
              name="Habits"
              component={HabitsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Text style={{ fontSize: 22 }}>✅</Text>
                ),
                tabBarLabel: 'Habits',
              }}
            />
            <Tab.Screen
              name="Stats"
              component={StatsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Text style={{ fontSize: 22 }}>📊</Text>
                ),
                tabBarLabel: 'Stats',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
