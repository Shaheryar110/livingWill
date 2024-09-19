import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {config} from '../../../config/gluestack-ui.config';
import {Block} from '../../components/App';
import Button from '../../utils/Button';
import InputFeilds from '../../utils/InputFeild';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes.types';
import {
  createUser,
  onAppleButtonPress,
  onGoogleButtonPress,
} from '../../services/Auth';
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
type IProps = {
  navigation: LoginScreenNavigationProp;
};

const initial = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

const SignUp: React.FC<IProps> = ({navigation}) => {
  const [signUpForm, setSignUpForm] = useState(initial);

  const handleSignUpPress = () => {
    if (signUpForm.email !== '' && signUpForm.password !== '') {
      createUser(
        signUpForm.email,
        signUpForm.password,
        signUpForm.name,
        signUpForm.phone,
      );
    }
  };
  const handleChange = (key: string, val: string) => {
    setSignUpForm(prev => ({
      ...prev,
      [key]: val,
    }));
  };
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };
  const googleSignIn = () => {
    onGoogleButtonPress().then(data => console.log(data, 'success'));
  };
  return (
    <Block contentContainerStyle={{}}>
      <View style={styles.main}>
        <Pressable
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
          }}
          onPress={handleBackToLogin}>
          <FontAwesome5 name="arrow-left" style={{fontSize: 20}} />
        </Pressable>
        <Image
          source={require('../../../assets/Images/living-will.png')}
          style={styles.logo}
        />
        <Text style={styles.t1}>Guide Your Loved Ones With </Text>
        <Text style={[styles.t1, {marginBottom: 30}]}>Your Living Will</Text>
        <InputFeilds
          placeholder="Full Name"
          value={signUpForm.name}
          onChangeText={event => handleChange('name', event)}
          icon={0}
        />
        <InputFeilds
          placeholder="Email Address"
          value={signUpForm.email}
          onChangeText={event => handleChange('email', event)}
          icon={1}
        />
        <InputFeilds
          placeholder="Phone"
          value={signUpForm.phone}
          onChangeText={event => handleChange('phone', event)}
          icon={2}
        />
        <InputFeilds
          placeholder="Password"
          value={signUpForm.password}
          onChangeText={event => handleChange('password', event)}
          icon={3}
        />
        <View style={{marginTop: 10}}>
          <Button
            onPress={handleSignUpPress}
            text="Sign Up"
            color={config.tokens.colors.primary0}
            bg={config.tokens.colors.primaryM}
          />
        </View>

        <View style={styles.flex}>
          <Pressable onPress={() => googleSignIn()} style={styles.blurry}>
            <Image source={require('../../../assets/Images/g.png')} />
          </Pressable>
          {Platform.OS == 'ios' && (
            <Pressable style={styles.blurry} onPress={onAppleButtonPress}>
              <Image
                source={require('../../../assets/Images/apple.png')}
                style={{width: 30, height: 30}}
              />
            </Pressable>
          )}
        </View>
      </View>
    </Block>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    paddingHorizontal: 15,
  },
  logo: {
    width: 355,
    height: 76,
    marginTop: 70,
  },
  t1: {
    fontWeight: '500',
    color: config.tokens.colors.primaryM,
  },
  white: {
    color: config.tokens.colors.primary0,
    fontWeight: '600',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginVertical: 25,
  },
  blurry: {
    backgroundColor: config.tokens.colors.linear,
    opacity: 0.8,
    height: 50,
    width: 50,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
