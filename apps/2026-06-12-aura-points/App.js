import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Today: '✨',
  History: '📅',
  Stats: '📊',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => (
              <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name]}</Text>
            ),
            tabBarStyle: {
              backgroundColor: '#0D0D1A',
              borderTopColor: '#1A1A2E',
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: '#A78BFA',
            tabBarInactiveTintColor: '#4A4A6A',
            headerStyle: { backgroundColor: '#0D0D1A' },
            headerTintColor: '#E2E2FF',
            headerShadowVisible: false,
          })}
        >
          <Tab.Screen name="Today" component={HomeScreen} options={{ title: 'Today' }} />
          <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
          <Tab.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
