import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  RootStackParamList,
  RootStackParamListAPP,
  SettingsScreenProps,
} from '../../types/NavigationTypes.types';
import { Block } from '../../components/App';
import { Image } from 'react-native';
import { config } from '../../../config/gluestack-ui.config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { getUserById, logOut } from '../../services/Auth';
import Button from '../../utils/Button';
import { Toast } from 'react-native-toast-notifications';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';
import DeleteAccModal from '../../utils/DeleteAcoountModal';

const { width } = Dimensions.get('window');
const Settings: React.FunctionComponent<SettingsScreenProps> = ({
  navigation,
}) => {
  const userData = useSelector((state: StoreState) => state.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(err => {
        Toast.show('Error in Logout ', { type: 'error' });
      });
  };

  type PageDataType = {
    text: string;
    url: keyof RootStackParamListAPP;
    icon: React.ReactNode;
  };
  const pagesData: PageDataType[] = [
    {
      text: 'Accounts',
      url: 'Accounts',
      icon: <FontAwesome name="user" style={styles.iconStyle} />,
    },
    {
      text: 'Feedback',
      url: 'Feedback',
      icon: <MaterialIcons name="reviews" style={styles.iconStyle} />,
    },
    {
      text: 'Privacy Policy',
      url: 'Privacy',
      icon: <MaterialIcons name="privacy-tip" style={styles.iconStyle} />,
    },
  ];

  return (
    <Block
      source={require('../../../assets/Images/Capture.png')}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 90,
      }}
      paddingBottom={100}>
      <Image
        style={styles.avatar}
        source={{
          uri: firebase.auth().currentUser?.photoURL || '',
        }}
      />
      <Text style={[styles.text, { fontWeight: '700' }]}>
        {userData?.fullName}
      </Text>
      <Text style={styles.text}>{userData?.email}</Text>
      <View style={styles.pagesBox}>
        {pagesData.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate(item.url);
              }}
              style={styles.singlePage}
              key={index}>
              {item.icon}
              <Text style={styles.pageText}>{item.text}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ paddingTop: 50 }}>
        <Button
          onPress={() => {
            handleLogOut();
          }}
          color={config?.tokens?.colors?.primary0}
          bg={config?.tokens?.colors?.primaryM}
          text={'Logout'}
        />
        <Button
          onPress={() => {
            setDeleteModal(true)
          }}
          color={config?.tokens?.colors?.primary0}
          bg={config?.tokens?.colors?.primaryM}
          text={'Delete My Account'}
        />
      </View>
      <DeleteAccModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </Block>
  );
};

export default Settings;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 50,
  },
  text: {
    color: config?.tokens?.colors?.primary0 || 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },
  pagesBox: {
    paddingVertical: 20,
    width: width,
    paddingHorizontal: 30,
  },
  singlePage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 10,
    paddingTop: 20,
    borderBottomColor: config?.tokens?.colors?.primary0,
    borderBottomWidth: 1,
  },
  pageText: {
    color: config?.tokens?.colors?.primary0,
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  iconStyle: { color: config?.tokens?.colors?.primary0, fontSize: 20 },
});
