import { Dimensions, StyleSheet, View } from 'react-native';
import { Badge, BadgeText, Box, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { config } from '../../../config/gluestack-ui.config';
import { logOut } from '../../services/Auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamListAPP } from '../../types/NavigationTypes.types';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../../redux/reduxStore';
import { userActions } from '../../redux/user/slice';
const { width } = Dimensions.get('window');
type Iprops = {
  title: string;
  isBack?: boolean;
};

const HeaderHome: React.FC<Iprops> = ({ title, isBack = false }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamListAPP>>();
  const dispatch = useDispatch<StoreDispatch>();
  return (
    <View style={styles.header}>
      <View
        style={[
          styles.blur,
          { backgroundColor: title == 'MyWill' ? '#b7e9f7' : '#29ABE2' },
        ]}
      />

      <MaterialCommunityIcons
        onPress={() => {
          if (isBack) navigation.goBack();
          else {
            dispatch(userActions.setUser({ drawerModal: true }));
          }
        }}
        name={isBack ? 'keyboard-backspace' : 'menu-open'}
        style={{ fontSize: 33, color: 'white' }}
      />
      <Text style={styles.text}>{title}</Text>
      <Box alignItems="flex-start">

      </Box>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
    paddingHorizontal: 14,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  box: {},
  text: {
    fontSize: 21,
    color: config.tokens.colors.primary0,
  },
  blur: {
    paddingVertical: 35,
    position: 'absolute',
    top: 0,
    backgroundColor: config.tokens.colors.secondary,
    flexDirection: 'row',
    opacity: 0.5,
    zIndex: -1,
    width: width,
  },
});
