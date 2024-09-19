import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch, StoreState} from '../redux/reduxStore';
import {userActions, userSliceIntialState} from '../redux/user/slice';
import {DrawerModal} from '../components/App';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getUserById} from '../services/Auth';

const AppContanier = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const userData = useSelector((state: StoreState) => state.user);
  function onAuthStateChanged(user: any) {
    if (user) {
      dispatch(
        userActions.setUser({
          email: user?.email,
          phone: user?.phoneNumber || '',
          fullName: user?.displayName || '',
          isPrimium: false,
          creationTime: user?.creationTime || 0,
          uid: user?.uid,
        }),
      );
    } else {
      dispatch(userActions.setUser(userSliceIntialState));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {userData.uid ? (
        userData.drawerModal ? (
          <SafeAreaProvider>
            <DrawerModal />
          </SafeAreaProvider>
        ) : (
          <AppNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppContanier;

const styles = StyleSheet.create({});
