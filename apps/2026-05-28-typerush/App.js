import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import PlayScreen from './src/screens/PlayScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            const icons = { Home: '🏠', Play: '⌨️', Stats: '📊' };
            return <Text style={{ fontSize: 22 }}>{icons[route.name]}</Text>;
          },
          tabBarActiveTintColor: '#7C3AED',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#F3F4F6',
            paddingBottom: 4,
          },
          headerStyle: { backgroundColor: '#7C3AED' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '800' },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'TypeRush', tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Play"
          component={PlayScreen}
          options={{ title: 'Daily Challenge', tabBarLabel: 'Play' }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{ title: 'My Stats', tabBarLabel: 'Stats' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
