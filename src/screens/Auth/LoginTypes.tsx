import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Block} from '../../components/App';
import {config} from '../../../config/gluestack-ui.config';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box} from '@gluestack-ui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import {RootStackParamList} from '../../types/NavigationTypes.types';
import {onGoogleButtonPress} from '../../services/Auth';
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginType'
>;
type IProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginTypes: React.FC<IProps> = ({navigation}) => {
  const googleSignIn = () => {
    onGoogleButtonPress().then(data => console.log(data, 'success'));
  };
  return (
    <Block
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.main}>
        <Image
          source={require('../../../assets/Images/living-will.png')}
          style={styles.logo}
        />

        <Box style={styles.buttons}>
          <Image
            source={require('../../../assets/Images/g.png')}
            style={{width: 20, height: 20}}
          />
          <Text onPress={() => googleSignIn()}>Continue with G-Mail</Text>
        </Box>
        {/* <Box style={styles.buttons}>
          <Image
            source={require('../../../assets/Images/f.png')}
            style={{ width: 10, height: 20 }}
          />
          <Text>Continue with Facebook</Text>
        </Box> */}
        <Box style={styles.moreBox}>
          <Text
            style={styles.more}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            More Login Actions{' '}
          </Text>
          <Entypo
            name="chevron-small-down"
            color={config.tokens.colors.primary0}
            size={25}
          />
        </Box>
      </View>
    </Block>
  );
};

export default LoginTypes;

const styles = StyleSheet.create({
  main: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 355,
    height: 76,
    marginTop: 250,
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
  buttons: {
    marginTop: 20,
    width: '90%',
    elevation: 1,
    borderRadius: 30,
    height: 60,
    paddingVertical: 10,
    backgroundColor: config.tokens.colors.linear,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    gap: 25,
  },
  more: {
    marginVertical: 20,
    color: config.tokens.colors.primary0,
    fontWeight: '600',
  },
  moreBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});
