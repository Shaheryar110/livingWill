import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Block } from '../../components/App';
import uuid from 'react-native-uuid';
import { config } from '../../../config/gluestack-ui.config';
import Button from '../../utils/Button';
import InputFeilds from '../../utils/InputFeild';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CameraModal from '../../utils/CameraModal';
import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermission } from '../../utils/CameraPermission';
import { addContact } from '../../services/contactServices/contactServices';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { Toast } from 'react-native-toast-notifications';
import { AddContactScreenProps } from '../../types/NavigationTypes.types';

const initial = {
  name: '',
  email: '',
  phone: '',
  relation: '',
  image: '',
};
const AddContact: React.FC<AddContactScreenProps> = ({ navigation }) => {
  const [conactData, setContactData] = useState(initial);
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector((state: StoreState) => state.user);
  const handleChange = (key: string, val: string) => {
    setContactData(prev => ({
      ...prev,
      [key]: val,
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
        setContactData(prev => ({
          ...prev,
          ['image']: image.path,
        }));
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
    });
  };
  const submit = async () => {
    if (
      conactData.email != '' ||
      conactData.image != '' ||
      conactData.phone != '' ||
      conactData.relation != '' ||
      conactData.name != ''
    ) {
      const resp = await addContact({
        uid: userData.uid,
        fullName: conactData.name,
        phoneNo: conactData.phone,
        relation: conactData.relation,
        image: conactData.image,
        id: String(uuid.v4()),
        email: conactData.email,
      });
      if (resp) {
        Toast.show('Contact Form Added', {
          type: 'success',
        });
        setContactData(initial);
        navigation.goBack();
      }
    }
  };
  return (
    <Block
      source={require('../../../assets/Images/Capture.png')}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 110,
      }}>
      <View style={styles.main}>
        <View style={styles.addBox}>
          {!conactData.image ? (
            <MaterialIcons
              onPress={() => setModalVisible(true)}
              name="add-a-photo"
              style={{ fontSize: 35, color: config.tokens.colors.secondary }}
            />
          ) : (
            <>
              <Image
                source={{ uri: conactData.image }}
                style={{ width: 120, height: 120 }}
              />
            </>
          )}
        </View>
        <CameraModal
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <InputFeilds
          placeholder=" Name"
          value={conactData.name}
          onChangeText={txt => handleChange('name', txt)}
          icon={0}
        />
        <InputFeilds
          placeholder="Email "
          value={conactData.email}
          onChangeText={txt => handleChange('email', txt)}
          icon={1}
        />
        <InputFeilds
          placeholder="Phone"
          value={conactData.phone}
          onChangeText={txt => handleChange('phone', txt)}
          icon={2}
        />
        <InputFeilds
          placeholder="Relation"
          value={conactData.relation}
          onChangeText={txt => handleChange('relation', txt)}
          icon={3}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            onPress={() => {
              submit();
            }}
            text=" + Add"
            color={config.tokens.colors.primary0}
            bg={config.tokens.colors.primaryM}
          />
        </View>
      </View>
    </Block>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    paddingHorizontal: 15,
    width: '100%',
  },
  logo: {
    width: 355,
    height: 76,
    marginTop: 70,
  },
  t1: {
    fontFamily: 'Poppins-Regular',
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
  addBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.tokens.colors.linear,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: config.tokens.colors.linear,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
});
