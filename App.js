import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from "./screens/HomeScreen"
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  
  headerStyle: {backgroundColor: "#4275DD"},
  headerTitleStyle :{color:"white"},
  headerTintColor: "white", 
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={globalScreenOptions} >
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Register" component={RegisterScreen}  />
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="AddChat" component={AddChatScreen}  />
      <Stack.Screen name="Chat" component={ChatScreen}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


