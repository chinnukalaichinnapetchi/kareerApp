
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthContextProvider from './state/AuthProvider';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
