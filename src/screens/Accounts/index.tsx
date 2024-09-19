import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Block } from '../../components/App';
import InputFeilds from '../../utils/InputFeild';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreState } from '../../redux/reduxStore';
import Button from '../../utils/Button';
import { config } from '../../../config/gluestack-ui.config';
import Feather from 'react-native-vector-icons/Feather';
import { updateUser } from '../../services/Auth';
import { AccountsScreenProps } from '../../types/NavigationTypes.types';
import { firebase } from '@react-native-firebase/auth';
import { Toast } from 'react-native-toast-notifications';
import { userActions } from '../../redux/user/slice';
import CameraModal from '../../utils/CameraModal';
import { requestCameraPermission } from '../../utils/CameraPermission';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../../services/StorageServices/StorageServices';

const Index: React.FC<AccountsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<StoreDispatch>();
  const userData = useSelector((state: StoreState) => state?.user);
  const initial = {
    fullName: userData?.fullName,
    // phone: userData.phone,
    email: userData?.email,
    photo: '',
  };
  const [user, setUser] = useState(initial);
  const [modalVisible, setModalVisible] = useState(false);
  const handleChange = (name: string, val: string) => {
    setUser(prev => ({
      ...prev,
      [name]: val,
    }));
  };

  const openCamera = async () => {
    const test = await requestCameraPermission();
    console.log(test);

    if (test) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        // setContactData(prev => ({
        //   ...prev,
        //   ['image']: image.path,
        // }));
        console.log(image);
        uploadImage(image.path).then((url) => {
          console.log(url);
          // setUser(prev => ({
          //   ...prev,
          //   ['photo']: `${url}`,
          // }));
          firebase.auth().currentUser?.updateProfile({ photoURL: url });
          Toast.show('Picture Updated', {
            type: 'success',
          });
          navigation.goBack();
        })
        setModalVisible(false);
      });
    }
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      uploadImage(image.path).then((url) => {
        console.log(url);
        firebase.auth().currentUser?.updateProfile({ photoURL: url });
        Toast.show('Picture Updated', {
          type: 'success',
        });
        // setUser(prev => ({
        //   ...prev,
        //   ['photo']: `${url}`
        // }));
        navigation.goBack();
      })
    });
  };

  const handleUpadate = () => {
    updateUser(userData.uid, user)
      .then(() => {
        firebase
          .auth()
          .currentUser?.updateProfile({
            displayName: user?.fullName,
            photoURL: user?.photo,
          })
          .then(() => {
            firebase
              .auth()
              .currentUser?.updateEmail(user?.email)
              .then(() => {
                dispatch(
                  userActions.setUser({
                    email: user?.email,
                    fullName: user?.fullName || '',
                  }),
                );
                console.log('name,photo,email update');
              })
              .catch(err => console.log('nothing Update'));
          });
        navigation.goBack();
      })
      .catch(err => { });
  };
  return (
    <Block
      source={require('../../../assets/Images/Capture.png')}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 90,
        paddingHorizontal: 20,
      }}
      paddingBottom={100}>
      <View style={{ position: 'relative' }}>
        <Image
          style={styles.avatar}
          source={{
            uri: firebase.auth().currentUser?.photoURL || '',
          }}
        />
        <Pressable style={styles.editBox} onPress={() => setModalVisible(true)}>
          <Feather
            name="edit"
            style={{
              fontSize: 18,
            }}
          />
        </Pressable>
      </View>

      <InputFeilds
        placeholder="Full Name"
        value={user?.fullName}
        onChangeText={text => handleChange('fullName', text)}
        icon={0}
      />
      <InputFeilds
        placeholder="Email Address"
        value={user?.email}
        onChangeText={text => handleChange('email', text)}
        icon={1}
      />
      {/* <InputFeilds
                placeholder="Phone"
                value={user?.phone}
                onChangeText={text => handleChange('phone', text)}
                icon={2}
            /> */}
      <View style={{ paddingTop: 10 }}>
        <Button
          onPress={() => {
            handleUpadate();
          }}
          color={config?.tokens?.colors?.primary0}
          bg={config?.tokens?.colors?.primaryM}
          text={'Update'}
        />
      </View>
      <CameraModal
        openCamera={() => openCamera()}
        openGallery={() => openGallery()}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Block>
  );
};

export default Index;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 20,
    borderRadius: 50,
  },
  editBox: {
    position: 'absolute',
    top: 90,
    right: -10,
    backgroundColor: config?.tokens?.colors?.primary0,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
