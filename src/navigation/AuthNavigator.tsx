import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


import { RootStackParamList } from '../types/NavigationTypes.types';
import { Login } from '../screens';
import LoginTypes from '../screens/Auth/LoginTypes';
import SignUp from '../screens/Auth/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}>
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="LoginType" component={LoginTypes} />
    </RootStack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
