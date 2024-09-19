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
import {createUser, signIn} from '../../services/Auth';
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;
type IProps = {
  navigation: LoginScreenNavigationProp;
};

const initial = {
  email: '',
  password: '',
};

const SignIn: React.FC<IProps> = ({navigation}) => {
  const [signUpForm, setSignUpForm] = useState(initial);
  const handleSignUpPress = () => {
    if (signUpForm.email !== '' && signUpForm.password !== '') {
      signIn(signUpForm.email, signUpForm.password);
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
          placeholder="Email Address"
          value={signUpForm.email}
          onChangeText={event => handleChange('email', event)}
          icon={1}
        />
        <InputFeilds
          placeholder="Password"
          value={signUpForm.password}
          onChangeText={e => handleChange('password', e)}
          icon={3}
        />
        <View style={{marginTop: 10}}>
          <Button
            onPress={handleSignUpPress}
            text="Sign In"
            color={config.tokens.colors.primary0}
            bg={config.tokens.colors.primaryM}
          />
        </View>
        <Text style={styles.t1}>
          <Text
            style={styles.white}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            Or, Register With Email
          </Text>{' '}
        </Text>
      </View>
    </Block>
  );
};

export default SignIn;

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
