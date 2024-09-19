import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamListAPP } from '../types/NavigationTypes.types';
import BottomTab from './BottomTabNavigator';
import {
  MyWill,
  Map,
  AddContact,
  AddMyWill,
  Accounts,
  FeedBack,
  Privacy,
  TermsAndConditions,
  SelectMyWill,
  SingleContact
} from '../screens';
import HeaderHome from '../screens/Home/HeaderHome';

const AppNavigator: React.FunctionComponent = () => {
  const Stack = createNativeStackNavigator<RootStackParamListAPP>();
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        animation: 'slide_from_right',
        animationDuration: 300,
      })}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen
        name="MyWill"
        component={MyWill}
        options={({ route }) => ({
          header: () => <HeaderHome title={'My Wills'} isBack={true} />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SelectMyWill"
        component={SelectMyWill}
        options={({ route }) => ({
          header: () => <HeaderHome title={'Select My Wills'} isBack={true} />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SingleContact"
        component={SingleContact}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={({ route }) => ({
          header: () => <HeaderHome title={route.name} isBack={true} />,
          headerShown: true,
        })}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <HeaderHome title={'Add Contact'} isBack={true} />,
          headerShown: true,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        })}
        name="AddContact"
        component={AddContact}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <HeaderHome title={'New Will'} isBack={true} />,
          headerShown: true,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        })}
        name="newWill"
        component={AddMyWill}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <HeaderHome title={'Accounts'} isBack={true} />,
          headerShown: true,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        })}
        name="Accounts"
        component={Accounts}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <HeaderHome title={'Feedback'} isBack={true} />,
          headerShown: true,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        })}
        name="Feedback"
        component={FeedBack}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <HeaderHome title={'Privacy'} isBack={true} />,
          headerShown: true,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        })}
        name="Privacy"
        component={Privacy}
      />
      <Stack.Screen
        options={({ route }) => ({
          header: () => (
            <HeaderHome title={'Terms And Conditions'} isBack={true} />
          ),
          headerShown: true,
        })}
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
