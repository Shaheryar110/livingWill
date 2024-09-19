import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Block } from '../../components/App';
import { config } from '../../../config/gluestack-ui.config';
import Button from '../../utils/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/NavigationTypes.types';
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
type IProps = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<IProps> = ({ navigation }) => {
  const handleSignUpPress1 = () => {
    navigation.navigate('LoginType');
    console.log('signup');
  };
  const handleSignUpPress = () => {
    navigation.navigate('SignIn');
  };
  return (
    <Block
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.main}>
        <Image
          source={require('../../../assets/Images/living-will.png')}
          style={styles.logo}
        />
        <Text style={styles.t1}>Guide Your Loved Ones With </Text>
        <Text style={[styles.t1, { marginBottom: 50 }]}>Your Living Will</Text>
        <Button
          onPress={() => handleSignUpPress1()}
          text="Create An Account"
          color={config.tokens.colors.secondary}
          bg={config.tokens.colors.linear}
        />
        <Button
          onPress={handleSignUpPress}
          text="Log In"
          color={config.tokens.colors.primary0}
          bg={config.tokens.colors.primaryM}
        />
        <Text style={styles.t1}>By Creating An Account, You Agree To Our</Text>
        <Text style={[styles.t1, { marginBottom: 170 }]}>
          <Text style={styles.white}>Terms & Conditions</Text> And Agree To
          <Text style={styles.white}> Privacy Policy</Text>
        </Text>
      </View>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // display: "flex",
    // flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 355,
    height: 76,
    marginTop: 180,
    marginBottom: 4,
  },
  t1: {
    fontWeight: '500',
    color: config.tokens.colors.primaryM,
  },
  white: {
    color: config.tokens.colors.primary0,
    fontWeight: '600',
  },
});
