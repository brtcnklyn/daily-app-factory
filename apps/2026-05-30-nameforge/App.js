import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import HeroScreen from './src/screens/HeroScreen';
import CollectionScreen from './src/screens/CollectionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0D0D1A' },
          headerTintColor: '#FFD700',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          contentStyle: { backgroundColor: '#0D0D1A' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'NameForge' }}
        />
        <Stack.Screen
          name="Hero"
          component={HeroScreen}
          options={{ title: 'Your Hero' }}
        />
        <Stack.Screen
          name="Collection"
          component={CollectionScreen}
          options={{ title: 'Collection' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
