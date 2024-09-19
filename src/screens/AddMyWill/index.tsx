import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Block} from '../../components/App';
import InputFeilds from '../../utils/InputFeild';
import Button from '../../utils/Button';
import {config} from '../../../config/gluestack-ui.config';
import {AddMyWillScreenProps} from '../../types/NavigationTypes.types';
import {Toast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import uuid from 'react-native-uuid';
import {addWill} from '../../services/willServices/willServices';
const initial = {
  name: '',
  title: '',
  desc: '',
};
const Index: React.FC<AddMyWillScreenProps> = ({navigation}) => {
  const formattedDate = new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const [myWillData, setMyWillData] = useState(initial);
  const userData = useSelector((state: StoreState) => state.user);
  const handleChange = (key: string, val: string) => {
    setMyWillData(prev => ({
      ...prev,
      [key]: val,
    }));
  };
  const submit = async () => {
    if (
      myWillData.title !== '' ||
      myWillData.name !== '' ||
      myWillData.desc !== ''
    ) {
      try {
        const resp = await addWill({
          uid: userData.uid,
          title: myWillData.title,
          name: myWillData.name,
          description: myWillData.desc,
          id: String(uuid.v4()),
          datetime: formattedDate,
        });
        if (resp) {
          Toast.show('Contact Form Added', {
            type: 'success',
          });
          setMyWillData(initial);
          navigation.goBack();
        } else {
          Toast.show('Failed to add contact form', {
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error adding contact form:', error);
        Toast.show('An error occurred', {
          type: 'error',
        });
      }
    } else {
      Toast.show('Please fill out all fields', {
        type: 'error',
      });
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
        <InputFeilds placeholder=" Name" icon={4} value={formattedDate} />
        <InputFeilds
          placeholder="Title"
          icon={4}
          value={myWillData.title}
          onChangeText={txt => handleChange('title', txt)}
        />
        <InputFeilds
          placeholder=" Description"
          icon={4}
          height={100}
          value={myWillData.desc}
          onChangeText={txt => handleChange('desc', txt)}
        />
        <View style={{marginTop: 10}}>
          <Button
            onPress={() => {
              submit();
            }}
            text="+ Add"
            color={config.tokens.colors.primary0}
            bg={config.tokens.colors.primaryM}
          />
        </View>
      </View>
    </Block>
  );
};

export default Index;

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
});
