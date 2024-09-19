import {ConfigureParams} from '@react-native-google-signin/google-signin';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SignIn: undefined;
  LoginType: undefined;
};
export type RootStackParamListAPP = {
  BottomTab: NavigatorScreenParams<RootBottomTabParams>;
  Map: undefined;
  MyWill: undefined;
  AddContact: undefined;
  newWill: undefined;
  Privacy: undefined;
  Feedback: undefined;
  Accounts: undefined;
  TermsAndConditions: undefined;
  SelectMyWill: {phoneNumber: string};
  SingleContact: {phoneNumber: string; fullname: string; source: string | null};
};

export type RootBottomTabParams = {
  Home: undefined;
  Contacts: undefined;
  Consulting: {search: string};
  Settings: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Home'>,
  NativeStackScreenProps<RootStackParamListAPP>
>;
export type ContactsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Contacts'>,
  NativeStackScreenProps<RootStackParamListAPP>
>;
export type ConsultingScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Consulting'>,
  NativeStackScreenProps<RootStackParamListAPP>
>;
export type SettingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParams, 'Settings'>,
  NativeStackScreenProps<RootStackParamListAPP>
>;

export type MyWillScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'MyWill'
>;
export type SelectMyWillScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'SelectMyWill'
>;
export type SingleContactScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'SingleContact'
>;
export type MapScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'Map'
>;
export type AddContactScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'AddContact'
>;
export type AddMyWillScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'newWill'
>;
export type AccountsScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'Accounts'
>;
export type PrivacyScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'Privacy'
>;
export type FeedBackScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'Feedback'
>;
export type TermsAndConditionsScreenProps = NativeStackScreenProps<
  RootStackParamListAPP,
  'TermsAndConditions'
>;
