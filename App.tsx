/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from './config/gluestack-ui.config';
import {PermissionsAndroid, Platform, SafeAreaView} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import AppContanier from './src/navigation';
import reduxStore from './src/redux/reduxStore';
import SplashScreen from 'react-native-splash-screen';
import mobileAds, {AppOpenAd, TestIds} from 'react-native-google-mobile-ads';
import {requestCameraPermission} from './src/utils/CameraPermission';
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') requestCameraPermission();
    else
      mobileAds()
        .initialize()
        .then(adapterStatuses => {});
  }, []);
  return (
    <GluestackUIProvider config={config}>
      <ReduxProvider store={reduxStore}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'rgba(41, 171, 226, 0.85)',
          }}>
          <ToastProvider>
            <AppContanier />
          </ToastProvider>
        </SafeAreaView>
      </ReduxProvider>
    </GluestackUIProvider>
  );
}

export default App;
