import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, MyWill, Map, Contacts, Consulting, Settings} from '../screens';
import HeaderHome from '../screens/Home/HeaderHome';
import {getHeaderTitle} from '@react-navigation/elements';
import {config} from '../../config/gluestack-ui.config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {RootBottomTabParams} from '../types/NavigationTypes.types';
const Tab = createBottomTabNavigator<RootBottomTabParams>();
const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({navigation, route, options}) => (
          <HeaderHome title={getHeaderTitle(options, route.name)} />
        ),
        tabBarInactiveTintColor: config.tokens.colors.primaryM,
        tabBarActiveTintColor: config.tokens.colors.secondary,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#C7F2FE',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          overflow: 'hidden',
          width: '100%',
          opacity: 0.9,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Contacts',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
        name="Contacts"
        component={Contacts}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Consulting',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="headphones-settings"
              color={color}
              size={size}
            />
          ),
        }}
        name="Consulting"
        component={Consulting}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {marginBottom: 10},
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Fontisto name="player-settings" color={color} size={size} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
